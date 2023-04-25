import { createContext, useReducer } from "react";
export const UserContext = createContext();

export const userContextReducer = (state, action) => {
  switch (action.type) {
    case "USER_SIGNED_IN":
      return {
        ...state,
        user: { ...state.user, ...action.payload.user },
      };
    case "USER_SIGNED_OUT":
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};
export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userContextReducer, {
    user: {},
  });
  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
