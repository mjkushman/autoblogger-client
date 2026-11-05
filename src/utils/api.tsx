import { localStorageKey } from "@/utils/authService";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

/** Thrown for any non-2xx response, so callers can react to the status code */
export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const request = async <Response,>(
  method: "GET" | "POST" | "PATCH" | "DELETE",
  url: string,
  data?: unknown
): Promise<Response> => {
  const headers: HeadersInit = {};
  const token = localStorage.getItem(localStorageKey);
  if (token) headers.Authorization = `Bearer ${token}`;
  if (method !== "GET") headers["Content-Type"] = "application/json";

  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method,
      headers,
      body: method === "GET" ? undefined : JSON.stringify(data),
    });
    if (!response.ok) {
      throw new ApiError(response.status, `Request failed: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`${method} ${url} failed:`, error);
    throw error;
  }
};

const api = {
  get: <T,>(url: string): Promise<T> => request<T>("GET", url),
  post: <T, Response>(url: string, data: T): Promise<Response> =>
    request<Response>("POST", url, data),
  patch: <T, Response>(url: string, data: T): Promise<Response> =>
    request<Response>("PATCH", url, data),
  delete: <T, Response>(url: string, data?: T): Promise<Response> =>
    request<Response>("DELETE", url, data),
};

export default api;
