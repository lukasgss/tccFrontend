import { useQuery } from "@tanstack/react-query";
import { GetCitiesFromState } from "../services/requests/Dropdown/DropdownData";

export default function useCitiesFromStateQuery(state: string) {
  return useQuery({
    queryKey: ["cities", state],
    queryFn: ({ signal }) => GetCitiesFromState(state, signal),
    enabled: !!state,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
