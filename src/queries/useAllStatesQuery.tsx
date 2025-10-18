import { useQuery } from "@tanstack/react-query";
import { GetAllStates } from "../services/requests/Dropdown/DropdownData";

export default function useAllStatesQuery() {
  return useQuery({
    queryKey: ["states"],
    queryFn: ({ signal }) => GetAllStates(signal),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}
