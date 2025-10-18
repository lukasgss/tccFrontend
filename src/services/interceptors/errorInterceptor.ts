import { AxiosError } from "axios";
import { ApiError } from "../../components/Common/Errors/types";

export type CustomAxiosError = AxiosError<ApiError>;

const { VITE_API_BASE_URL } = import.meta.env;
const loginEndpoint = "/users/login";
const redefinePasswordEndpoint = "/users/reset-password-forgot";

const clearUserData = () => {
  const keysToDelete = ["accessToken", "userId", "refreshToken"];

  keysToDelete.forEach((key) => localStorage.removeItem(key));
};

export const onResponseError = (error: CustomAxiosError) => {
  if (
    error.response?.status === 401 &&
    error.request.responseURL !== `${VITE_API_BASE_URL}${loginEndpoint}` &&
    error.request.responseURL !== `${VITE_API_BASE_URL}${redefinePasswordEndpoint}`
  ) {
    clearUserData();
    window.location.replace("/login");
  }

  return Promise.reject(error);
};
