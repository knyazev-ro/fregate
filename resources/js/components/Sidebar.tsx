import { BuildingOffice2Icon, BuildingOfficeIcon, ChartBarIcon, DocumentArrowUpIcon } from '@heroicons/react/16/solid';
import { router } from '@inertiajs/react';

export default function Sidebar() {
    const menuItems = [
        {
            name: 'Реестр плановых проверок',
            href: route('registry.index'),
            bigIcon: ChartBarIcon,
        },
        {
            name: 'Форма добавления',
            href: route('registry.create'),
            bigIcon: DocumentArrowUpIcon,
        },
        {
            name: 'Субъекты малого предпринимательства',
            href: route('sbe.index'),
            bigIcon: BuildingOffice2Icon,
        },
        {
            name: 'Добавить СМП',
            href: route('sbe.create'),
            bigIcon: BuildingOfficeIcon,
        },
    ];

    return (
        <div className="flex w-64 flex-col bg-gray-100 p-4 text-black">
            {menuItems.map((item, index) => (
                <div
                    className="flex cursor-pointer items-center gap-2 border-b-1 p-3 text-xs leading-3.5 font-medium hover:bg-gray-200"
                    key={index}
                    onClick={() => router.get(item.href)}
                >
                    {<item.bigIcon className="max-w-5 min-w-5 fill-black" />}
                    {item.name}
                </div>
            ))}
        </div>
    );
}
