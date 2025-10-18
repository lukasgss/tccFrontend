import { useQuery } from "@tanstack/react-query";
import { GetPetAges } from "../services/requests/Dropdown/DropdownData";

export default function useAgesQuery() {
  return useQuery({
    queryKey: ["petAges"],
    queryFn: ({ signal }) => GetPetAges(signal),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
