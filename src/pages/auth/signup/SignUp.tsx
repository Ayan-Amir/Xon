import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactNiceAvatar, { genConfig } from 'react-nice-avatar';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { usePostMutation } from '@/services/networkRequestService';
import { Button, Checkbox, Input, Modal } from '@/common/components';
import { ROUTES } from '@/routes';
import { apiEndPoint } from '@/services';
import { PASSWORD_REGEX, USERNAME_REGEX } from '@/utils/regex';
import { PASSWORD, TEXT } from '@/utils/constant';
import XonLogo from '@/assets/images/xon-logo.png';
import UserAvatar from '@/assets/images/user-avatar.png';

type AvatarFullConfig = {
  faceColor: string;
  earSize: 'small' | 'big';
  hairColor: string;
  hairStyle: 'normal' | 'thick' | 'mohawk' | 'womanLong' | 'womanShort';
  hatStyle: 'beanie' | 'turban' | 'none';
  eyeStyle: 'circle' | 'oval' | 'smile';
  noseStyle: 'short' | 'long' | 'round';
  mouthStyle: 'laugh' | 'smile' | 'peace';
  shirtStyle: 'hoody' | 'short' | 'polo';
  glassesStyle: 'round' | 'square' | 'none';
  hatColor: string;
  eyeBrowStyle: 'up' | 'upWoman';
  shirtColor: string;
  bgColor: string;
  sex: 'man' | 'woman';
};

