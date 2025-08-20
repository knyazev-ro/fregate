import { DocumentChartBarIcon } from "@heroicons/react/16/solid";
import { router } from "@inertiajs/react";

export default function Sidebar() {

    const menuItems = [
        {
            name: 'Реестр плановых проверок',
            href: route('registry.index'),
            bigIcon: DocumentChartBarIcon 
        },
                {
            name: 'Форма добавления',
            href: route('registry.index'),
            bigIcon: DocumentChartBarIcon 
        },
    ]

    return (
        <div className="w-64 text-black flex-col bg-gray-100 flex p-4">
            {
                menuItems.map((item, index) => (
                    <div className="flex items-center border-b-1 gap-2 p-2 hover:bg-gray-200 cursor-pointer" key={index} onClick={() => router.get(item.href)}>
                        <DocumentChartBarIcon className="w-5 min-w-5 max-w-5 fill-black" />
                        {item.name}
                    </div>
                ))
        }
        </div>
    );
}