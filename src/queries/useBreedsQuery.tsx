import { useQuery } from "@tanstack/react-query";
import { GetPetBreeds } from "../services/requests/Dropdown/DropdownData";

export default function useBreedsQuery(speciesValue: string | null) {
  return useQuery({
    queryKey: ["petBreeds", speciesValue],
    queryFn: ({ signal }) => GetPetBreeds(speciesValue!, signal),
    enabled: !!speciesValue,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