export function SignUp() {
	
	const navigate = useNavigate();

	const [showAvatarModal, setShowAvatarModal] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const openAvatarModal = () => setShowAvatarModal(true);
	const closeAvatarModal = () => setShowAvatarModal(false);

	// TODO: Will move avatars data into separate json file
	const config: AvatarFullConfig = {
		sex: 'man',
		faceColor: '#F9C9B6',
		earSize: 'small',
		eyeStyle: 'oval',
		noseStyle: 'short',
		mouthStyle: 'smile',
		shirtStyle: 'polo',
		glassesStyle: 'none',
		hairColor: '#000',
		hairStyle: 'thick',
		hatStyle: 'none',
		hatColor: '#000',
		eyeBrowStyle: 'up',
		shirtColor: '#77311D',
		bgColor: '#FFEDEF',
	};

	const signUpValidationSchema = Yup.object({
		username: Yup.string()
    .matches(USERNAME_REGEX, 'Username may contain only letters, numbers, and @ . + - _ characters')
    .min(5, 'Username must be at least 5 characters')
    .max(20, 'Username must be at most 20 characters')
    .required('Username is required'),
		email: Yup.string().email('Invalid email address').required('Email is required'),
		password: Yup.string()
		.min(8, 'Password must be at least 8 characters')
		.matches(PASSWORD_REGEX, 'Password must contain at least one numeric character')
		.required('Password is required'),
		termsAndPrivacy: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
	});

	const { handleChange, handleSubmit, touched, values, errors } = useFormik({
		initialValues: { username: '', email: '', password: '', termsAndPrivacy: false },
		validationSchema: signUpValidationSchema,
		onSubmit: () => handleSignUp(),
	});

	const signUpSuccess = () => {
		navigate(ROUTES.SUCCESSFUL_SIGN_UP);
	};
	
	const signUpError = (error: object) => {
		// TODO: show error in toast
		console.log(error);
	};

	const getSignUpPayload = () => {
		const payload = {
			username: values.username,  
			email: values.email,
			password1: values.password,
			password2: values.password,
		}
		return payload;
	};

	const { mutate: handleSignUp } = usePostMutation(
		'sign-up',
		apiEndPoint.SIGN_UP,
		getSignUpPayload(),
		signUpSuccess,
		signUpError,
	);

  const myConfig = genConfig(config);

  return (
    <>
      <div className='w-full lg:max-w-[27.5625rem] xl:max-w-[38.75rem] h-full flex justify-center'>
        <div className='w-full max-w-[21.875rem] xl:max-w-[26.5rem] lg:max-w-[18.875rem] md:max-w-[26.5rem] flex flex-1 flex-col items-center justify-center py-[1.875rem] xl:py-[3.375rem] lg:py-9 md:py-[3.25rem]'>
          <div className='w[3.4375rem] h-[3.4375rem] xl:w[5.75rem] xl:h-[5.75rem] lg:w[4.0625rem] lg:h-[4.0625rem] md:w[5.75rem] md:h-[5.75rem]'>
            <img src={XonLogo} alt='xon logo' className='h-full w-full' />
          </div>
          <h2 className='xl:text-[2rem] xl:leading-[2.75rem] lg:text-2xl lg:leading-8 md:text-[2rem] md:leading-[2.75rem] text-2xl leading-[1.875rem] text-center font-bold mt-4 xl:mt-6 lg:mt-4 md:mt-6'>
            Get Started to Changing How You Learn Now
          </h2>
          <span className='xl:text-[2rem] xl:leading-8 lg:text-2xl lg:leading-5 md:text-[2rem] md:leading-[1.875rem] text-2xl leading-[1.375rem] font-bold mt-9 xl:mt-[1.875rem] lg:mt-6 md:mt-[1.875rem]'>
            Sign Up
          </span>
          <form onSubmit={handleSubmit} className='w-full flex flex-col gap-y-8 xl:gap-y-[3.375rem] lg:gap-y-6 md:gap-y-[3.375rem]'>
            <div className='flex flex-col gap-y-[1.875rem] xl:gap-y-[1.875rem] lg:gap-y-6'>
              <div
                className='mt-6 xl:mt-6 lg:mt-4 md:mt-6 flex flex-col items-center gap-2.5 xl:gap-2.5 lg:gap-2 md:gap-2.5 cursor-pointer'
                onClick={openAvatarModal}
              >
                <div className='w[5.75rem] h-[5.75rem] xl:w[5.75rem] xl:h-[5.75rem] lg:w[4.0625rem] lg:h-[4.0625rem]'>
                  <img
                    src={UserAvatar}
                    alt='user-avatar'
                    className='w-full h-full'
                  />
                </div>
                <span className='text-base xl:text-base lg:text-sm text-center font-medium'>
                  Select Avatar
                </span>
              </div>
              <div className='flex flex-col gap-y-6 xl:gap-y-[1.875rem] lg:gap-y-5 md:gap-y-[1.875rem]'>
                <Input
									type='text'
									label='Username'
									id='username'
									value={values?.username}
									name='username'
									placeholder='John Smith'
									onTextChange={handleChange}
									showError={touched.username && errors.username}
									message={errors.username}
                />
                <Input
                  type='email'
									label='Email'
									id='email'
									value={values?.email}
									name='email'
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
									name='password'
									placeholder='Min 8 chars'
									isPassword={true}
									onTextChange={handleChange}
									showPasswordField={showPassword}
									togglePasswordVisibility={() => setShowPassword(!showPassword)}
									showError={touched.password && errors.password}
									message={errors.password}
                />
              </div>
            </div>
            <div className='flex flex-col gap-y-[1.375rem] xl:gap-y-4 lg:gap-y-3 md:gap-y-4'>
              <Checkbox
                type='checkbox'
								id='termsAndPrivacy'
                label={
                  <p className='text-xs xl:text-base lg:text-[.625rem]'>
                    I agree to the{' '}
                    <Link
                      to='/'
                      className='text-xs xl:text-base lg:text-[.625rem] font-medium underline'
                    >
                      Terms & Privacy
                    </Link>
                  </p>
                }
								handleCheckbox={handleChange}
								showError={!!touched.termsAndPrivacy && !!errors.termsAndPrivacy}
								message={errors.termsAndPrivacy}
              />
              <Button type='submit' variant='primary' size='full' label='Sign Up' />
            </div>
          </form>
          <p className='text-sm xl:text-base lg:text-xs md:text-base text-textSecondary font-normal mt-[3.125rem] xl:mt-[2.375rem] lg:mt-10 md:mt-[2.375rem] '>
            Already have an account?{' '}
            <Link
              to={ROUTES.SIGN_IN}
              className='text-sm xl:text-base lg:text-xs md:text-base text-darkPrimary font-bold'
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <Modal isOpen={showAvatarModal} onClose={closeAvatarModal} width='660px'>
        <div className='flex flex-wrap items-center justify-center gap-x-[3rem] gap-y-6'>
          {/* TODO: replace with avatar file data */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i}>
              <ReactNiceAvatar
                className='avatar'
                {...myConfig}
              />
            </div>
          ))}
        </div>
        <div className='xl:px-[2.9375rem] lg:px-[3.4375rem] mt-[1.875rem] xl:mt-14 lg:mt-10'>
          <Button variant='primary' size='full' label='Confirm' />
        </div>
      </Modal>
    </>
  );
}
