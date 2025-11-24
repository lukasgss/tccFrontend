import { useQuery } from "@tanstack/react-query";
import { GetMessageNotifications } from "../services/requests/UserMessages/UserMessageService";

export const queryKey = ["message-notifications-amount"];

export default function useMessageNotificationsAmount(isAuthenticated: boolean) {
  return useQuery({
    queryKey,
    queryFn: ({ signal }) => GetMessageNotifications(signal),
    enabled: isAuthenticated,
  });
}
