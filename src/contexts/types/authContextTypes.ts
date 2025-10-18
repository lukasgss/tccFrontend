import {
  ExternalAuthenticationData,
  LoginFormData,
  RegisterFormData,
  UserData,
} from "../../services/requests/User/types";

export type AuthProviderProps = {
  children: React.ReactNode;
};

export type AuthContextData = {
  isAuthenticated: boolean;
  accessToken: string | null;
  userData: UserData | null;
  handleLogin: (loginData: LoginFormData) => Promise<void>;
  handleRegistration: (registrationData: RegisterFormData) => Promise<void>;
  handleExternalAuth: (externalAuth: ExternalAuthenticationData) => Promise<void>;
  handleLogout: () => void;
};
