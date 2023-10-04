import React, { HTMLInputTypeAttribute } from 'react';
import { ErrorMessage } from '@/common/components/ErrorMessage';
import { CheckmarkIcon } from '@/assets/svgs';

export type Checkbox = {
  label: React.ReactNode | string;
  id: string;
  showError?: boolean;
  message?: string;
  handleCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputTypeAttribute> &
  Checkbox;

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  id,
  showError,
  message,
  handleCheckbox,
}) => {
  return (
    <div className='flex flex-col gap-1'>
      <div className='checkbox flex items-center gap-3'>
        <input
          type='checkbox'
          // TODO: will uncomment below line for intermediate state of Checkbox
          // intermediate
          id={id}
          onChange={handleCheckbox}
          className='w-4 h-4 appearance-none rounded-sm focus:outline-none focus:ring-0 focus:ring-offset-0 checked:opacity-0 absolute cursor-pointer bg-white border-1 border-darkPrimary'
        />
        <div className='w-4 h-4'>
          <CheckmarkIcon />
        </div>
        <label htmlFor={id}>{label}</label>
      </div>
      {showError && <ErrorMessage message={message} />}
    </div>
  );
};
