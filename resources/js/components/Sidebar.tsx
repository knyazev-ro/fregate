import { BuildingOffice2Icon, BuildingOfficeIcon, ChartBarIcon, DocumentArrowUpIcon, DocumentChartBarIcon, DocumentCurrencyBangladeshiIcon } from "@heroicons/react/16/solid";
import { router } from "@inertiajs/react";

export default function Sidebar() {

    const menuItems = [
        {
            name: 'Реестр плановых проверок',
            href: route('registry.index'),
            bigIcon: ChartBarIcon 
        },
                {
            name: 'Форма добавления',
            href: route('registry.create'),
            bigIcon: DocumentArrowUpIcon 
        },
                        {
            name: 'Субъекты малого предпринимательства',
            href: route('sbe.index'),
            bigIcon: BuildingOffice2Icon 
        },
                                {
            name: 'Добавить СМП',
            href: route('sbe.create'),
            bigIcon: BuildingOfficeIcon 
        },
    ]

    return (
        <div className="w-64 text-black flex-col bg-gray-100 flex p-4">
            {
                menuItems.map((item, index) => (
                    <div className="flex items-center text-xs font-medium border-b-1 gap-2 p-3 leading-3.5 hover:bg-gray-200 cursor-pointer" key={index} onClick={() => router.get(item.href)}>
                        {<item.bigIcon className="min-w-5 max-w-5 fill-black" />}
                        {item.name}
                    </div>
                ))
        }
        </div>
    );
}