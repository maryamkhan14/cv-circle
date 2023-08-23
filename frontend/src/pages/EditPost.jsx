import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { usePost } from "../features/posts/hooks";
import PostForm from "../features/posts/components/form/PostForm";
import { PostFormContextProvider } from "../features/posts/context/PostFormContext";
import StatusNotification from "../features/notifications/components/StatusNotification";

const EditPost = () => {
  let { id: toEditId } = useParams(); //postId->toEditId
  const [postToEdit, setPostToEdit] = useState(null);
  const [user] = useOutletContext();
  // fetch existing post if in edit mode
  let { data } = usePost(toEditId);
  useEffect(() => {
    setPostToEdit(data);
  }, [data]);
  return (
    <>
      <PostFormContextProvider>
        <PostForm toEditId={toEditId} user={user} postToEdit={postToEdit} />
      </PostFormContextProvider>
      <StatusNotification popup="true" />
    </>
  );
};

export default EditPost;
