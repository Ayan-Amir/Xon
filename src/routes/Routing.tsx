import { ComponentType, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from '@/routes/PrivateRoute';
import { EmailVerification, DegreeSelect, ForgotPassword, ResetPassword, SignIn, SignUp, SuccessfulSignUp, UserType } from '@/pages/auth';
import { Dashboard } from '@/pages/Dashboard';
import { Review } from '@/pages/review/components/Review';
import { userContext } from '@/useContext';
import { ROUTES } from '@/routes/Routes';

export function Routing() {

  const [profileData, setProfileData] = useState<object>({});
  const [profilePayload, setProfilePayload] = useState<object>({});

  return (
    <userContext.Provider value={{
      profileData,
      setProfileData,
      profilePayload,
      setProfilePayload,
    }}>
      <Routes>
        <Route path={ROUTES.SIGN_IN} element={createPrivateRoute(SignIn)} />
        <Route path={ROUTES.SIGN_UP} element={createPrivateRoute(SignUp)} />
        <Route path={ROUTES.EMAIL_VERIFICATION} element={<EmailVerification />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={createPrivateRoute(ForgotPassword)} />
        <Route path={ROUTES.RESET_PASSWORD} element={createPrivateRoute(ResetPassword)} />
        <Route path={ROUTES.USER_TYPE} element={createPrivateRoute(UserType)} />
        <Route path={ROUTES.DEGREE_SELECT} element={createPrivateRoute(DegreeSelect)} />
        <Route path={ROUTES.SUCCESSFUL_SIGN_UP} element={<SuccessfulSignUp />} />
        <Route path={ROUTES.REVIEW} element={createPrivateRoute(Review)} />
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
      </Routes>
    </userContext.Provider>
  );
}

const createPrivateRoute = (Component: ComponentType) => {
  return (
    <PrivateRoute>
      <Component />
    </PrivateRoute>
  );
};
