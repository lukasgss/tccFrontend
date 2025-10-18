import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import usePagination from "../hooks/usePagination";
import { GetPaginatedAlerts } from "../services/requests/Alerts/Adoption/adoptionAlertService";
import { AdoptionAlertListingResponse } from "../services/requests/Alerts/Adoption/types";

export default function usePaginatedAdoptionAlertsQuery(pageSize: number, queryString: string) {
  const queryKey = ["adoptions", pageSize, queryString];
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
    queryFn: async ({ pageParam = 1, signal }) => GetPaginatedAlerts(pageParam, pageSize, signal, queryString),
    getNextPageParam: (_, pages) => pages.length + 1,
    initialPageParam: 1,
  });
  const amountOfPages = paginatedAlerts?.pages[0].totalPages;
  usePagination(fetchNextPage, paginatedAlerts?.pages.length ?? 1, amountOfPages, isFetchingNextPage);

  const adoptionAlerts = paginatedAlerts?.pages.flatMap((page) => page.data) ?? [];

  function setQueryData(updatedAlerts: AdoptionAlertListingResponse[]) {
    queryClient.setQueryData(queryKey, { ...paginatedAlerts, pages: [{ data: updatedAlerts }] });
  }

  return {
    paginatedAlerts,
    isError,
    isFetchingNextPage,
    isLoading,
    adoptionAlerts,
    fetchNextPage,
    setQueryData,
    refetch,
  };
}
