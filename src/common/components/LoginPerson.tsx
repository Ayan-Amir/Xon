import { DropdownIcon } from '@/assets/svgs/DropdownIcon';
import Avatar from '@/assets/images/Avatar.png';

export const LoginPerson = () => {
  return (
    <div className='flex items-center gap-2'>
      <div className='w-12 h-12 rounded-full'>
        <img src={Avatar} alt='Avatar' />
      </div>
      <div className='w-5 h-5'>
        <DropdownIcon />
      </div>
    </div>
  );
};
