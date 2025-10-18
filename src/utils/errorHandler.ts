import { AxiosError } from "axios";
import { ApiError, defaultErrorMessage } from "../components/Common/Errors/types";

export default function getErrorMessage(err: Error) {
  const apiError = err as AxiosError<ApiError>;
  return apiError.response?.data.message ?? defaultErrorMessage;
}
