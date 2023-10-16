import { Button, Tabs } from '@/common/components/index';

export const Board = () => {
  return (
    <div className='hidden lg:block absolute right-[1.75rem] xxl:right-10 pt-[1.375rem] xxl:pt-8 px-[1.6875rem] xxl:px-[2.375rem] pb-[2.6875rem] xxl:pb-[3.25rem] border border-studyGroupBorderColor rounded-xl'>
      <h3 className='text-[1.75rem] font-bold leading-[1.675rem] text-darkPrimary mb-6'>
        Leaderboard
      </h3>
      <div className='flex gap-[0.375rem] xxl:gap-2 mb-6 xxl:mb-8 '>
        <input
          type='text'
          name='name'
          id='name'
          placeholder='Add username'
          className='input w-[9.375rem] xxl:w-[13.25rem] h-6 xxl:h-9 pl-[1.0875rem] xxl:pl-6 text-[0.625rem] xxl:text-sm font-normal leading-[0.5981rem] xxl:leading-[0.8375rem] rounded-md border border-darkPrimary text-labelColorPrimary focus:!shadow-transparent focus:border-transparent'
        />
        <Button
          label='Add Friend'
          size='small'
          className='!w-[5.375rem] !h-6 xxl:!w-[7.5rem] xxl:!h-9 !rounded-md !text-[0.625rem] xxl:!text-sm !font-medium leading-[0.5981rem] xxl:!leading-[0.8375rem]'
        />
      </div>
      <Tabs />
    </div>
  );
};
