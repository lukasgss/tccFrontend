import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";

export default function usePagination(
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<unknown, unknown>, Error>>,
  pageNumber: number | undefined,
  currentPage: number | undefined,
  isFetching: boolean,
) {
  const handleScroll = useCallback(() => {
    const THRESOLD_TO_FETCH_NEXT_PAGE = 600;

    if (
      window.innerHeight + document.documentElement.scrollTop + THRESOLD_TO_FETCH_NEXT_PAGE >=
        document.documentElement.scrollHeight &&
      pageNumber &&
      currentPage &&
      pageNumber < currentPage &&
      !isFetching
    ) {
      fetchNextPage();
    }
  }, [currentPage, fetchNextPage, isFetching, pageNumber]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageNumber, currentPage, handleScroll]);
}
