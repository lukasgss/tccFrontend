import { useQuery } from "@tanstack/react-query";
import { GetPetColors } from "../services/requests/Dropdown/DropdownData";

export default function useColorsQuery() {
  return useQuery({
    queryKey: ["petColors"],
    queryFn: ({ signal }) => GetPetColors(signal),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}
