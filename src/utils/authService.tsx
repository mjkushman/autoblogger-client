import api from "@/utils/api";
import { CreateAccountResponse } from "@/types";
import { LoginResponse } from "@/types/Api.type";

// const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

type createAccountFormDataType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
type loginFormDataType = {
  email: string;
  password: string;
};

export const localStorageKey = "authToken";

export const AuthService = {
  createAccount: async (formData: createAccountFormDataType): Promise<void> => {
    const { token } = await api.post<
      createAccountFormDataType,
      CreateAccountResponse
    >("accounts", formData);
    storeToken(token);
  },

  login: async (formData: loginFormDataType):Promise<string> => {
    const { token } = await api.post<loginFormDataType, LoginResponse>("auth", formData);
    storeToken(token);
    return token;
  },

  logout: (): void => {
    localStorage.removeItem(localStorageKey);
  },
};

export const storeToken = (token: string) => {
  localStorage.setItem(localStorageKey, JSON.stringify(token));
};

export const retrieveToken = (): string | null => {
  return localStorage.getItem(localStorageKey);
};

// deprecate?
// export const clearToken = () => {
//   return localStorage.removeItem(localStorageKey);
// };

export const isAuthenticated = () => {
  const token = localStorage.getItem(localStorageKey);
  return !!token; // return true if token exists
};
