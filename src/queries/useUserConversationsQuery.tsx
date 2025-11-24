import { useQuery } from "@tanstack/react-query";
import { GetUserConversations } from "../services/requests/UserMessages/UserMessageService";

export const queryKey = ["user-conversations"];

export default function useUserConversations(isAuthenticated: boolean) {
  return useQuery({
    queryKey,
    queryFn: ({ signal }) => GetUserConversations(signal),
    enabled: isAuthenticated,
  });
}
