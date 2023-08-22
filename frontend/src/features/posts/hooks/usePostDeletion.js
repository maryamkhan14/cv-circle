import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deletePost } from "../services";
import unset from "lodash/unset";
import getPathDetails from "../utils/getReplyPath";
export default function usePostDeletion(postId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: (data) => {
      //test against regex since React Query is unreliably switching between returning strings and booleans
      if (isReply(data)) {
        let { originalPostId, replyPath } = getPathDetails(data);
        queryClient.setQueryData(["post", originalPostId], (oldData) => {
          let newData = { ...oldData };
          unset(newData, replyPath);
          return { ...newData };
        });
      } else {
        queryClient.invalidateQueries(["post", data.deleted.id]);
        queryClient.invalidateQueries(["posts"]);
      }
    },
    retry: 0,
  });
}
function isReply(data) {
  return /true/i.test(data.deleted.isReply);
}
