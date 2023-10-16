import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TokenResponse, useGoogleLogin } from '@react-oauth/google';
import { usePostMutation } from '@/services/networkRequestService';
import { apiEndPoint } from '@/services';
import { ACCESS_TOKEN, PARTIAL_ACTIVE } from '@/utils/constant';
import { setLocalStorageItem } from '@/utils';
import { ROUTES } from '@/routes';
import { Button } from '@/common/components/Button';
import { GoogleIcon } from '@/assets/svgs';

export const GoogleSignIn = () => {

    const navigate = useNavigate();

    const [googleLoginResponse, setGoogleLoginResponse] = useState<TokenResponse>();

    const googleLogin = useGoogleLogin({
        onSuccess: tokenResponse => setGoogleLoginResponse(tokenResponse),
    });

    const googleSignInSuccess = (data: object) => {
        if (data?.data?.user?.state === PARTIAL_ACTIVE) {
            setLocalStorageItem(ACCESS_TOKEN, data?.data?.accessToken);
            navigate(ROUTES.USER_TYPE);
        } else {
            setLocalStorageItem(ACCESS_TOKEN, data?.data?.accessToken);
            navigate(ROUTES.HOME);
        }
    };

    const googleSignInError = (error: object) => {
        // TODO: show error in toast
        console.log(error);
    };

    const getGoogleSignInPayload = () => {
        const payload = {
            accessToken: googleLoginResponse?.access_token,
        }
        return payload;
    };

    const { mutate: handleGoogleSignIn } = usePostMutation(
        'google-sign-in',
        apiEndPoint.GOOGLE_SIGN_IN,
        getGoogleSignInPayload(),
        googleSignInSuccess,
        googleSignInError,
    );

    useEffect(() => {
        googleLoginResponse && handleGoogleSignIn();
    }, [googleLoginResponse]);

    return (
        <Button
            onClick={googleLogin}
            variant='tertiary'
            size='full'
            label='Sign in with Google'
            icon={<GoogleIcon />}
            iconType='lead'
            className='!py-4'
        />
    );
};
