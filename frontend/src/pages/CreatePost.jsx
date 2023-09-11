import PostForm from "../features/posts/components/form/PostForm";
import { PostFormContextProvider } from "../features/posts/context/PostFormContext";
import { useOutletContext } from "react-router-dom";
const CreatePost = () => {
  const [user] = useOutletContext();
  return (
    <PostFormContextProvider>
      <PostForm user={user} />
    </PostFormContextProvider>
  );
};

export default CreatePost;
