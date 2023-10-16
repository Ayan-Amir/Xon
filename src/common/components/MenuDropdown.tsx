import { Fragment, ReactNode, useEffect, useRef, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'

type MenuProps = {
  displayItem: ReactNode,
  children: ReactNode,
  dropdownStyle: string,
  popover?: boolean,
  setPopover?: React.Dispatch<React.SetStateAction<boolean>>,
}

export const MenuDropdown: React.FC<MenuProps> = ({ displayItem, children, dropdownStyle, }) => {
  return (
    <div className='relative'>
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button className='group focus:outline-none focus-visible:ring-2 focus-visible:ring-transparent focus-visible:ring-opacity-75'>
            {displayItem}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className={`absolute z-999 ${dropdownStyle}`}>
            <div className='w-2 h-2 bg-white border-t border-l border-darkPrimary absolute rotate-45 right-[21px] -top-[3.2px] z-30'></div>
            <div className='overflow-hidden rounded-lg ring-0 ring-transparent border border-darkPrimary bg-white relative z-20'>
              {children}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
