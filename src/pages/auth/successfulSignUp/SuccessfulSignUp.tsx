import { useNavigate } from 'react-router-dom';
import { Button } from '@/common/components';
import { ROUTES } from '@/routes';
import CongratulationImage from '@/assets/congratulation.svg';

export const SuccessfulSignUp = () => {

  const navigate = useNavigate();

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='w-[21.875rem] md:w-[29.125rem] flex flex-col items-center gap-y-3 md:gap-y-10'>
        <img
          src={CongratulationImage}
          alt='congratulations'
          className='w-[21.5rem] h-[14.25rem] md:w-[29.125rem] md:h-[19.5rem]'
        />
        <div className='flex flex-col gap-4 md:gap-y-2 text-center'>
          <h1 className='text-3xl font-bold leading-[2.625rem] md:leading-[3.625rem] md:text-[2.625rem]'>
            Congratulations
          </h1>
          <p className='text-base font-normal leading-[1.375rem] md:leading-[2.125rem] md:text-2xl'>
            Please check your inbox and verify the email.
          </p>
        </div>
        <div className='w-full md:w-[26.5rem]'>
          <Button type='submit' onClick={() => navigate(ROUTES.SIGN_IN)} label='Back to Login' variant='primary' size='full' />
        </div>
      </div>
    </div>
  );
};
