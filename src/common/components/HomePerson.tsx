import { ProfileMenuDropDown } from "@/common/components/ProfileMenuDropDown";

type HomePersonPropsType = {
  userName: string;
};

export const HomePerson = ({ userName }: HomePersonPropsType) => {
  return (
    <div className='flex justify-between lg:sticky lg:top-0 bg-white z-10 px-5 md:px-[5.5rem] lg:pl-0 lg:pr-[2rem] xxl:pr-10 pt-7 md:pt-6 lg:pt-[2.125rem] xxl:pt-12 pb-6 md:pb-10 lg:pb-[1.875rem] xxl:pb-10'>
      <div className='flex flex-col gap-3 md:flex-row md:gap-6 md:items-end'>
        <h2 className='text-[2rem] md:text-5xl lg:text-[2rem] xxl:text-5xl font-medium leading-[2.21rem] md:leading-[3.315rem] lg:leading-[2.21rem] xxl:leading-[3.3125rem] text-darkPrimary'>
          {`Hi, ${!!userName ? userName: ''}`}
        </h2>
        <p className='text-xs md:text-base lg:text-xs xxl:text-base font-medium leading-[0.7175rem] md:leading-[0.9569rem] lg:leading-[0.7175rem] xxl:leading-[0.9569rem] text-textTertiary md:mb-[0.625rem]'>
          you are on a <span className='text-darkPrimary'>685-day streak</span>{' '}
          today 🔥
        </p>
      </div>
      <ProfileMenuDropDown />
    </div>
  );
};
