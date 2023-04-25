import { createContext, useReducer } from "react";
export const UserContext = createContext();

export const userContextReducer = (state, action) => {
  switch (action.type) {
    case "USER_SIGNED_IN":
      console.log("received", action.payload);
      return {
        ...state,
        user: { ...state.user, ...action.payload },
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
