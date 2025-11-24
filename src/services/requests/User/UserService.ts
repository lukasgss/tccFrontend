import { AxiosResponse } from "axios";
import { API } from "../../Api";
import {
  CreatedAlertsResponse,
  CreateUserPreferencesRequest,
  ExternalAuthenticationData,
  ForgotPasswordData,
  LoginFormData,
  RegisterFormData,
  ResetPasswordRequest,
  UpdateUserPassword,
  UserDataOnlyResponse,
  UserDataResponse,
  UserPreferencesResponse,
  UserProfileResponse,
} from "./types";

export async function LoginUser(loginUserData: LoginFormData): Promise<AxiosResponse<UserDataResponse>> {
  return API.post("/users/login", loginUserData);
}

export async function RegisterUser(registerUserData: RegisterFormData): Promise<AxiosResponse<UserDataResponse>> {
  return API.post("/users/register", registerUserData);
}

export async function ExternalAuthenticate(
  externalAuthenticationData: ExternalAuthenticationData,
): Promise<AxiosResponse<UserDataResponse>> {
  return API.post("/users/external-login", externalAuthenticationData);
}

export async function GetUserData(userId: string, signal: AbortSignal): Promise<UserDataResponse> {
  const userData = await API.get(`/users/${userId}`, {
    signal,
  });
  return userData.data;
}

export async function GetUserProfile(userId: string | undefined, signal: AbortSignal): Promise<UserProfileResponse> {
  const userData = await API.get(`/users/profile/${userId}`, {
    signal,
  });
  return userData.data;
}

export async function UpdateUserData(userId: string, formData: FormData): Promise<UserDataOnlyResponse> {
  const userData = await API.put(`/users/${userId}`, formData);
  return userData.data;
}

export async function ChangeUserPassword(passwordData: UpdateUserPassword): Promise<AxiosResponse> {
  return API.put(`/users/password`, passwordData);
}

export async function CreateAdoptionUserPreferences(
  preferences: CreateUserPreferencesRequest,
): Promise<UserPreferencesResponse> {
  const preferencesData = await API.post("/user-preferences/adoptions", preferences);
  return preferencesData.data;
}

export async function GetAdoptionUserPreferences(signal: AbortSignal): Promise<UserPreferencesResponse> {
  const preferencesData = await API.get("/user-preferences/adoptions", {
    signal,
  });
  return preferencesData.data;
}

export async function SendForgotPasswordInstructions(forgotPasswordData: ForgotPasswordData) {
  await API.post("/users/forgot-password", forgotPasswordData);
}

export async function RedefineUserPassword(resetPasswordData: ResetPasswordRequest) {
  await API.post("/users/reset-password-forgot", resetPasswordData);
}

export async function GetUserCreatedAlerts(signal: AbortSignal): Promise<CreatedAlertsResponse> {
  const { data } = await API.get("/users/created", {
    signal,
  });

  return data;
}
