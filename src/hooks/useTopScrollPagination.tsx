import { useCallback, useEffect, useRef } from "react";

interface UseTopScrollPaginationProps {
  onReachTop: () => void;
  elementRef: React.RefObject<HTMLElement>;
  isLoading: boolean;
  hasMorePages: boolean;
  threshold?: number;
}

export default function useTopScrollPagination({
  onReachTop,
  elementRef,
  isLoading,
  hasMorePages,
  threshold = 0,
}: UseTopScrollPaginationProps) {
  const prevScrollTopRef = useRef<number>(0);

  const handleScroll = useCallback(() => {
    const element = elementRef.current;
    if (!element || isLoading || !hasMorePages) {
      return;
    }

    const currentScrollTop = element.scrollTop;

    if (currentScrollTop < prevScrollTopRef.current && currentScrollTop <= threshold) {
      onReachTop();
    }

    prevScrollTopRef.current = currentScrollTop;
  }, [onReachTop, elementRef, isLoading, hasMorePages, threshold]);

  useEffect(() => {
    const element = elementRef.current;
    element?.addEventListener("scroll", handleScroll);

    return () => element?.removeEventListener("scroll", handleScroll);
  }, [elementRef, handleScroll]);
}
