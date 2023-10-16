import React, { Fragment, ReactNode } from 'react'
import { Popover, Transition } from '@headlessui/react'

type PopoverProps = {
  displayItem: ReactNode,
  children: ReactNode,
  dropdownStyle: string,
  popover?: boolean,
  setPopover?: React.Dispatch<React.SetStateAction<boolean>>,
}

export const PopoverDropdown: React.FC<PopoverProps> = ({
  displayItem, children, dropdownStyle, popover, setPopover,
}) => {
  return (
    <div className='relative'>
      <Popover className=''>
        {({ open }) => (
          <>
            <Popover.Button
              className={`
              ${open ? '' : 'text-opacity-90'}
              group focus:outline-none focus-visible:ring-2 focus-visible:ring-transparent focus-visible:ring-opacity-75`}
            //TODO
            // onClick={() => setPopover(!popover)}
            >
              {displayItem}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-200'
              enterFrom='opacity-0 translate-y-1'
              enterTo='opacity-100 translate-y-0'
              leave='transition ease-in duration-150'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 translate-y-1'
            >
              <Popover.Panel className={`absolute z-10 ${dropdownStyle}`}>
                <div className='w-2 h-2 bg-white border-t border-l border-darkPrimary absolute rotate-45 right-[21px] -top-[3.2px] z-30'></div>
                <div className='overflow-hidden rounded-lg ring-0 ring-transparent border border-darkPrimary bg-white relative z-20'>
                  {children}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}

