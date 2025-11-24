import { useQuery } from "@tanstack/react-query";
import { GetMissingAlertById } from "../../../../services/requests/Alerts/Missing/missingAlertsService";

export default function useMissingAlertByIdQuery(alertId: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["missingAlert", alertId],
    queryFn: () => GetMissingAlertById(alertId),
    enabled: !!alertId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}
