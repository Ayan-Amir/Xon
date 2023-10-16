import React from 'react';
import { ButtonLoader } from '@/common/components/ButtonLoader';

export type ButtonSize = 'small' | 'medium' | 'full';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'error'
  | 'error-light'
  | 'error-outline'
  | 'success'
  | 'success-light';

export type ButtonState = true | false;

export type ButtonIconType = 'lead' | 'tail' | 'none';

export type ButtonStyle = {
  size?: ButtonSize;
  variant?: ButtonVariant;
  state?: ButtonState;
  iconType?: ButtonIconType;
  icon?: React.ReactNode;
  label: string | React.ReactNode;
  className?: string;
  onClick?: any;
  type?: string;
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonStyle;

export const Button: React.FC<ButtonProps> = ({
  size = 'medium',
  variant = 'primary',
  state = false,
  iconType = 'none',
  icon,
  label = 'Button',
  className,
  onClick,
  type,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={state}
      className={`button ${className} ${size} ${variant} ${state}`}
      {...props}
    >
      {iconType === 'lead' && icon}
      {state ? <ButtonLoader /> : label}
      {iconType === 'tail' && icon}
      {/* TODO: In future we change this text to loader */}
    </button>
  );
};
