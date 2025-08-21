import Layout from '@/components/Layout';
import { BuildingOffice2Icon } from '@heroicons/react/16/solid';
import { router, useForm } from '@inertiajs/react';

export default function EditSmallBusinessEntity({ sbe }) {
    const { data, setData, errors } = useForm({
        name: sbe?.name ?? '',
    });

    return (
        <Layout>
            <div className="h-full w-full bg-white p-1 text-stone-950">
                <div className="mb-6 flex w-full items-center justify-center text-xl font-bold">{sbe?.id ? 'Редактировать СМП' : 'Создать СМП'}</div>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-14 w-14 items-center justify-center">
                            <BuildingOffice2Icon className="h-10 w-10 fill-blue-300" />
                        </div>
                        <div className="flex flex-col">
                            <div className="text-sm">СУБЪЕКТ СМП</div>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="rounded-sm border border-gray-300 p-2"
                                placeholder="Введите название СМП"
                            />
                            {errors.name && <div className="text-xs text-red-500">{errors.name}</div>}
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex">
                    <button
                        className="rounded-sm bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                        onClick={() => {
                            sbe?.id ? router.put(route('sbe.update', sbe.id), data) : router.post(route('sbe.store'), data);
                        }}
                    >
                        Сохранить
                    </button>
                </div>
            </div>
        </Layout>
    );
}
