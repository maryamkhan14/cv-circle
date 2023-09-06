import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile } from "../services";

export default function useUserProfile(
  toRetrieveId,
  currentUserId,
  fetchConditionOverrides,
  additionalInformation
) {
  const queryClient = useQueryClient();
  // by default: check toRetrieveId exists, is not the same as current user, and is numeric
  const fetchConditions =
    fetchConditionOverrides ??
    (!!toRetrieveId && currentUserId !== toRetrieveId && !isNaN(toRetrieveId));
  let willFetch = true;

  return useQuery({
    queryKey: ["profile", toRetrieveId],
    queryFn: async () => {
      if (!fetchConditions) {
        await queryClient.refetchQueries({ queryKey: ["user"], stale: true });
        const existingUser = queryClient.getQueryData(["user"]);
        if (existingUser) return existingUser;
      }
      if (willFetch) {
        const user = await getUserProfile(toRetrieveId);
        return {
          ...user,
          displayName: user?.displayName || user?.name,
          ...additionalInformation,
        };
      }
    },
    staleTime: 60 * 1000 * 10, // 10 minutes,
    retry: 0,
  });
}
