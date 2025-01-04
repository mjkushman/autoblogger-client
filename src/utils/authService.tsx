import api from "@/utils/api";
import {
  ApiResponse,
  createAccountFormDataType,
  loginFormDataType,
} from "@/types";
import * as jose from "jose";
import { DecodedJwt } from "@/types/Auth.type";

const secret = new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET);
export const localStorageKey = "autoblogger";

export const AuthService = {
  createAccount: async (
    formData: createAccountFormDataType
  ): Promise<string> => {
    const { data } = await api.post<createAccountFormDataType, ApiResponse>(
      "accounts",
      formData
    );
    storeToken(data);
    return data;
  },

  login: async (formData: loginFormDataType): Promise<string> => {
    const { data } = await api.post<loginFormDataType, ApiResponse>(
      "auth",
      formData
    );
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

export const getAuthStatus = async (): Promise<boolean> => {
  const token = localStorage.getItem(localStorageKey);
  if (!token) return false;

  try {
    const { payload } = await jose.jwtVerify<DecodedJwt>(token, secret);
    return !!payload.accountId; // returns true
  } catch (error) {
    if (error instanceof jose.errors.JWTExpired) {
      console.log("token expired. Add refresh logic");
      // TODO: Add token refresh logic
    } else {
      console.log("Token verification error", error);
    }
    return false; // returns false if any error
  }
};
