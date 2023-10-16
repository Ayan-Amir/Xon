export const apiEndPoint = {
  ME: '/users/me/',
  //auth
  SIGN_UP: '/users/signup/',
  SIGN_IN: '/users/token/create/',
  EMAIL_VERIFICATION: '/users/verify-email/',
  GOOGLE_SIGN_IN: '/users/login/google/',
  FORGOT_PASSWORD: '/rest-auth/password/reset/',
  PROFILE: '/users/profile/',
  RESET_PASSWORD: (uid: string, key: string) =>
    `/users/password/rest/confirm/${uid}/${key}/`,
  LOGOUT: '/rest-auth/logout/',
  //review
  REVIEW_DECK_CARD: `/cards/deck/review/`,
  UPDATE_REVIEW_DECK_CARD: (cardId?: number) => `/cards/${cardId}/update/state/`,
  //deck
  DECK_CARD_LISTING: (deckCardId: number | string | undefined, pageNo: number | string = 1,) => 
    `/cards/deck/${deckCardId}/cards/?page=${pageNo}`,
  UPDATE_DECK: (deckId: number) => `/cards/deck/${deckId}/`,
  GET_DECK_CARD: (cardId?: number) => `cards/deck/card/${cardId}/`,
  UPDATE_CARD_TAG: (cardId?: number) => `cards/${cardId}/tag/`,
  REMOVE_CARD_TAG: (cardId?: number) => `cards/${cardId}/tag/remove/`,
  DECK_CARD: (deckCardId: number | string) =>
    `/cards/deck/${deckCardId}/cards/`,
  CARD_LIST: (pageNo: number) => `/cards/list/?page=${pageNo}`,
  DECKS: '/cards/decks/',
  UPDATE_DECKS_HIERARCHY: (deckId: string | null) =>
    `/cards/deck/${deckId}/update-hierarchy/`,
  //core
  UPLOAD_IMAGE: `/cards/image/upload/`,
  DASHBOARD: '/cards/dashboard/',
  SIDEBAR: `cards/sidebar/` 
};
