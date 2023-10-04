import { createContext } from 'react';

type ContextValue = {
    profileData: object;
    setProfileData: React.Dispatch<React.SetStateAction<object>>;
    profilePayload: object;
    setProfilePayload: React.Dispatch<React.SetStateAction<object>>;
};

export const userContext = createContext<ContextValue>({
    profileData: {},
    setProfileData: () => {},
    profilePayload: {
        type: {},
        degree: {},
    },
    setProfilePayload: () => {},
});
