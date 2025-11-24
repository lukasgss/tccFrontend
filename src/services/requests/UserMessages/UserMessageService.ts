import { API } from "../../Api";
import { NotificationAmountResponse, PaginatedUserMessageResponse, UserConversation } from "./types";

export async function GetUserConversations(signal: AbortSignal): Promise<UserConversation[]> {
  const response = await API.get(`/user-messages/`, {
    signal,
  });
  return response.data;
}

export async function GetPaginatedUserMessages(
  otherUserId: string,
  pageNumber: number,
  pageSize: number,
  signal: AbortSignal,
): Promise<PaginatedUserMessageResponse> {
  const response = await API.get(
    `/user-messages/specific?otherUserId=${otherUserId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    {
      signal,
    },
  );
  return response.data;
}

export async function GetMessageNotifications(signal: AbortSignal): Promise<NotificationAmountResponse> {
  const response = await API.get("/user-messages/notifications", {
    signal,
  });
  return response.data;
}
