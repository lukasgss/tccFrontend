import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import useTopScrollPagination from "../hooks/useTopScrollPagination";
import { GetPaginatedUserMessages } from "../services/requests/UserMessages/UserMessageService";
import { UserMessageResponse } from "../services/requests/UserMessages/types";

export const queryKey = ["user-conversations"];

export default function usePaginatedUserConversations(
  otherUserId: string | null,
  isAuthenticated: boolean,
  containerRef: React.RefObject<HTMLElement>,
) {
  const queryClient = useQueryClient();
  const pageSize = 30;

  const {
    data: paginatedMessages,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: [...queryKey, otherUserId, pageSize],
    queryFn: async ({ pageParam = 1, signal }) => GetPaginatedUserMessages(otherUserId!, pageParam, pageSize, signal),
    getNextPageParam: (_, pages) => pages.length + 1,
    initialPageParam: 1,
    enabled: isAuthenticated && !!otherUserId,
  });
  useTopScrollPagination({
    onReachTop: fetchNextPage,
    elementRef: containerRef,
    isLoading: isFetchingNextPage,
    hasMorePages: hasNextPage,
  });

  const userMessages = paginatedMessages?.pages.flatMap((page) => page?.data).reverse() ?? [];

  function setQueryData(updatedConversations: UserMessageResponse[]) {
    queryClient.setQueryData([...queryKey, otherUserId, pageSize], {
      ...paginatedMessages,
      pages: [{ data: updatedConversations }],
    });
  }

  return {
    paginatedMessages,
    fetchNextPage,
    isFetchingNextPage,
    userMessages,
    loadingFirstPage: userMessages.length === 0 && isLoading,
    setQueryData,
    refetch,
  };
}
