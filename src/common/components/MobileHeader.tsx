import { HamburgerMenuIcon } from '@/assets/svgs';
import XonLogo from '@/assets/images/xon-logo.png';

export const MobileHeader = () => {
  return (
    <div className='flex justify-between items-center px-5 md:px-[2.125rem] pt-5 md:pt-[1.875rem] lg:hidden'>
      <div className='w-8 h-8 md:w-[3.9375rem] md:h-[3.9375rem]'>
        <img src={XonLogo} alt='xon-logo' />
      </div>
      <HamburgerMenuIcon />
    </div>
  );
};
