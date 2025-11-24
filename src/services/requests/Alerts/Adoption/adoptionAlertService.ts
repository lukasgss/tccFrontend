import { AxiosResponse } from "axios";
import { Coordinate } from "../../../../hooks/useGeoLocation";
import { API } from "../../../Api";
import {
  AdoptionAlertResponse,
  PaginatedAdoptionAlertResponse,
  SuggestedAlert,
  ToggleAdoptionAlertFavoriteResponse,
} from "./types";

export async function GetSuggestedAlerts(
  coordinates: Coordinate | null,
  signal: AbortSignal,
): Promise<SuggestedAlert[]> {
  let endpoint: string;
  if (coordinates) {
    endpoint = `/adoption-alerts/suggested?latitude=${coordinates?.latitude}&longitude=${coordinates?.longitude}`;
  } else {
    endpoint = "/adoption-alerts/suggested";
  }

  const response = await API.get(endpoint, {
    signal,
  });
  return response.data;
}

export async function GetPaginatedAlerts(
  page: number,
  pageSize: number,
  signal: AbortSignal,
  querySearch?: string,
): Promise<PaginatedAdoptionAlertResponse> {
  const response = await API.get(
    `/adoption-alerts?page=${page}&pageSize=${pageSize}${querySearch ? `&querySearch=${querySearch}` : ""}`,
    {
      signal,
    },
  );
  return response.data;
}

export async function GetAlertById(id: string, signal: AbortSignal): Promise<AdoptionAlertResponse> {
  const response = await API.get(`/adoption-alerts/${id}`, {
    signal,
  });
  return response.data;
}

export async function ToggleAdoptionAlertFavorite(alertId: string): Promise<ToggleAdoptionAlertFavoriteResponse> {
  return API.post(`/favorite/adoptions/${alertId}`);
}

export async function ToggleAdoption(alertId: string): Promise<AdoptionAlertResponse> {
  return API.post(`/adoption-alerts/adopt/${alertId}`);
}

export async function CreateAdoptionAlert(formData: FormData): Promise<AxiosResponse<AdoptionAlertResponse>> {
  return API.post("/adoption-alerts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function UpdateAdoptionAlert(formData: FormData, alertId: string): Promise<AdoptionAlertResponse> {
  const response = await API.put(`/adoption-alerts/${alertId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function GetUserSavedAlerts(signal: AbortSignal): Promise<any> {
  const savedAlerts = await API.get("/users/saved", {
    signal,
  });
  return savedAlerts.data;
}

export async function GenerateAdoptionSharingPoster(alertId: string): Promise<Blob> {
  const response = await API.get(`/adoption-alerts/sharing-poster?alertId=${alertId}`, {
    responseType: "blob",
  });

  return response.data;
}

export async function ReportAdoptionAlert(alertId: string, reason: string): Promise<void> {
  await API.post(`/adoption-reports/${alertId}`, {
    reason,
  });
}
