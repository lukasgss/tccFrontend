import { useQuery } from "@tanstack/react-query";
import { GetUserCreatedAlerts } from "../services/requests/Alerts/Adoption/adoptionAlertService";

export default function useUserCreatedAlertsQuery() {
  return useQuery({
    queryKey: ["userCreatedAlerts"],
    queryFn: ({ signal }) => GetUserCreatedAlerts(signal),
  });
}
