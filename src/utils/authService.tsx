import api from "@/utils/api";
import { ApiResponse, createAccountFormDataType, loginFormDataType } from "@/types";

// const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

export const localStorageKey = "authToken";

export const AuthService = {
  createAccount: async (formData: createAccountFormDataType): Promise<string> => {
    const { data } = await api.post<
      createAccountFormDataType,
      ApiResponse
    >("accounts", formData);
    storeToken(data);
    return data
  },

  login: async (formData: loginFormDataType):Promise<string> => {
    const { data } = await api.post<loginFormDataType, ApiResponse>("auth", formData);
    storeToken(data);
    return data;
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
