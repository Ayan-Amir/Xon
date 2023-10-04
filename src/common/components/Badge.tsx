import React from 'react';

export type BadgeVariant = 'green' | 'blue' | 'red' | 'yellow';

type BadgeStyle = {
  label: string;
  variant?: BadgeVariant;
}

export type BadgeProps = BadgeStyle;

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'blue' }) => {
  return (
    <div className={`badge badge-${variant}`}>
      <p className='text-xs font-medium'>
        {label}
      </p>
    </div>
  );
};
