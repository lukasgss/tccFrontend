import { useQuery } from "@tanstack/react-query";
import { GetUserProfile } from "../services/requests/User/UserService";

export default function useUserProfileQuery(userId?: string) {
  return useQuery({
    queryKey: ["user-profile", userId],
    queryFn: ({ signal }) => GetUserProfile(userId, signal),
    enabled: !!userId,
  });
}
