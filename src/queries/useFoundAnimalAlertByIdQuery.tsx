import { useQuery } from "@tanstack/react-query";
import { GetFoundAnimalAlertById } from "../services/requests/Alerts/Found/foundAlertsService";

export default function useFoundAnimalAlertByIdQuery(alertId: string) {
  return useQuery({
    queryKey: ["foundAnimalAlert", alertId],
    queryFn: () => GetFoundAnimalAlertById(alertId),
    enabled: !!alertId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
