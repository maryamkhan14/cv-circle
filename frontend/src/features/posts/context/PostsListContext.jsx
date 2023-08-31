import { createContext, useReducer, useMemo, useContext } from "react";
const PostsListContext = createContext();
export const usePostsListContext = () => useContext(PostsListContext);
const sortDisplayedPosts = (displayed, sortSelect) => {
  if (displayed) {
    switch (sortSelect) {
      case "createdAt":
        return [
          ...displayed.sort(
            (a, b) => new Date(b[sortSelect]) - new Date(a[sortSelect])
          ),
        ];
      case "upvoteCount":
        return [...displayed.sort((a, b) => b[sortSelect] - a[sortSelect])];
    }
  }
};
export const postListContextReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_SEARCH_TERM":
      const filtered = [
        ...state.allPosts.filter((post) =>
          post.title.toLowerCase().includes(action.payload.toLowerCase())
        ),
      ];
      return {
        ...state,
        displayed: sortDisplayedPosts(filtered, state.sortOption),
      };
    case "UPDATE_SORT_OPTION":
      return {
        ...state,
        sortOption: action.payload,
        displayed: sortDisplayedPosts(state.displayed, action.payload),
      };
    case "UPDATE_ALL_POSTS":
      return {
        ...state,
        allPosts: action.payload,
        displayed: sortDisplayedPosts(action.payload, state.sortOption),
      };
    case "RESET_DISPLAYED":
      return {
        ...state,
        displayed: sortDisplayedPosts(state.allPosts, state.sortOption),
      };
    default:
      return state;
  }
};
export const PostsListContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postListContextReducer, {
    displayed: null,
    allPosts: null,
    sortOption: "createdAt", //not including search term because it is not considered on allPosts' update
  });
  const contextValue = useMemo(() => ({ ...state, dispatch }), [state]);

  return (
    <PostsListContext.Provider value={contextValue}>
      {children}
    </PostsListContext.Provider>
  );
};
