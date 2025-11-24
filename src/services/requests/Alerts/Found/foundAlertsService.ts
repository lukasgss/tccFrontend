import { API } from "../../../Api";
import { FoundAnimalAlertResponse, FoundFavoriteResponse, PaginatedFoundAlertResponse } from "./types";

export default async function ListFoundAnimalAlerts(
  page: number,
  pageSize: number,
  signal: AbortSignal | undefined,
  filtersQueryString: string,
): Promise<PaginatedFoundAlertResponse> {
  const { data } = await API.get(`/found-alerts?page=${page}&pageSize=${pageSize}${filtersQueryString}`, { signal });

  return data;
}

export async function CreateFoundAnimalAlert(formData: FormData): Promise<FoundAnimalAlertResponse> {
  const { data } = await API.post("/found-alerts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}

export async function GetFoundAnimalAlertById(alertId: string): Promise<FoundAnimalAlertResponse> {
  const { data } = await API.get(`/found-alerts/${alertId}`);
  return data;
}

export async function ToggleFoundAlertFavorite(alertId: string): Promise<FoundFavoriteResponse> {
  return API.post(`/favorites/found/${alertId}`);
}

export async function ToggleFoundAnimalAlertStatus(alertId: string): Promise<FoundAnimalAlertResponse> {
  const { data } = await API.put(`/found-alerts/rescue/${alertId}`);
  return data;
}
