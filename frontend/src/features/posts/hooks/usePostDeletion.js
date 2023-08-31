import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deletePost } from "../services";
export default function usePostDeletion(postId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["post", data.deleted.id]);
      queryClient.invalidateQueries(["posts"]);
    },
    retry: 0,
  });
}
