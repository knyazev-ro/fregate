import Layout from '@/components/Layout';
import { UserCircleIcon } from '@heroicons/react/16/solid';
import { DatePicker } from '@heroui/date-picker';
import { router, useForm } from '@inertiajs/react';
import { parseDate } from '@internationalized/date';
import { format } from 'date-fns';
import { AsyncPaginate } from 'react-select-async-paginate';

export default function EditRegistry({ registry }) {
    const additional = {
        small_business_entity: registry?.small_business_entity
            ? {
                  label: registry?.small_business_entity.name,
                  value: registry?.small_business_entity.id,
              }
            : null,

        supervisory_authority: registry?.supervisory_authority
            ? {
                  label: registry?.supervisory_authority.name,
                  value: registry?.supervisory_authority.id,
              }
            : null,
    };

    const { data, setData, errors } = useForm({
        small_business_entity_id: registry?.small_business_entity_id ?? null,
        supervisory_authority_id: registry?.supervisory_authority_id ?? null,
        start_verification: registry?.start_verification ?? null,
        end_verification: registry?.end_verification ?? null,
        duration: registry?.duration ?? null,
        ...additional,
    });

    async function loadOptionsSBE(search, loadedOptions, { page }) {
        const $query = [search ? 'search=' + search : null, page ? 'page=' + page : null];

        const queryStr = $query.filter(Boolean).join('&');

        const response = await fetch(route('api.small-business-entities') + '?' + queryStr);
        const responseJSON = await response.json();
        return {
            options: responseJSON.data?.map((item) => ({ label: item.name, value: item.id })) ?? [],
            hasMore: responseJSON.current_page >= responseJSON.last_page ? false : true,
            additional: {
                page: page + 1,
            },
        };
    }

    async function loadOptionsSupervisor(search, loadedOptions, { page }) {
        const $query = [search ? 'search=' + search : null, page ? 'page=' + page : null];

        const queryStr = $query.filter(Boolean).join('&');

        const response = await fetch(route('api.supervisory-authorities') + '?' + queryStr);
        const responseJSON = await response.json();
        return {
            options: responseJSON.data?.map((item) => ({ label: item.name, value: item.id })) ?? [],
            hasMore: responseJSON.current_page >= responseJSON.last_page ? false : true,
            additional: {
                page: page + 1,
            },
        };
    }
    console.log(format(new Date(data.start_verification), 'dd-MM-yyyy'));
    return (
        <Layout>
            <div className="h-full w-full bg-white text-stone-950">
                <div className="flex w-full items-center justify-center text-xl font-bold">
                    {registry?.id ? 'Редактировать Проверку' : 'Создать проверку'}
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <div className="h-14 min-h-14 w-14 min-w-14 rounded-full bg-blue-100">
                            <UserCircleIcon className="size-14 fill-blue-300" />
                        </div>
                        <div className="flex flex-col">
                            <div className="text-xs">АВТОР</div>
                            <div className="text-sm font-semibold">{registry?.author?.name?.toUpperCase() ?? '[Не назначен]'}</div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 text-stone-800">
                        <div>{'Субъект малого предпринимательства'}</div>
                        <AsyncPaginate
                            className="text-black"
                            placeholder={'Выбрать СМП'}
                            value={data.small_business_entity}
                            loadOptions={loadOptionsSBE}
                            onChange={(e) => {
                                setData((data) => ({ ...data, small_business_entity_id: e.value, small_business_entity: e }));
                            }}
                            additional={{
                                page: 1,
                            }}
                        />
                    </div>

                    <div className="flex flex-col gap-1 text-stone-800">
                        <div>{'Надзорный Орган'}</div>
                        <AsyncPaginate
                            className="text-black"
                            placeholder={'Выбрать надзорный орган'}
                            value={data.supervisory_authority}
                            loadOptions={loadOptionsSupervisor}
                            onChange={(e) => {
                                setData((data) => ({ ...data, supervisory_authority_id: e.value, supervisory_authority: e }));
                            }}
                            additional={{
                                page: 1,
                            }}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <DatePicker
                            value={parseDate(format(new Date(data.start_verification), 'yyyy-MM-dd'))}
                            onChange={(e) => {
                                if (e) setData('start_verification', e.toString());
                                else setData('start_verification', null);
                            }}
                            className="max-w-[284px]"
                            description={'Начало проверки'}
                            label="Начало проверки"
                            popoverProps={{
                                className: 'bg-white dark:bg-zinc-900 shadow-lg rounded-xl z-[9999]',
                            }}
                        />
                        <DatePicker
                            value={parseDate(format(new Date(data.end_verification), 'yyyy-MM-dd'))}
                            onChange={(e) => {
                                if (e) setData('end_verification', e.toString());
                                else setData('end_verification', null);
                            }}
                            className="max-w-[284px]"
                            description={'Окончание проверки'}
                            label="Окончание проверки"
                            popoverProps={{
                                className: 'bg-white dark:bg-zinc-900 shadow-lg rounded-xl z-[9999]',
                            }}
                        />
                    </div>
                    <div className="flex w-full flex-col gap-1">
                        <div className="text-stone-800">{'Продолжительность (дни)'}</div>
                        <input
                            value={data.duration}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('duration', e.target.value)}
                            type="number"
                            className="w-full rounded-sm border border-gray-300 p-2"
                            placeholder="Введите продолжительность в днях"
                        />
                    </div>
                </div>

                <div className="flex">
                    <button
                        onClick={() => {
                            registry?.id ? router.put(route('registry.update', registry.id), data) : router.post(route('registry.store'), data);
                        }}
                        className="mt-4 rounded-sm bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                        Сохранить
                    </button>
                </div>
            </div>
        </Layout>
    );
}
