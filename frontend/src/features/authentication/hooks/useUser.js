import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services";

export default function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: 60 * 1000 * 60 * 24, // 24 hours,
    refetchOnWindowFocus: false,
    retry: 0,
  });
}
