import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiError } from "../components/Common/Errors/types";
import { API } from "../services/Api";
import { ExternalAuthenticate, GetUserData, LoginUser, RegisterUser } from "../services/requests/User/UserService";
import {
  ExternalAuthenticationData,
  LoginFormData,
  RegisterFormData,
  UserData,
  UserDataResponse,
} from "../services/requests/User/types";
import { AuthContextData, AuthProviderProps } from "./types/authContextTypes";

export const AuthContext = createContext<AuthContextData>({
  isAuthenticated: false,
  accessToken: null,
  userData: null,
  handleLogin: Object,
  handleLogout: Function,
  handleRegistration: Object,
  handleExternalAuth: Object,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [, setRefreshToken] = useState<string | null>(null);
  const [loadingApp, setLoadingApp] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);

  async function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    setAccessToken(null);
    setRefreshToken(null);
    setUserData(null);
    navigate("/");
  }

  const { mutateAsync: getUserDataAsync } = useMutation({
    mutationFn: (userId: string) => {
      return GetUserData(userId, new AbortController().signal);
    },
  });

  async function getUserData() {
    const userId = userData?.id ?? localStorage.getItem("userId");
    if (!userId) {
      return;
    }

    try {
      const userInfo = await getUserDataAsync(userId);
      setUserData(userInfo);
    } catch {
      handleLogout();
      navigate("/login");
    }
  }

  async function setInitialAppData() {
    const userAccessToken = localStorage.getItem("accessToken");
    const userRefreshToken = localStorage.getItem("refreshToken");
    if (userAccessToken && userRefreshToken) {
      API.defaults.headers.common.Authorization = `Bearer ${JSON.parse(userAccessToken)}`;
      setAccessToken(userAccessToken);
      setRefreshToken(userRefreshToken);
      await getUserData();
    }

    setLoadingApp(false);
  }

  useEffect(() => {
    setInitialAppData();
  }, []);

  function handleSuccessAuth(data: UserDataResponse) {
    localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
    localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
    localStorage.setItem("userId", data.id);
    API.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
    navigate("/");
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);
    setUserData({
      id: data.id,
      fullName: data.fullName,
      image: data.image,
      email: data.email,
      phoneNumber: data.phoneNumber,
      onlyWhatsAppMessages: data.onlyWhatsAppMessages,
    });
  }

  async function handleLogin(loginData: LoginFormData) {
    try {
      const { data } = await LoginUser(loginData);
      handleSuccessAuth(data);
    } catch (e) {
      const err = e as AxiosError<ApiError>;
      throw new Error(
        err.response?.data?.message ? err.response.data.message : import.meta.env.VITE_GENERIC_ERROR_MESSAGE,
      );
    }
  }

  async function handleExternalAuth(externalAuth: ExternalAuthenticationData) {
    const { data } = await ExternalAuthenticate(externalAuth);

    handleSuccessAuth(data);
  }

  async function handleRegistration(registrationData: RegisterFormData) {
    const { data } = await RegisterUser(registrationData);

    localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
    localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
    localStorage.setItem("userId", data.id);
    API.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
    navigate("/");
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);
    setUserData({
      id: data.id,
      fullName: data.fullName,
      image: data.image,
      email: data.email,
      phoneNumber: data.phoneNumber,
      onlyWhatsAppMessages: data.onlyWhatsAppMessages,
    });
  }

  const contextData = useMemo(
    () => ({
      isAuthenticated: !!accessToken,
      accessToken,
      userData,
      handleLogin,
      handleRegistration,
      handleLogout,
      handleExternalAuth,
    }),
    [accessToken, userData],
  );

  return <AuthContext.Provider value={contextData}>{!loadingApp ? children : null}</AuthContext.Provider>;
};
