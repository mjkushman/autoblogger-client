import { useEffect, useState } from "react";
import api from "@/utils/api";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

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

const localStorageKey = "authToken";

export const AuthService = {
  createAccount: async (
    formData: createAccountFormDataType
  ): Promise<Response> => {
    const { token } = await api.post("/accounts", formData);
    storeToken(token);
    return token; // I don't think I need to return anything.
  },

  login: async (formData: loginFormDataType) => {
    const { token } = await api.post("/auth", formData);
    storeToken(token);
    return token;
  },
  logout: () => {
    localStorage.removeItem(localStorageKey);
  },
};

export const storeToken = (token: string) => {
  localStorage.setItem(localStorageKey, JSON.stringify(token));
};

export const retrieveToken = (): string | null => {
  return localStorage.getItem(localStorageKey);
};

export const clearToken = () => {
  return localStorage.removeItem(localStorageKey);
};

export const isAuthenticated = () => {
  const token = localStorage.getItem(localStorageKey);
  return !!token; // return true if token exists
};
