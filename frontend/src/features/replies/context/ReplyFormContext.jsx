import { createContext, useReducer } from "react";
export const ReplyFormContext = createContext();

export const replyFormContextReducer = (state, action) => {
  switch (action.type) {
    case "SWITCH_REPLY_FORM_ACTIVE":
      return {
        ...state,
        replyForm: { ...state.replyForm, active: !state.replyForm.active },
      };
    case "SWITCH_REPLY_FORM_LOADING":
      return {
        ...state,
        replyForm: { ...state.replyForm, loading: action.payload },
      };
    case "SET_MODE":
      return {
        ...state,
        replyForm: { ...state.replyForm, mode: action.payload },
      };
    default:
      return state;
  }
};
export const ReplyFormContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(replyFormContextReducer, {
    replyForm: {
      active: false,
      loading: false,
      mode: "create",
    },
  });

  return (
    <ReplyFormContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ReplyFormContext.Provider>
  );
};
