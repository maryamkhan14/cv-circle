import { useQuery } from "@tanstack/react-query";
import { getAuthStatus } from "../services";

export default function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getAuthStatus,
    staleTime: 60 * 1000 * 30, // 30 minutes
    retry: 0,
  });
}
