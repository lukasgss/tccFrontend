import { useQuery } from "@tanstack/react-query";
import { GetPetSizes } from "../services/requests/Dropdown/DropdownData";

export default function useSizesQuery() {
  return useQuery({
    queryKey: ["petSizes"],
    queryFn: ({ signal }) => GetPetSizes(signal),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}
