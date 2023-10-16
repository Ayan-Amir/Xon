import React from 'react';
import { TagRemoveIcon } from '@/assets/svgs/TagRemoveIcon';

type BadgeStyle = {
  id: number;
  label?: string;
  variant?: string;
  size?: string;
  closeIcon?: Boolean;
  handleRemoveTag: (removeTagId?: number) => void;
};

export type BadgeProps = BadgeStyle;

export const Badge: React.FC<BadgeProps> = ({
  id,
  label,
  variant = 'blue',
  size = 'normal',
  closeIcon,
  handleRemoveTag,
}) => {
  return (
    <div
      className={`badge-${size} flex items-center gap-1`}
      style={{ backgroundColor: `${variant}4D` }}
    >
      <p className={`text-xs font-medium `} style={{ color: variant }}>
        {label}
      </p>
      {closeIcon && (
        <span className='cursor-pointer' onClick={() => handleRemoveTag(id)}>
          <TagRemoveIcon color={variant} />
        </span>
      )}
    </div>
  );
};
