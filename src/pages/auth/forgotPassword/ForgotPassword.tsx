import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { usePostMutation } from '@/services/networkRequestService';
import { Button, Input } from '@/common/components';
import { ROUTES } from '@/routes';
import { apiEndPoint } from '@/services';
import XonLogo from '@/assets/images/xon-logo.png';
import { toast } from 'react-toastify';
import { SUCCESSFUL_SEND_MESSAGE } from '@/utils/messages';

export function ForgotPassword() {
  const navigate = useNavigate();

  const forgotPasswordValidationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  const { handleChange, handleSubmit, touched, values, errors } = useFormik({
    initialValues: { email: '' },
    validationSchema: forgotPasswordValidationSchema,
    onSubmit: () => handleForgotPassword(),
  });

  const forgotPasswordSuccess = () => toast.success(SUCCESSFUL_SEND_MESSAGE('Email'));

  const forgotPasswordError = (error: object) => {
    // TODO: show error in toast
    console.log(error);
  };

  const getForgotPasswordPayload = () => {
    const payload = {
      email: values.email,
    };
    return payload;
  };

  const { mutate: handleForgotPassword, isLoading: forgotPasswordLoading } = usePostMutation(
    'forgot-password',
    apiEndPoint.FORGOT_PASSWORD,
    getForgotPasswordPayload(),
    forgotPasswordSuccess,
    forgotPasswordError,
  );

  return (
    <div className='w-full lg:max-w-[27.5625rem] xl:max-w-[38.75rem] h-full flex justify-center'>
      <div className='w-full max-w-[21.875rem] xl:max-w-[26.5rem] lg:max-w-[18.875rem] md:max-w-[26.5rem] flex flex-1 flex-col items-center justify-center py-[1.875rem] xl:py-[3.375rem] lg:py-9 md:py-[3.25rem]'>
        <div className='w[3.4375rem] h-[3.4375rem] xl:w[5.75rem] xl:h-[5.75rem] lg:w[4.0625rem] lg:h-[4.0625rem] md:w[5.75rem] md:h-[5.75rem]'>
          <img src={XonLogo} alt='xon logo' className='h-full w-full' />
        </div>
        <span className='text-2xl md:text-[2rem] leading-8 font-bold mt-[11.875rem] md:mt-[13.4375rem] text-darkPrimary'>
          Forgot Password
        </span>
        <form
          onSubmit={handleSubmit}
          className='w-full flex flex-col gap-y-6 xl:gap-3 lg:gap-y-6 md:gap-[1.875rem]'
        >
          <div className='flex flex-col gap-[1.875rem] mt-[1.875rem] xl:mt-[1.875rem] lg:mt-6'>
            <Input
              type='email'
              label='Email'
              id='email'
              value={values.email}
              placeholder='Enter your email'
              onTextChange={handleChange}
              showError={touched.email && errors.email}
              message={errors.email}
            />
          </div>
          <div className='flex flex-col gap-4'>
            <Button
              type='submit'
              variant='primary'
              size='full'
              label='Submit'
              state={forgotPasswordLoading}
            />
            <Button
              variant='tertiary'
              size='full'
              label='Back'
              className='!py-[.8125rem] xl:!py-[1.0625rem] lg:!py-3 md:!py-[1.0625rem]'
              onClick={() => navigate(ROUTES.SIGN_IN)}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
