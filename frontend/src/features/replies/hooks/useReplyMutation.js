import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updatePost, createPost } from "../../posts/services";
import setWith from "lodash/setWith";
import getPathDetails from "../utils/getReplyPath";

export default function useReplyMutation(toEditId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post) =>
      toEditId ? updatePost(post, toEditId) : createPost(post),
    onSuccess: (data) => {
      //test against regex since React Query is unreliably switching between returning strings and booleans
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
      return data;
    },
    retry: 0,
  });
}
