import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import usePagination from "../hooks/usePagination";
import ListFoundAnimalAlerts from "../services/requests/Alerts/Found/foundAlertsService";
import { FoundAlertListingResponse } from "../services/requests/Alerts/Found/types";

export default function usePaginatedFoundAlertsQuery(pageSize: number, queryString: string) {
  const queryKey = ["found", pageSize, queryString];
  const queryClient = useQueryClient();
  const {
    data: paginatedAlerts,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = 1, signal }) => ListFoundAnimalAlerts(pageParam, pageSize, signal, queryString),
    getNextPageParam: (_, pages) => pages.length + 1,
    initialPageParam: 1,
  });

  const amountOfPages = paginatedAlerts?.pages[0].totalPages;

  usePagination(fetchNextPage, paginatedAlerts?.pages.length ?? 1, amountOfPages, isFetchingNextPage);

  const foundAlerts = paginatedAlerts?.pages.flatMap((page) => page.data) ?? [];

  function setQueryData(updatedAlerts: FoundAlertListingResponse[]) {
    queryClient.setQueryData(queryKey, { ...paginatedAlerts, pages: [{ data: updatedAlerts }] });
  }

  return {
    paginatedAlerts,
    isError,
    isFetchingNextPage,
    isLoading,
    foundAlerts,
    fetchNextPage,
    setQueryData,
    refetch,
  };
}
