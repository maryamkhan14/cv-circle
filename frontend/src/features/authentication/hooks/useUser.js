import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../services";

export default function useUser(overrides = {}) {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await getCurrentUser();
      return { ...user, ...overrides };
    },
    staleTime: 60 * 1000 * 60 * 24, // 24 hours,
    refetchOnWindowFocus: false,
    retry: 0,
  });
}
