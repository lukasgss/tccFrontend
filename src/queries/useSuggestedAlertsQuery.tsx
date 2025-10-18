import { useQuery } from "@tanstack/react-query";
import { Coordinate } from "../hooks/useGeoLocation";
import { GetSuggestedAlerts } from "../services/requests/Alerts/Adoption/adoptionAlertService";

export default function useSuggestedAlertsQuery(userLocation: Coordinate | null) {
  return useQuery({
    queryKey: ["suggestedAlerts"],
    queryFn: ({ signal }) => GetSuggestedAlerts(userLocation, signal),
  });
}
