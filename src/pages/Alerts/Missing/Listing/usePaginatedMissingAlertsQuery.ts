import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import GetPaginatedMissingAlerts from "../../../../services/requests/Alerts/Missing/missingAlertsService";

export default function usePaginatedMissingAlertsQuery(pageSize: number, filtersQueryString: string) {
  const queryClient = useQueryClient();

  const {
    data: paginatedAlerts,
    isError,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["missingAlerts", filtersQueryString],
    queryFn: ({ pageParam = 1, signal }) => GetPaginatedMissingAlerts(pageParam, pageSize, signal, filtersQueryString),
    getNextPageParam: (_, pages) => pages.length + 1,
    initialPageParam: 1,
  });

  const missingAlerts = useMemo(() => {
    return paginatedAlerts?.pages.flatMap((page) => page.data) ?? [];
  }, [paginatedAlerts]);

  const setQueryData = (updatedAlerts: any[]) => {
    queryClient.setQueryData(["missingAlerts", filtersQueryString], (oldData: any) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        pages: oldData.pages.map((page: any, pageIndex: number) => {
          const startIndex = pageIndex * pageSize;
          const endIndex = startIndex + pageSize;
          return {
            ...page,
            data: updatedAlerts.slice(startIndex, endIndex),
          };
        }),
      };
    });
  };

  return {
    paginatedAlerts,
    isError,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    missingAlerts,
    setQueryData,
  };
}
