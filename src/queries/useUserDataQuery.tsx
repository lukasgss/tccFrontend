import { useQuery } from "@tanstack/react-query";
import { GetUserData } from "../services/requests/User/UserService";

export const staticQueryKey = "userInformation";

export default function useUserInfoQuery(userId: string | null) {
  return useQuery({
    queryKey: [staticQueryKey, userId],
    queryFn: ({ signal }) => GetUserData(userId!, signal),
    enabled: !!userId,
  });
}
