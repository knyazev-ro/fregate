import FTable from '@/components/FTable';
import Layout from '@/components/Layout';
import CellActionSubject from '@/components/table/CellActionSubject';
import ColumnHeader from '@/components/table/ColumnHeader';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

export default function SmallBusinessEntityTable() {
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

    const columns = useMemo(
        () => [
            {
                accessorKey: 'action',
                header: 'Actions'.toUpperCase(),
                cell: (value) => <CellActionSubject value={value} />,
            },
            {
                accessorKey: 'name',
                header: <ColumnHeader title={'СУБЪЕКТ СМП'} col={'name'} sortAndFilter={sortAndFilter} setSortAndFilter={setSortAndFilter} />,
            },
            {
                accessorKey: 'registries_count',
                header: (
                    <ColumnHeader
                        title={'КОЛ-ВО РЕЕСТРОВ'}
                        col={'registries_count'}
                        sortAndFilter={sortAndFilter}
                        setSortAndFilter={setSortAndFilter}
                    />
                ),
            },
        ],
        [sortAndFilter],
    );

    const fetchEntities = async () => {
        setLoading(true);
        try {
            const res = await axios.get(route('sbe.index'), {
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
        fetchEntities();
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
                    title="Субъекты СМП"
                    additionl={() => (
                        <button
                            className="cursor-pointer rounded-xs bg-blue-500 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-800 active:bg-blue-500"
                            onClick={() => router.get(route('sbe.create'))}
                        >
                            Добавить субъект
                        </button>
                    )}
                />
            </div>
        </Layout>
    );
}
