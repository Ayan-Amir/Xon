import { useState } from 'react';
import { StatsNumber } from '@/common/components';
import { HashTag, PlusIcon, RightArrow } from '@/assets/svgs';

export function SharedContent() {
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  // Function to handle submenu click
  const handleSubMenuClick = (index: any) => {
    setActiveSubMenu(index === activeSubMenu ? null : index);
  };

  // Main menu items
  const mainMenuItems = [
    {
      label: '👨‍👩‍👧‍👧 Study Group!',
      items: ['Menu 1A', 'Menu 1B', 'Menu 1C'],
    },
  ];

  return (
    <div>
      <div className='flex justify-between items-center mb-[0.625rem] px-2'>
        <h4 className='text-sm font-medium leading-[0.8375rem]'>Shared</h4>
        <PlusIcon />
      </div>
      <nav>
        <ul className='flex flex-col gap-6'>
          {mainMenuItems.map((menuItem, index) => (
            <li key={index}>
              <a
                href='#'
                className='menulink flex gap-2 text-[0.8125rem] font-normal leading-[1.25rem] text-darkPrimary px-1 py-1.5 rounded-lg'
                onClick={() => handleSubMenuClick(index)}
              >
                <RightArrow />
                {menuItem.label}
                <StatsNumber />
              </a>
              <ul
                className={`mt-5 flex flex-col gap-4 ml-5 submenu ${activeSubMenu === index ? 'block' : 'hidden'
                  }`}
              >
                {menuItem.items.map((item, subIndex) => (
                  <li key={subIndex}>
                    <a
                      href='#'
                      className='flex items-center text-sm font-medium leading-[0.8375rem] text-darkPrimary'
                    >
                      <div className='mr-3'>
                        <RightArrow />
                      </div>
                      <HashTag />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
