import { createContext, useReducer, useMemo } from "react";
export const StatusContext = createContext();

export const statusContextReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_STATUS":
      return {
        ...state,
        ...action.payload,
      };
    case "RESET_STATUS":
      return {
        ...state,
        status: "idle",
        statusMsg: "",
      };
    default:
      return state;
  }
};
export const StatusContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(statusContextReducer, {
    status: "idle",
    statusMsg: "",
  });
  const contextValue = useMemo(() => ({ ...state, dispatch }), [state]);

  return (
    <StatusContext.Provider value={contextValue}>
      {children}
    </StatusContext.Provider>
  );
};
