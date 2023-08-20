import { createContext, useReducer, useMemo } from "react";
export const PostFormContext = createContext();

export const postFormContextReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_POST":
      return {
        ...state,
        post: { ...state.post, ...action.payload },
      };
    case "UPDATE_STATUS":
      return {
        ...state,
        status: action.payload.status,
        statusMsg: action.payload.msg,
      };
    case "RESET_STATUS":
      return {
        ...state,
        status: "idle",
        statusMsg: "",
      };
    case "RESET_POST":
      return {
        ...state,
        post: {
          createdAt: "",
          id: "",
          imgCdn: "",
          postContent: "",
          title: "",
          userId: "",
          file: null,
        },
      };
    default:
      return state;
  }
};
export const PostFormContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postFormContextReducer, {
    post: {
      createdAt: "",
      id: "",
      imgCdn: "",
      postContent: "",
      title: "",
      userId: "",
      file: null,
    },
    status: "idle",
    statusMsg: "",
  });
  const contextValue = useMemo(() => ({ ...state, dispatch }), [state]);

  return (
    <PostFormContext.Provider value={contextValue}>
      {children}
    </PostFormContext.Provider>
  );
};
