import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updatePost, createPost } from "../services";

export default function usePostMutation(toEditId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post) =>
      toEditId ? updatePost(post, toEditId) : createPost(post),
    onSuccess: (data) => {
      if (toEditId) {
        console.log(data.updated);
        queryClient.setQueryData(["post", toEditId], (oldData) => {
          return { ...data.updated, replies: oldData.replies };
        });
      } else {
        queryClient.setQueryData(
          ["post", data.posted.id],
          (oldData) => data.posted
        );
      }
      queryClient.invalidateQueries(["posts"]);
      return data;
    },
    retry: 0,
  });
}
