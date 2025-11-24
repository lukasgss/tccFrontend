import { UserDataResponse } from "../User/types";

export interface UserConversation {
  userId: string;
  userImageUrl: string;
  userName: string;
  lastMessage: string;
  newMessagesQuantity: number;
  lastMessageTimeStamp: Date;
}

export interface UserMessageResponse {
  id: string;
  content: string;
  timeStampUtc: string;
  hasBeenRead: boolean;
  hasBeenEdited: boolean;
  hasBeenDeleted: boolean;
  sender: UserDataResponse;
  receiver: UserDataResponse;
}

export interface PaginatedUserMessageResponse {
  currentPage: number;
  currentPageCount: number;
  totalPages: number;
  data: UserMessageResponse[];
}

export interface NotificationAmountResponse {
  amount: number;
}
