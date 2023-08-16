import { createContext, useReducer, useMemo } from "react";
export const ProfileEditContext = createContext();

export const profileEditContextReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_PROFILE":
      return {
        ...state,
        profile: { ...state.profile, ...action.payload },
      };
    case "UPDATE_STATUS":
      return { ...state, status: { ...state.status, ...action.payload } };
    default:
      return state;
  }
};
export const ProfileEditContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileEditContextReducer, {
    profile: {
      name: "",
      email: "",
      profilePic: "",
      displayName: "",
      linkedin: "",
      twitter: "",
      bio: "",
      file: null,
    },
    status: {
      error: 0,
      msg: "",
      success: 0,
    },
  });
  const contextValue = useMemo(() => ({ ...state, dispatch }), [state]);

  return (
    <ProfileEditContext.Provider value={contextValue}>
      {children}
    </ProfileEditContext.Provider>
  );
};
