import { useQuery } from "@tanstack/react-query";
import { GetPetGenders, GetPetGendersForFilters } from "../services/requests/Dropdown/DropdownData";

export default function useGendersQuery(isForFilters: boolean = false) {
  return useQuery({
    queryKey: ["petGenders"],
    queryFn: ({ signal }) => (isForFilters ? GetPetGendersForFilters(signal) : GetPetGenders(signal)),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}
