import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateUser } from "../services";

export default function useUserUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user) => updateUser(user),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], (oldData) => data.updated);
    },
    retry: 0,
  });
}
