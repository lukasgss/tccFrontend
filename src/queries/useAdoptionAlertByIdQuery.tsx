import { useQuery } from "@tanstack/react-query";
import { GetAlertById } from "../services/requests/Alerts/Adoption/adoptionAlertService";

export default function useAdoptionAlertByIdQuery(alertId: string) {
  return useQuery({
    queryKey: ["adoptionAlertById", alertId],
    queryFn: ({ signal }) => GetAlertById(alertId, signal),
  });
}
