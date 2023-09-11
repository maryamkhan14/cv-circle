import { createContext, useContext, useReducer } from "react";
export const InteractiveContext = createContext();
export const InteractiveDispatchContext = createContext();
export const InteractiveContextReducer = (state, action) => {
  switch (action.type) {
    case "DISABLE_INTERACTION":
      return false;
    case "TOGGLE_INTERACTIVE":
      return !state;
    case "UPDATE_INTERACTIVE":
      return action.payload !== "loading" ? true : false;
    default:
      return state;
  }
};
export const InteractiveContextProvider = ({ children }) => {
  const [interactive, dispatch] = useReducer(InteractiveContextReducer, true);

  return (
    <InteractiveContext.Provider value={interactive}>
      <InteractiveDispatchContext.Provider value={dispatch}>
        {children}
      </InteractiveDispatchContext.Provider>
    </InteractiveContext.Provider>
  );
};
export const useInteractive = () => useContext(InteractiveContext);
export const useInteractiveDispatch = () =>
  useContext(InteractiveDispatchContext);
