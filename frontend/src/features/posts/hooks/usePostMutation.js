import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updatePost, createPost } from "../services";

export default function usePostMutation(toEditId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post) =>
      toEditId ? updatePost(post, toEditId) : createPost(post),
    onSuccess: (data) => {
      if (toEditId) {
        queryClient.setQueryData(["post", toEditId], (oldData) => data.updated);
      } else {
        queryClient.setQueryData(
          ["post", data.posted.id],
          (oldData) => data.posted
        );
      }
    },
    retry: 0,
  });
}
