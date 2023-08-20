import { useQuery } from "@tanstack/react-query";
import { getPost } from "../services";

export default function usePost(id) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: async () => await getPost(id),
    staleTime: 60 * 1000 * 5,
    retry: 1,
    enabled: !!id,
  });
}
