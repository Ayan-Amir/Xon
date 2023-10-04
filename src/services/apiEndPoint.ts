export const apiEndPoint = {
  SIGN_UP: '/users/signup/',
  SIGN_IN: '/users/token/create/',
  EMAIL_VERIFICATION: '/users/verify-email/',
  GOOGLE_SIGN_IN: '/users/login/google/',
  FORGOT_PASSWORD: '/rest-auth/password/reset/',
  PROFILE: '/users/profile/',
  RESET_PASSWORD: (uid: string, key: string) => `/users/password/rest/confirm/${uid}/${key}/`,

  //review
  REVIEW_DECK_CARD: (deckId: string | undefined) => `/cards/deck/${deckId}/review/`,
  UPDATE_REVIEW_DECK_CARD: (cardId: string | undefined) => `/cards/${cardId}/update/state/`,
};

