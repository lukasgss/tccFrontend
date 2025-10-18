import { API } from "../../Api";
import { PetResponse } from "./types";

export default async function CreatePet(formData: FormData): Promise<PetResponse> {
  const response = await API.post("/pets", formData);
  return response.data;
}
