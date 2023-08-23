import { createContext, useReducer, useMemo } from "react";
export const StatusContext = createContext();

export const statusContextReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_STATUS":
      return {
        ...state,
        ...action.payload,
        show: true,
      };
    case "RESET_STATUS":
      return {
        ...state,
        status: "idle",
        statusMsg: "",
      };
    case "SWITCH_SHOW":
      return {
        ...state,
        show: !state.show,
      };
    default:
      return state;
  }
};
export const StatusContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(statusContextReducer, {
    status: "idle",
    statusMsg: "",
    show: true,
  });
  const contextValue = useMemo(() => ({ ...state, dispatch }), [state]);

  return (
    <StatusContext.Provider value={contextValue}>
      {children}
    </StatusContext.Provider>
  );
};
