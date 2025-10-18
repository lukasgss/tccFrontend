import axios from "axios";
import { onResponseError } from "./interceptors/errorInterceptor";
import requestInterceptor from "./interceptors/requestInterceptor";

export type DropdownData = {
  label: string;
  value: string;
};

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

API.interceptors.request.use(requestInterceptor);
API.interceptors.response.use(null, onResponseError);
