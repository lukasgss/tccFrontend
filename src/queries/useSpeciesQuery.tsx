import { useQuery } from "@tanstack/react-query";
import { GetPetSpecies } from "../services/requests/Dropdown/DropdownData";

export default function useSpeciesQuery() {
  return useQuery({
    queryKey: ["petSpecies"],
    queryFn: ({ signal }) => GetPetSpecies(signal),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}
