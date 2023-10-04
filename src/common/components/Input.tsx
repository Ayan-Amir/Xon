import React, { ChangeEvent, KeyboardEvent, WheelEvent } from 'react';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '@/common/components/ErrorMessage';
import { ROUTES } from '@/routes';
import { HideEye, OpenEye } from '@/assets/svgs';

export type InputVariant = 'small' | 'medium' | 'large';

export type InputProps = {
  type?: string;
  id: string;
  placeholder: string;
  isPassword?: boolean;
  showPasswordField?: boolean;
  label?: string;
  togglePasswordVisibility?: () => void;
  handleKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onTextChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  value?: string;
  showError?: any;
  message?: any;
  isForgotPassword?: boolean;
  name?: string;
  variant?: InputVariant;
  className?: String;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  id,
  placeholder,
  isPassword = false,
  togglePasswordVisibility,
  showPasswordField = false,
  handleKeyPress,
  onTextChange,
  isDisabled,
  value,
  showError,
  message,
  name,
  isForgotPassword = false,
  variant = 'medium',
  className
}) => {

  const handleWheel = (e: WheelEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    target.blur();
  };

  return (
    <div className='relative flex flex-col items-start w-full'>
      {!!label && (
        <label className='text-sm xl:text-base lg:text-sm md:text-base font-medium mb-4 xl:mb-4 lg:mb-2.5 ' htmlFor={id}>
          {label}
        </label>
      )}
      <div className='relative w-full'>
        <input
          onWheel={handleWheel}
          id={id}
          className={`w-full ${className} input-${variant} border-darkPrimary ${showError ? 'border-inputError' : ''
            } focus:border-darkPrimary focus:ring-0`}
          type={type}
          placeholder={placeholder}
          value={value || ''}
          onKeyDown={handleKeyPress}
          onChange={onTextChange}
          disabled={isDisabled}
          name={name || ''}
        />
        {isPassword && (
          <span
            className='absolute bottom-3 xl:bottom-4 lg:bottom-2 md:bottom-4 right-4 cursor-pointer'
            onClick={!!value ? togglePasswordVisibility : () => { }}
          >
            {showPasswordField ? <OpenEye /> : <HideEye />}
          </span>
        )}
      </div>
      <div className='w-full h-2.5 flex justify-between items-center gap-2 mt-2'>
        {showError && <ErrorMessage message={message} />}
        {isForgotPassword && (
          <Link
            to={ROUTES.FORGOT_PASSWORD}
            className='w-full text-xs text-right text-darkPrimary font-normal'
          >
            Forgot Password?
          </Link>
        )}
      </div>
    </div>
  );
}
