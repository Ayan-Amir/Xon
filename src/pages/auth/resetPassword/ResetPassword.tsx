import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from '@/common/components';
import { usePostMutation } from '@/services/networkRequestService';
import { apiEndPoint } from '@/services/apiEndPoint';
import { ROUTES } from '@/routes';
import { getKeyFromUrl, getUidFromUrl } from '@/utils';
import { PASSWORD_REGEX } from '@/utils/regex';
import { PASSWORD, TEXT } from '@/utils/constant';
import XonLogo from '@/assets/images/xon-logo.png';

export function ResetPassword() {

  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const resetPasswordValidationSchema = Yup.object({
    password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
		.matches(PASSWORD_REGEX, 'Password must contain at least one numeric character')
		.required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .test('match-passwords', 'Passwords must match', function (value) {
        return this.parent.password === value;
      }),
  });

	const { handleChange, handleSubmit, touched, values, errors } = useFormik({
		initialValues: { password: '', confirmPassword: '' },
		validationSchema: resetPasswordValidationSchema,
		onSubmit: () => handleResetPassword(),
	});

  const resetPasswordSuccess = () => {
    navigate(ROUTES.SIGN_IN);
  };
	
	const resetPasswordError = (error: object) => {
		// TODO: show error in toast
		console.log(error);
	};

  const KEY = getKeyFromUrl(4);
  const UID = getUidFromUrl(3);

	const getResetPasswordPayload = () => {
		const payload = {
      new_password1: values.password,
      new_password2: values.confirmPassword,
      uid: UID,
      token: KEY,
    }
		return payload;
	};

	const { mutate: handleResetPassword } = usePostMutation(
		'reset-password',
    apiEndPoint.RESET_PASSWORD(UID, KEY),
		getResetPasswordPayload(),
		resetPasswordSuccess,
		resetPasswordError,
	);
  
  return (
    <div className='w-full lg:max-w-[27.5625rem] xl:max-w-[38.75rem] h-full flex justify-center'>
      <div className='w-full max-w-[21.875rem] xl:max-w-[26.5rem] lg:max-w-[18.875rem] md:max-w-[26.5rem] flex flex-1 flex-col items-center justify-center py-[1.875rem] xl:py-[3.375rem] lg:py-9 md:py-[3.25rem]'>
        <div className='w[3.4375rem] h-[3.4375rem] xl:w[5.75rem] xl:h-[5.75rem] lg:w[4.0625rem] lg:h-[4.0625rem] md:w[5.75rem] md:h-[5.75rem]'>
          <img src={XonLogo} alt='xon logo' className='h-full w-full' />
        </div>
        <span className='text-2xl md:text-[2rem] leading-8 font-bold mt-[11.875rem] md:mt-[13.4375rem]'>
          New Password
        </span>
        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-y-6 xl:gap-[1.875rem] lg:gap-y-6 md:gap-[1.875rem]'>
          <div className='flex flex-col gap-6 md:gap-[1.875rem] lg:gap-5 xl:gap-[1.875rem] mt-[1.875rem] xl:mt-[1.875rem] lg:mt-6'>
            <Input
              type={showPassword ? TEXT : PASSWORD}
              label='Password'
              id='password'
              value={values.password}
              placeholder='min 8 chars'
              isPassword
              onTextChange={handleChange}
              showError={touched.password && errors.password}
							message={errors.password}
              showPasswordField={showPassword}
							togglePasswordVisibility={() => setShowPassword(!showPassword)}
            />
            <Input
              type={showPassword ? TEXT : PASSWORD}
              value={values.confirmPassword}
              label='Confirm Password'
              id='confirmPassword'
              placeholder='min 8 chars'
              isPassword
              onTextChange={handleChange}
              showError={touched.confirmPassword && errors.confirmPassword}
							message={errors.confirmPassword}
              showPasswordField={showPassword}
							togglePasswordVisibility={() => setShowPassword(!showPassword)}
            />
          </div>
          <div className='flex flex-col gap-4'>
            <Button type='submit' variant='primary' size='full' label='Submit' />
          </div>
        </form>
      </div>
    </div>
  );
}
