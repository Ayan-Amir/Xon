import React from 'react';

export type ButtonSize = 'small' | 'medium' | 'full';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'error' | 'error-light' | 'success' | 'success-light';

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
    //   disabled
    >
      {iconType === 'lead' && icon}
      {label}
      {iconType === 'tail' && icon}
      {/* TODO: In future we change this text to loader */}
      {state && 'loading'}
    </button>
  );
};
