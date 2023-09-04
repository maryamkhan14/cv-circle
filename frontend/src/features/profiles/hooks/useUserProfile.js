import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../services";

export default function useUserProfile(toRetrieveId, enabled) {
  return useQuery({
    queryKey: ["profile", toRetrieveId],
    queryFn: async () => {
      const user = await getUserProfile(toRetrieveId);
      return {
        ...user,
        displayName: user?.displayName || user?.name,
      };
    },
    staleTime: 60 * 1000 * 10, // 10 minutes,
    retry: 0,
    enabled,
  });
}
