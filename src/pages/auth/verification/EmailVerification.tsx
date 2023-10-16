import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostMutation } from '@/services/networkRequestService';
import { apiEndPoint } from '@/services';
import { ROUTES } from '@/routes';
import { getKeyFromUrl } from '@/utils';
import ConfirmationImage from '@/assets/confirmation.svg';

export const EmailVerification = () => {
  const navigate = useNavigate();

  const userVerificationSuccess = () => {
    // TODO: show verify email toast
    navigate(ROUTES.SIGN_IN);
  };

  const userVerificationError = (error: object) => {
    // TODO: show error in toast
    console.log(error);
  };

  const getUserVerificationPayload = () => {
    const KEY = getKeyFromUrl(3);

    const payload = {
      key: KEY,
    };
    return payload;
  };

  const { mutate: userVerification } = usePostMutation(
    'user-verification',
    apiEndPoint.EMAIL_VERIFICATION,
    getUserVerificationPayload(),
    userVerificationSuccess,
    userVerificationError,
  );

  useEffect(() => {
    userVerification();
  }, []);

  return (
    <>
      <div className='h-screen flex flex-col items-center justify-center gap-10'>
        <img src={ConfirmationImage} alt='account verified' />
        <div className='text-center gap-2'>
          <h2 className='text-[2.625rem] font-bold leading-[3.625rem] text-darkPrimary'>
            Verified
          </h2>
          <p className='text-2xl font-normal leading-8 text-darkPrimary'>
            Yahoo! You have successfully verified the account
          </p>
        </div>
      </div>
    </>
  );
};
