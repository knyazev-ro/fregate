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

    const [sortAndFilter, setSortAndFilter] = useState({
        filters: [],
        sortBy: null,
        sortDir: 'asc',
    });

    console.log(sortAndFilter);

    const columns = useMemo(
        () => [
            { accessorKey: 'action', header: 'Actions'.toUpperCase(), cell: (value) => <CellAction /> },
            // { accessorKey: 'id', header: 'ID' },
            {
                accessorKey: 'author.name',
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
                cell: (value) => <div className="">{format(parseISO(value.getValue()), 'MM-dd-yyyy')}</div>,
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
                cell: (value) => <div className="">{format(parseISO(value.getValue()), 'MM-dd-yyyy')}</div>,
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
                params: { page: page + 1, perPage },
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
    }, [page, perPage]);

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
                        <>
                            <button
                                className="cursor-pointer rounded-full bg-blue-500 py-3 px-4 text-white transition-colors hover:bg-blue-800 active:bg-blue-500"
                                onClick={() => router.get(route('users.create'))}
                            >
                                Добавить проверку
                            </button>
                        </>
                    )}
                />
            </div>
        </Layout>
        // </Page>
    );
};

export default RegistryTable;
