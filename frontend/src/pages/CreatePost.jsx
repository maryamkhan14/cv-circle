import { StatusContextProvider } from "../features/notifications/context/StatusContext";
import PostForm from "../features/posts/components/form/PostForm";
import { PostFormContextProvider } from "../features/posts/context/PostFormContext";
import { useOutletContext } from "react-router-dom";
const CreatePost = () => {
  const [user] = useOutletContext();
  return (
    <StatusContextProvider>
      <PostFormContextProvider>
        <PostForm user={user} />
      </PostFormContextProvider>
    </StatusContextProvider>
  );
};

export default CreatePost;
