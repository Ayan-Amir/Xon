import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostMutation } from '@/services/networkRequestService';
import { userContext } from '@/useContext';
import { Button, SearchableSelect } from '@/common/components';
import { apiEndPoint } from '@/services';
import { ROUTES } from '@/routes';
import XonLogo from '@/assets/images/xon-logo.png';
import AuthImage from '@/assets/images/auth-image.png';
import RatingImage from '@/assets/images/rating.png';

export function DegreeSelect() {
  const { profileData, profilePayload } = useContext(userContext);

  const navigate = useNavigate();

  const profileSuccess = () => {
    // TODO: Redirect to orignal dashboard
    navigate(ROUTES.DASHBOARD);
  };

  const profileError = (error: object) => {
    // TODO: show error in toast
    console.log(error);
  };

  const getProfilePayload = () => {
    const payload = {
      degree: profilePayload?.degree?.id,
      profileType: profilePayload?.type?.id,
    };
    return payload;
  };

  const { mutate: handleProfile } = usePostMutation(
    'profile',
    apiEndPoint.PROFILE,
    getProfilePayload(),
    profileSuccess,
    profileError,
  );

  return (
    <div className='w-full min-h-screen flex justify-center md:justify-normal'>
      <div className='w-full xl:max-w-[38.75rem] lg:max-w-[27.5625rem] h-full flex justify-center'>
        <div className='w-full max-w-[21.875rem] xl:max-w-[26.5rem] lg:max-w-[18.875rem] md:max-w-[26.5rem] flex flex-1 flex-col items-center justify-center py-[1.875rem] xl:py-[3.375rem] lg:py-9 md:py-[3.25rem]'>
          <div className='w-[3.4375rem] h-[3.4375rem] xl:w-[5.75rem] xl:h-[5.75rem] lg:w-[4.0625rem] lg:h-[4.0625rem] md:w-[5.75rem] md:h-[5.75rem]'>
            <img src={XonLogo} alt='xon logo' className='h-full w-full' />
          </div>
          <h2 className='text-2xl xl:text-[2rem] lg:text-2xl md:text-[2rem] xl:leading-[2.75rem] lg:leading-8 md:leading-[2.75rem] leading-[1.875rem] text-center font-bold mt-6'>
            Get Started to Changing How You Learn Now
          </h2>
          <span className='text-base xl:text-xl lg:text-sm md:text-xl text-textTertiary font-normal leading-[1.875rem] whitespace-nowrap mt-[3.75rem] xl:mt-[6.625rem] lg:mt-20 md:mt-[6.625rem]'>
            What is your degree of study?
          </span>
          <form className='w-full flex flex-col gap-y-6 xl:gap-y-[1.875rem] lg:gap-y-[1.375rem] md:gap-y-[1.875rem] mt-4 xl:mt-4 lg:mt-6'>
            <SearchableSelect profileData={profileData?.departments} />
            <div className='flex flex-col gap-4 xl:gap-4 lg:gap-3'>
              <Button
                onClick={() => handleProfile()}
                type='button'
                variant='primary'
                size='full'
                label='Next'
              />
              <Button variant='tertiary' size='full' label='Back' />
            </div>
          </form>
        </div>
      </div>
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
  );
}
