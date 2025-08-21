import FTable from '@/components/FTable';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
// import Page from '../Layouts/Page';
import Layout from '@/components/Layout';
import CellAction from '@/components/table/CellAction';
import ColumnDPHeader from '@/components/table/ColumnDPHeader';
import ColumnHeader from '@/components/table/ColumnHeader';
import { router } from '@inertiajs/react';
import { format, parseISO } from 'date-fns';

const RegistryTable = () => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [importData, setImportData] = useState({
        file: null,
    })

    const [sortAndFilter, setSortAndFilter] = useState({
        filters: [],
        sortBy: null,
        sortDir: 'asc',
    });

    console.log(sortAndFilter);

    const columns = useMemo(
        () => [
            { accessorKey: 'action', header: 'ДЕЙСТВИЯ'.toUpperCase(), cell: (value) => <CellAction value={value} /> },
            // { accessorKey: 'id', header: 'ID' },
            {
                accessorKey: 'author.name',
                cell: (value) => (
                    <div className="rubik flex justify-center bg-blue-500 p-1 text-xs font-medium text-white">
                        {value.getValue()?.toUpperCase() ?? ''}
                    </div>
                ),
                header: <ColumnHeader title={'АВТОР'} col={'author.name'} sortAndFilter={sortAndFilter} setSortAndFilter={setSortAndFilter} />,
            },
            {
                accessorKey: 'small_business_entity.name',
                header: (
                    <ColumnHeader
                        title={'СУБЪЕКТ СМП'}
                        col={'small_business_entity.name'}
                        sortAndFilter={sortAndFilter}
                        setSortAndFilter={setSortAndFilter}
                    />
                ),
            },
            {
                accessorKey: 'supervisory_authority.name',
                header: (
                    <ColumnHeader
                        title={'НАДЗОРНЫЙ ОРГАН'}
                        col={'supervisory_authority.name'}
                        sortAndFilter={sortAndFilter}
                        setSortAndFilter={setSortAndFilter}
                    />
                ),
            },
            {
                accessorKey: 'start_verification',
                header: (
                    <ColumnDPHeader
                        title={'НАЧАЛО ПРОВЕРКИ'}
                        col={'start_verification'}
                        sortAndFilter={sortAndFilter}
                        setSortAndFilter={setSortAndFilter}
                    />
                ),
                cell: (value) => <div className="">{format(parseISO(value.getValue()), 'dd-MM-yyyy')}</div>,
            },
            {
                accessorKey: 'end_verification',
                header: (
                    <ColumnDPHeader
                        title={'ОКОНЧАНИЕ ПРОВЕРКИ'}
                        col={'end_verification'}
                        sortAndFilter={sortAndFilter}
                        setSortAndFilter={setSortAndFilter}
                    />
                ),
                cell: (value) => <div className="">{format(parseISO(value.getValue()), 'dd-MM-yyyy')}</div>,
            },
            {
                accessorKey: 'duration',
                header: (
                    <ColumnHeader
                        title={'ПРОДОЛЖИТЕЛЬНОСТЬ (ДНЕЙ)'}
                        col={'duration'}
                        sortAndFilter={sortAndFilter}
                        setSortAndFilter={setSortAndFilter}
                    />
                ),
            },
        ],
        [sortAndFilter],
    );

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await axios.get(route('registry.index'), {
                params: { page: page + 1, perPage, ...sortAndFilter },
            });
            setData(res.data.data);
            setTotal(res.data.total);
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, [page, perPage, sortAndFilter]);

    const handlePageChange = (event, newPage) => setPage(newPage);
    const handleRowsPerPageChange = (event) => {
        setPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Layout>
            <div className="bg-white shadow-md shadow-blue-100">
                <FTable
                    columns={columns}
                    data={data}
                    total={total}
                    loading={loading}
                    page={page}
                    perPage={perPage}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    title="Реестр"
                    additionl={() => (
                        <div className="flex w-full flex-wrap justify-end gap-1 text-xs">
                            <div
                                className="cursor-pointer rounded-xs bg-blue-500 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-800 active:bg-blue-500"
                            
                            >
                                <input
                                type='file'
                                accept={".xlsx"}
                                onChange={(e) => {
                                    try{
                                        axios.postForm(route('registry.import'), {
                                            file: e?.target?.files[0] ?? null,
                                        });
                                    } catch(err) {
                                        console.log(err);
                                    }
                                }}
                                />
                                Импортировать
                            </div>
                            <div
                                onClick={() => {
                                    axios
                                        .get(route('registry.export.many'), {
                                            params: sortAndFilter,
                                            responseType: 'blob',
                                        })
                                        .then((res) => {
                                            const url = window.URL.createObjectURL(new Blob([res.data]));
                                            const link = document.createElement('a');
                                            link.href = url;
                                            link.setAttribute('download', 'export.xlsx');
                                            document.body.appendChild(link);
                                            link.click();
                                            link.remove();
                                        });
                                }}
                                className="cursor-pointer rounded-xs bg-blue-500 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-800 active:bg-blue-500"
                            >
                                Экспортировать по фильтру
                            </div>
                            <a
                                className="cursor-pointer rounded-xs bg-blue-500 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-800 active:bg-blue-500"
                                href={route('registry.export.many')}
                            >
                                Экспортировать все
                            </a>
                            <button
                                className="cursor-pointer rounded-xs bg-blue-500 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-800 active:bg-blue-500"
                                onClick={() => router.get(route('registry.create'))}
                            >
                                Добавить проверку
                            </button>
                        </div>
                    )}
                />
            </div>
        </Layout>
    );
};

export default RegistryTable;
