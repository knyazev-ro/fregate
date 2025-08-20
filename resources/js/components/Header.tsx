import { ArrowRightEndOnRectangleIcon, RectangleGroupIcon } from '@heroicons/react/16/solid';
import { router } from '@inertiajs/react';
import { ShipIcon } from 'lucide-react';

export default function Header() {
    return (
        <div className="text-md justify-between rubik top-0 flex h-14 w-screen min-w-screen items-center border-b-2 border-blue-200 bg-white p-4 font-semibold text-stone-950">
            <div className='flex items-center'>
            <ShipIcon className="mr-2 size-5 ring-2 ring-blue-800 text-blue-500 bg-blue-500 fill-white" />
            {'Интернет-Фрегат'.toUpperCase()}
            </div>
            <div
            onClick={() => router.post(route('logout'))}
             className='flex hover:bg-gray-100 p-2 text-sm rubik rounded-xs items-center cursor-pointer'>
                {"ВЫХОД"}
                <RectangleGroupIcon className='ml-2 size-5 fill-black' />
            </div>
        </div>
    );
}
