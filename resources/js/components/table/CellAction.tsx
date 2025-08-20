import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  ArchiveBoxXMarkIcon,
  ArrowDownOnSquareStackIcon,
  ChevronDownIcon,
  CommandLineIcon,
  DivideIcon,
  PencilIcon,
  Square2StackIcon,
  Square3Stack3DIcon,
  TrashIcon,
} from '@heroicons/react/16/solid'

export default function CellAction({value}) {
  return (
    <div className="relative">
      <Menu>
        <MenuButton className="inline-flex items-center group gap-2 rounded-xs px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-200 data-open:bg-gray-300">
        <Square3Stack3DIcon className="size-5 fill-black" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="font-semibold w-52 absolute border border-gray-300 origin-top-right rounded-sm shadow-lg bg-white/50 backdrop-blur-lg p-2 text-sm/6 text-stone-950 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0 translate-x-2"
        >
          <MenuItem>
            <button className="group hover:bg-blue-100 cursor-pointer flex w-full items-center gap-2 rounded-xs px-3 py-1.5">
              <PencilIcon className="size-4 fill-stone-950" />
              Редактировать
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">⌘E</kbd>
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group cursor-pointer flex w-full items-center gap-2 rounded-xs px-3 py-1.5 hover:bg-blue-100">
              <ArrowDownOnSquareStackIcon className="size-4 fill-stone-950" />
              Экспорт
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">⌘D</kbd>
            </button>
          </MenuItem>
          <div className="my-1 h-px bg-white/5" />
          <MenuItem>
            <button className="group  cursor-pointer flex w-full items-center gap-2 rounded-xs px-3 py-1.5 hover:bg-blue-100">
              <TrashIcon className="size-4 fill-stone-950" />
              Удалить
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">⌘D</kbd>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  )
}