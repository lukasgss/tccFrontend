import { useQuery } from "@tanstack/react-query";
import { GetUserSavedAlerts } from "../services/requests/Alerts/Adoption/adoptionAlertService";

export default function useUserSavedAlertsQuery() {
  return useQuery({
    queryKey: ["userSavedAlerts"],
    queryFn: ({ signal }) => GetUserSavedAlerts(signal),
  });
}
