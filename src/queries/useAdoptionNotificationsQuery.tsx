import { useQuery } from "@tanstack/react-query";
import { GetAdoptionNotifications } from "../services/requests/AdoptionNoficiations/AdoptionNotificationsService";

export default function useAdoptionNoficationsQuery(isAuthenticated: boolean) {
  return useQuery({
    queryKey: ["adoption-notifications"],
    queryFn: ({ signal }) => GetAdoptionNotifications(signal),
    enabled: isAuthenticated,
  });
}
