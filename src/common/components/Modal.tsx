import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ModalCloseIcon } from '@/assets/svgs';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width: String
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, width }) => {
  return (
    <Transition.Root show={isOpen} as={React.Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-50 overflow-y-auto'
        onClose={onClose}
      >
        <div className='flex items-center justify-center min-h-screen'>
          <Transition.Child
            as={React.Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />
          </Transition.Child>
          <Transition.Child
            as={React.Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div className={`relative pt-[4.875rem] bg-white rounded-lg max-h-[51.25rem] h-auto`} style={{ width: `${width}` }}>
              <div className='absolute right-6 top-6 cursor-pointer' onClick={onClose}>
                <ModalCloseIcon />
              </div>
              <div className='px-[4.5rem] pb-[4.875rem] max-h-[41.5rem] overflow-y-auto scrollbar-thin scrollbar-thumb-darkPrimary scrollbar-track-scrollbarBg scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg'>{children}</div>

            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
