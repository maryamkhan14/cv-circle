import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../services";

export default function useUserDelete() {
  return useMutation({
    mutationFn: (userId) => deleteUser(userId),
    retry: 0,
  });
}
