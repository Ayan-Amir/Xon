import { ReactNode } from 'react';
import { ACCESS_TOKEN } from '@/utils/constant';
import AuthImage from '@/assets/images/auth-image.png';
import RatingImage from '@/assets/images/rating.png';

type PrivateRouteProps = {
  children: ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  return accessToken ? children : (
    <div className='w-full min-h-screen flex justify-center md:justify-normal'>
      {children}
      <div className='bg-authBg xl:w-[calc(100%-38.75rem)] lg:w-[calc(100%-27.75rem)] min-h-screen fixed right-0 overflow-hidden hidden lg:block'>
        <div className='pt-[6.5rem] pr-16 pb-4 pl-14 xl:pt-36 xl:pr-[6.8125rem] xl:pb-[1.375rem] xl:pl-20'>
          <h2 className='text-[1.375rem] xl:text-[2rem] font-bold text-darkPrimary max-w-[28rem] lg:max-w-[39.375rem]'>
            Xon is the perfect blend between Quizlet and Anki but better, more customisable, powerful yet easy to use.
          </h2>
          <h3 className='text-lg xl:text-2xl font-[500] leading-9 xl:leading-[3.125rem] mt-3 xl:mt-[1.125rem]'>Mary Lau, Medical Student</h3>
          <div className='flex justify-end'>
            <img src={RatingImage} alt='ratings' />
          </div>
        </div>
        <div className='pl-[4.6875rem] w-full h-full overflow-hidden'>
          <img className='object-cover object-left-top h-full w-full' src={AuthImage} />
        </div>
      </div>
    </div>
  )
};
