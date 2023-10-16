import React, { HTMLInputTypeAttribute } from 'react';
import { RadioButtonIcon } from '@/assets/svgs';

export type RadioButton = {
  label: string;
};

export type RadioButtonProps =
  React.InputHTMLAttributes<HTMLInputTypeAttribute> & RadioButton;

export const RadioButton: React.FC<RadioButtonProps> = ({ label }) => {
  return (
    <div className='radio ml-5 mt-5 flex items-center gap-3'>
      <input
        type='radio'
        id={label}
        className='w-6 h-6 appearance-none rounded-full focus:outline-none focus:ring-0 focus:ring-offset-0 checked:opacity-0 absolute cursor-pointer bg-white border-2 border-borderPrimary'
      />
      <div className='w-6 h-6'>
        <RadioButtonIcon />
      </div>

      <label htmlFor={label} className='text-sm text-darkPrimary font-medium'>
        {label}
      </label>
    </div>
  );
};
