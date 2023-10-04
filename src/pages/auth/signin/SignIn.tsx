import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Checkbox, Input } from '@/common/components';
import { GoogleSignIn } from '@/common/components/GoogleSignIn';
import { usePostMutation } from '@/services/networkRequestService';
import { apiEndPoint } from '@/services';
import { ACCESS_TOKEN, PARTIAL_ACTIVE, PASSWORD, TEXT } from '@/utils/constant';
import { setLocalStorageItem } from '@/utils';
import { ROUTES } from '@/routes';
import XonLogo from '@/assets/images/xon-logo.png';

export function SignIn() {

	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useState(false);

	const signInValidationSchema = Yup.object({
		email: Yup.string().email('Invalid email address').required('Email is required'),
		password: Yup.string().required('Password is required'),
		termsAndPrivacy: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
	});

	const { handleChange, handleSubmit, touched, values, errors } = useFormik({
		initialValues: { email: '', password: '', termsAndPrivacy: false },
		validationSchema: signInValidationSchema,
		onSubmit: () => handleSignIn(),
	});

	const signInSuccess = (data: object) => {
		if (data?.data?.user?.state === PARTIAL_ACTIVE) {
		  setLocalStorageItem(ACCESS_TOKEN, data?.data?.access);
		  navigate(ROUTES.USER_TYPE);
		} else {
		  // TODO: Redirect to orignal dashboard
		  navigate(ROUTES.DASHBOARD);
		  setLocalStorageItem(ACCESS_TOKEN, data?.data?.access);
		}
	};
	
	const signInError = (error: object) => {
		// TODO: show error in toast
		console.log(error);
	};

	const getSignInPayload = () => {
		const payload = {
			email: values.email,
			password: values.password,
		}
		return payload;
	};

	const { mutate: handleSignIn } = usePostMutation(
		'sign-in',
		apiEndPoint.SIGN_IN,
		getSignInPayload(),
		signInSuccess,
		signInError,
	);

  	return (
		<div className='w-full lg:max-w-[27.5625rem] xl:max-w-[38.75rem] h-full flex justify-center'>
			<div className='w-full max-w-[21.875rem] xl:max-w-[26.5rem] lg:max-w-[18.875rem] md:max-w-[26.5rem] flex flex-1 flex-col items-center justify-center py-[1.875rem] xl:py-[3.375rem] lg:py-9 md:py-[3.25rem]'>
				<div className='w[3.4375rem] h-[3.4375rem] xl:w[5.75rem] xl:h-[5.75rem] lg:w[4.0625rem] lg:h-[4.0625rem] md:w[5.75rem] md:h-[5.75rem]'>
					<img src={XonLogo} alt='xon logo' className='h-full w-full' />
				</div>
				<h2 className='xl:text-[2rem] xl:leading-[2.75rem] lg:text-2xl lg:leading-8 md:text-[2rem] md:leading-[2.75rem] text-2xl leading-[1.875rem] text-center font-bold mt-4 xl:mt-6 lg:mt-4 md:mt-6'>
					Get Started to Changing How You Learn Now
				</h2>
				<span className='xl:text-[2rem] xl:leading-8 lg:text-2xl lg:leading-5 md:text-[2rem] md:leading-[1.875rem] text-2xl leading-[1.375rem] font-bold mt-9 xl:mt-[1.875rem] lg:mt-6 md:mt-[1.875rem]'>
					Sign in
				</span>
				<form onSubmit={handleSubmit} className='w-full flex flex-col gap-11'>
					<div className='flex flex-col gap-y-6 xl:gap-y-[1.875rem] lg:gap-y-5 md:gap-y-[1.875rem] mt-[1.625rem] xl:mt-[2.875rem] lg:mt-[2rem] md:mt-[1.875rem]'>
						<Input
							type='email'
							label='Email'
							id='email'
							value={values?.email}
							placeholder='Enter your email'
							onTextChange={handleChange}
							showError={touched.email && errors.email}
							message={errors.email}
						/>
						<Input
							type={showPassword ? TEXT : PASSWORD}
							label='Password'
							id='password'
							value={values?.password}
							placeholder='Min 8 chars'
							isPassword={true}
							isForgotPassword={true}
							onTextChange={handleChange}
							showError={touched.password && errors.password}
							message={errors.password}
							showPasswordField={showPassword}
							togglePasswordVisibility={() => setShowPassword(!showPassword)}
						/>
					</div>
					<div className='flex flex-col gap-y-6 xl:gap-y-6 lg:gap-y-3'>
						<Checkbox
							type='checkbox'
							id='termsAndPrivacy'
							checked={values?.termsAndPrivacy}
							label={<p className='text-xs xl:text-base lg:text-[.625rem]'>I agree to the{' '}
								<Link to='/' className='font-medium underline'>
									Terms & Privacy
								</Link></p>
							}
							handleCheckbox={handleChange}
							showError={!!touched.termsAndPrivacy && !!errors.termsAndPrivacy}
							message={errors.termsAndPrivacy}
						/>
						<Button
							type='submit'
							variant='primary'
							size='full'
							label='Sign In'
						/>
						<span className='text-base text-darkPrimary text-center font-normal my-1.5 md:my-3'>
							OR
						</span>
					</div>
				</form>
				<GoogleSignIn />
				<p className='text-sm xl:text-base lg:text-xs md:text-base text-textSecondary font-normal mt-[3.125rem] xl:mt-[2.375rem] lg:mt-10 md:mt-[2.375rem]'>
					Don’t have an account ?{' '}
				<Link
					to={ROUTES.SIGN_UP}
					className='text-sm xl:text-base lg:text-xs md:text-base text-darkPrimary font-bold'
				>
					Sign Up
				</Link>
				</p>
			</div>
		</div>
  	);
}
