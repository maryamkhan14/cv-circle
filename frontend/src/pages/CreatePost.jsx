import { InteractiveContextProvider } from "../context/InteractiveContext";
import PostForm from "../features/posts/components/form/PostForm";
import { PostFormContextProvider } from "../features/posts/context/PostFormContext";
import { useOutletContext } from "react-router-dom";
const CreatePost = () => {
  const [user] = useOutletContext();
  return (
    <InteractiveContextProvider>
      <PostFormContextProvider>
        <PostForm user={user} />
      </PostFormContextProvider>
    </InteractiveContextProvider>
  );
};

export default CreatePost;
