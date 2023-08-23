import { createContext, useReducer, useMemo } from "react";
export const PostFormContext = createContext();

export const postFormContextReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_POST":
      return {
        ...state,
        post: { ...state.post, ...action.payload },
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
      id: 0,
      imgCdn: "",
      postContent: "",
      title: "",
      userId: "",
      file: null,
    },
  });
  const contextValue = useMemo(() => ({ ...state, dispatch }), [state]);

  return (
    <PostFormContext.Provider value={contextValue}>
      {children}
    </PostFormContext.Provider>
  );
};
