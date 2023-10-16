import { ComponentType, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from '@/routes/PrivateRoute';
import {
  EmailVerification,
  DegreeSelect,
  ForgotPassword,
  ResetPassword,
  SignIn,
  SignUp,
  SuccessfulSignUp,
  UserType,
} from '@/pages/auth';
import { userContext } from '@/useContext';
import { ROUTES } from '@/routes/Routes';
import { Review } from '@/pages/review';
import { Deck } from '@/pages/deck';
//TODO: fix import file path
import { Home } from '@/pages/home/Home';
import { FlashCard } from '@/pages/flashcard/FlashCard';
import { PdfImport } from '@/pages/pdfImport/PdfImport';
import { Anki } from '@/pages/ankiImport/Anki';
import { LeaderBoard } from '@/pages/leaderboard';

export function Routing() {
  const [profileData, setProfileData] = useState<object>({});
  const [profilePayload, setProfilePayload] = useState<object>({});

  return (
    <userContext.Provider
      value={{
        profileData,
        setProfileData,
        profilePayload,
        setProfilePayload,
      }}
    >
      <Routes>
        <Route path={ROUTES.SIGN_IN} element={createPrivateRoute(SignIn)} />
        <Route path={ROUTES.SIGN_UP} element={createPrivateRoute(SignUp)} />
        <Route
          path={ROUTES.EMAIL_VERIFICATION}
          element={<EmailVerification />}
        />
        <Route
          path={ROUTES.FORGOT_PASSWORD}
          element={createPrivateRoute(ForgotPassword)}
        />
        <Route
          path={ROUTES.RESET_PASSWORD}
          element={createPrivateRoute(ResetPassword)}
        />
        <Route path={ROUTES.USER_TYPE} element={<UserType />} />
        <Route
          path={ROUTES.DEGREE_SELECT}
          element={<DegreeSelect />}
        />
        <Route
          path={ROUTES.SUCCESSFUL_SIGN_UP}
          element={<SuccessfulSignUp />}
        />
        <Route path={ROUTES.REVIEW} element={<Review />} />
        <Route path={ROUTES.DECKS} element={createPrivateRoute(Deck)} />
        <Route path={ROUTES.DECKS_DECK} element={createPrivateRoute(Deck)} />
        <Route path={ROUTES.DECKS_CARD} element={createPrivateRoute(Deck)} />
        <Route path={ROUTES.HOME} element={createPrivateRoute(Home)} />
        <Route
          path={ROUTES.PDF_IMPORT}
          element={createPrivateRoute(PdfImport)}
        />
        <Route path={ROUTES.ANKI_IMPORT} element={createPrivateRoute(Anki)} />
        <Route
          path={ROUTES.FLASHCARD}
          element={createPrivateRoute(FlashCard)}
        />
        <Route path={ROUTES.LEADERBOARD} element={createPrivateRoute(LeaderBoard)} />
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
