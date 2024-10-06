const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

const api = {
  token: "",
  get: async <T,>(url: string): Promise<T> => {
    try {
      const headers: HeadersInit = {};
      if (api.token) {
        headers.Authorization = `Bearer ${api.token}`;
      }
      const response = await fetch(`${BASE_URL}${url}`, { headers });
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}}`);
      }
      return await response.json()
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  
  post: async <T, Response>(url: string, data: T): Promise<Response> => {
    try {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };
        if(api.token) {headers.Authorizatin = `Bearer ${api.token}`}
        const response = await fetch(`${BASE_URL}${url}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`Error sending data: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
  },
  patch: async <T, Response>(url: string, data: T): Promise<Response> => {
    try {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };
        if(api.token) {headers.Authorizatin = `Bearer ${api.token}`}
        const response = await fetch(`${BASE_URL}${url}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`Error sending data: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
  }
};
export default api