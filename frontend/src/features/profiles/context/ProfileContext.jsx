import { createContext, useReducer, useMemo } from "react";
export const ProfileContext = createContext();

export const ProfileContextReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_PROFILE":
      return {
        ...state,
        profile: { ...state.profile, ...action.payload },
      };
    default:
      return state;
  }
};
export const ProfileContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProfileContextReducer, {
    profile: {
      name: "",
      email: "",
      profilePic: "",
      displayName: "",
      linkedin: "",
      twitter: "",
      bio: "",
      file: null,
      self: false,
    },
  });
  const contextValue = useMemo(() => ({ ...state, dispatch }), [state]);

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
};
