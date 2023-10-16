import { useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { usePostMutation } from '@/services/networkRequestService';
import { LoginPerson, MenuDropdown, } from '@/common/components';
import { ROUTES } from '@/routes';
import { apiEndPoint } from '@/services';
import { removeLocalStorageItem } from '@/utils';
import { ACCESS_TOKEN } from '@/utils/constant';
import { LogoutIcon, UserIcon } from '@/assets/svgs';

export function ProfileMenuDropDown() {
  const navigate = useNavigate();

  const { mutate: handleLogout } = usePostMutation(
    'logout',
    apiEndPoint.LOGOUT,
    {},
    () => { 
      removeLocalStorageItem(ACCESS_TOKEN);
      navigate(ROUTES.SIGN_IN);
    },
    (err) => console.log(err),
  );

  return (
    <div>
        <MenuDropdown dropdownStyle='-mt-4 -right-4' displayItem={<LoginPerson />}>
          <div className='px-3 py-5 flex flex-col gap-1.5 w-[15rem]'>
            <Menu.Item>
              <div className='text-sm text-darkPrimary font-normal leading-4 px-4 py-[0.4375rem] rounded hover:bg-authBg cursor-pointer whitespace-nowrap flex items-center gap-[0.375rem]'><UserIcon /><span>Profile</span></div>
            </Menu.Item>
            <Menu.Item>
              <div
                className='text-sm text-darkPrimary font-normal leading-4 px-4 py-[0.4375rem] rounded hover:bg-authBg cursor-pointer whitespace-nowrap flex items-center gap-[0.375rem]'
                onClick={handleLogout}
              ><LogoutIcon /><span>Logout</span></div>
            </Menu.Item>
          </div>
        </MenuDropdown>
      </div>
  )
}
