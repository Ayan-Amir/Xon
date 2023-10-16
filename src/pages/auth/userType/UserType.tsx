import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetRequest } from '@/services/networkRequestService';
import { Button, RadioCard } from '@/common/components';
import { ROUTES } from '@/routes';
import { apiEndPoint } from '@/services';
import { userContext } from '@/useContext';
import XonLogo from '@/assets/images/xon-logo.png';
import AuthImage from '@/assets/images/auth-image.png';
import RatingImage from '@/assets/images/rating.png';

type ContextValue = {
  profileData: object;
  setProfileData: React.Dispatch<React.SetStateAction<object>>;
  profilePayload: object;
  setProfilePayload: React.Dispatch<React.SetStateAction<object>>;
};

export function UserType() {
  const [selectedProfileType, setSelectedProfileType] = useState('');

  const { setProfileData } = useContext<ContextValue>(userContext);

  const navigate = useNavigate();

  const { data: profile } = useGetRequest(
    'profile-type',
    [],
    apiEndPoint.PROFILE,
  );

  useEffect(() => {
    profile?.data && setProfileData(profile?.data);
  }, [profile]);

  return (
    <div className='w-full min-h-screen flex justify-center md:justify-normal'>
      <div className='w-full lg:max-w-[27.5625rem] xl:max-w-[38.75rem] h-full flex justify-center'>
        <div className='w-full max-w-[21.875rem] xl:max-w-[29.5rem] lg:max-w-[18.875rem] md:max-w-[26.5rem] flex flex-1 flex-col items-center justify-center py-[1.875rem] xl:py-[3.375rem] lg:py-9 md:py-[3.25rem]'>
          <div className='w[3.4375rem] h-[3.4375rem] xl:w[5.75rem] xl:h-[5.75rem] lg:w[4.0625rem] lg:h-[4.0625rem] md:w[5.75rem] md:h-[5.75rem]'>
            <img src={XonLogo} alt='xon logo' className='h-full w-full' />
          </div>
          <h2 className='xl:text-[2rem] xl:leading-[2.75rem] lg:text-2xl lg:leading-8 md:text-[2rem] md:leading-[2.75rem] text-2xl leading-[1.875rem] text-center font-bold mt-4 xl:mt-6 lg:mt-4 md:mt-6 text-darkPrimary'>
            Get Started to Changing How You Learn Now
          </h2>
          <span className='text-base xl:text-xl lg:text-sm md:text-xl max-w-[18.125rem] xl:max-w-[29.5rem] lg:max-w-[23.25rem] md:max-w-[29.5rem] text-textTertiary font-normal leading-[1.875rem] mt-[3.75rem] xl:mt-[6.625rem] lg:mt-20 md:mt-[6.625rem] text-center'>
            Are you a student or an educational institution?
          </span>
          <form className='w-full flex flex-col gap-6 md:gap-[1.875rem] mt-[2.875rem] xl:mt-11 items-center'>
            <RadioCard
              selectedProfileType={selectedProfileType}
              setSelectedProfileType={setSelectedProfileType}
              profileType={profile?.data?.userProfileTypes}
            />
            <div className='flex w-[21.875rem] xl:w-[26.5rem] lg:w-[18.875rem] md:w-[26.5rem] align-center justify-center'>
              <Button
                variant='primary'
                size='full'
                label='Next'
                disabled={!selectedProfileType ? true : false}
                onClick={() => navigate(ROUTES.DEGREE_SELECT)}
              />
            </div>
          </form>
        </div>
      </div>
      <div className='bg-authBg xl:w-[calc(100%-38.75rem)] lg:w-[calc(100%-27.75rem)] min-h-screen fixed right-0 overflow-hidden hidden lg:block'>
        <div className='pt-[6.5rem] pr-16 pb-4 pl-14 xl:pt-36 xl:pr-[5.8125rem] xl:pb-[1.375rem] xl:pl-20'>
          <h2 className='text-[1.375rem] xl:text-[2rem] font-bold text-darkPrimary max-w-[28rem] lg:max-w-[39.375rem]'>
            Xon is the perfect blend between Quizlet and Anki but better, more
            customisable, powerful yet easy to use.
          </h2>
          <h3 className='text-lg xl:text-2xl font-[500] leading-9 xl:leading-[3.125rem] mt-3 xl:mt-[1.125rem] text-darkPrimary'>
            Mary Lau, Medical Student
          </h3>
          <div className='flex justify-end'>
            <img src={RatingImage} alt='ratings' />
          </div>
        </div>
        <div className='pl-20 w-full h-full overflow-hidden'>
          <img
            className='object-cover object-left-top h-full w-full'
            src={AuthImage}
          />
        </div>
      </div>
    </div>
  );
}
