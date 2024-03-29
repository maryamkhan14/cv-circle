// credit: https://javascript.plainenglish.io/how-to-create-an-optimized-real-time-search-with-react-6dd4026f4fa9
import React, { useEffect, useState } from "react";
import { usePostsListContext } from "../../context/PostsListContext";

const SearchBar = () => {
  const { dispatch } = usePostsListContext();
  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(term);

  // update 'term' value after 1 second from the last update of 'debouncedTerm'
  useEffect(() => {
    const timer = setTimeout(() => setTerm(debouncedTerm), 500);
    return () => clearTimeout(timer);
  }, [debouncedTerm]);

  // submit a new search
  useEffect(() => {
    if (term !== "") {
      dispatch({ type: "UPDATE_SEARCH_TERM", payload: term });
    } else {
      dispatch({ type: "RESET_DISPLAYED" });
    }
  }, [term]);

  return (
    <input
      className="p-2 w-1/3"
      type="text"
      placeholder="Search posts. . ."
      onChange={(e) => setDebouncedTerm(e.target.value)}
      value={debouncedTerm}
    />
  );
};

export default SearchBar;
