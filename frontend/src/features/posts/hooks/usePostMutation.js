import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updatePost, createPost } from "../services";
import setWith from "lodash/setWith";
import getPathDetails from "../utils/getReplyPath";

export default function usePostMutation(toEditId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post) =>
      toEditId ? updatePost(post, toEditId) : createPost(post),
    onSuccess: (data) => {
      console.log("updated/posted", data);
      // compare to string 'true' since React Query returns all primitive properties as strings

      if (isReply(data)) {
        let { originalPostId, replyPath } = getPathDetails(data);
        queryClient.setQueryData(["post", originalPostId], (oldData) => {
          let newData = setWith(
            { ...oldData },
            replyPath,
            data.posted || data.updated,
            Object
          );
          return { ...newData };
        });
        console.log(queryClient.getQueryData(["post", originalPostId]));
      } else {
        console.log("top level post");
        console.log("editing", toEditId);
        if (toEditId) {
          queryClient.setQueryData(
            ["post", toEditId],
            (oldData) => data.updated
          );
        } else {
          queryClient.setQueryData(
            ["post", data.posted.id],
            (oldData) => data.posted
          );
        }
        queryClient.invalidateQueries(["posts"]);
      }
      return data;
    },
    retry: 0,
  });
}

function isReply(data) {
  return (
    /true/i.test(data.posted?.isReply) || /true/i.test(data.updated?.isReply)
  );
}
