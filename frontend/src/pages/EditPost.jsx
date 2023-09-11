import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { usePost } from "../features/posts/hooks";
import PostForm from "../features/posts/components/form/PostForm";
import { PostFormContextProvider } from "../features/posts/context/PostFormContext";
import { InteractiveContextProvider } from "../context/InteractiveContext";

const EditPost = () => {
  let { id: toEditId } = useParams(); //postId->toEditId
  const navigate = useNavigate();
  const [postToEdit, setPostToEdit] = useState(null);
  const [user] = useOutletContext();
  // fetch existing post if in edit mode
  let { data } = usePost(toEditId);
  useEffect(() => {
    if (data && data.userId !== user.userId) {
      navigate("/not-permitted");
    } else if (data) {
      setPostToEdit(data);
    }
  }, [data]);
  return (
    <InteractiveContextProvider>
      <PostFormContextProvider>
        <PostForm toEditId={toEditId} user={user} postToEdit={postToEdit} />
      </PostFormContextProvider>
    </InteractiveContextProvider>
  );
};

export default EditPost;
