import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deletePost } from "../../posts/services";
import unset from "lodash/unset";
import getPathDetails from "../utils/getReplyPath";

export default function useReplyDeletion(postId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: (data) => {
      //test against regex since React Query is unreliably switching between returning strings and booleans
      let { originalPostId, replyPath } = getPathDetails(data);
      queryClient.setQueryData(["post", originalPostId], (oldData) => {
        let newData = { ...oldData };
        unset(newData, replyPath);
        return { ...newData };
      });
    },
    retry: 0,
  });
}
