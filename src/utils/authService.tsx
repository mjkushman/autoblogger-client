import api from "@/utils/api";
import { ApiResponse, createAccountFormDataType, loginFormDataType } from "@/types";


export const localStorageKey = "autoblogger";

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
  localStorage.setItem(localStorageKey, token);
};

export const retrieveToken = (): string | null => {
  return localStorage.getItem(localStorageKey);
};

export const validateToken = () => {
  console.log('validating token')
}

export const isAuthenticated = () => {
  const token = localStorage.getItem(localStorageKey);
  return !!token; // return true if token exists
};
