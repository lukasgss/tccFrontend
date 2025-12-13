import { API } from "../../../Api";
import { MissingAlertResponseWithGeoLocation, PaginatedMissingAlertResponse } from "../types";

export async function CreateMissingAlert(formData: FormData) {
  return API.post(`/missing-alerts`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export default async function GetPaginatedMissingAlerts(
  page: number,
  pageSize: number,
  signal: AbortSignal | undefined,
  filtersQueryString: string,
): Promise<PaginatedMissingAlertResponse> {
  const { data } = await API.get(`/missing-alerts?page=${page}&pageSize=${pageSize}${filtersQueryString}`, { signal });

  return data;
}

export async function GetMissingAlertById(alertId: string): Promise<MissingAlertResponseWithGeoLocation> {
  const response = await API.get(`/missing-alerts/${alertId}`);
  return response.data;
}

export async function ToggleMissingAlertFavorite(alertId: string): Promise<void> {
  await API.post(`/favorite/missing/${alertId}`);
}

export async function ToggleMissingAlertRecovery(alertId: string): Promise<void> {
  await API.post(`/missing-alerts/find/${alertId}`);
}

export async function ReportMissingAlert(alertId: string, reason: string): Promise<void> {
  await API.post(`/missing-reports/${alertId}`, {
    reason,
  });
}
