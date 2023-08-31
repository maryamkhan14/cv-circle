import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../services";

export default function useAllPosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
    staleTime: 60 * 1000 * 5,
    retry: 1,
  });
}
