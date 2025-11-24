import { API } from "../../Api";
import { AdoptionAlertNotificationResponse } from "./types";

export async function GetAdoptionNotifications(signal: AbortSignal): Promise<AdoptionAlertNotificationResponse[]> {
  const response = await API.get("/adoption-notifications", { signal });
  return response.data;
}

export async function ReadNotification(notificationId: number) {
  const response = await API.post(`/adoption-notifications/read/${notificationId}`);
  return response.data;
}

export async function ReadAllNotifications() {
  const response = await API.post("/adoption-notifications/read/");
  return response.data;
}
