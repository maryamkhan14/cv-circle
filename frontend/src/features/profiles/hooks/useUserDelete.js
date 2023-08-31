import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteUser } from "../services";

export default function useUserUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId) => deleteUser(userId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["posts"]);
      queryClient.invalidateQueries(["user"]);
    },
    retry: 0,
  });
}
