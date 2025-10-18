import { useQuery } from "@tanstack/react-query";
import { GetAdoptionUserPreferences } from "../services/requests/User/UserService";

export default function useAdoptionUserPreferencesQuery() {
  return useQuery({
    queryKey: ["adoptionUserPreferences"],
    queryFn: ({ signal }) => GetAdoptionUserPreferences(signal),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
