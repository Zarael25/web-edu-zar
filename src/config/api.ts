const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export const ENDPOINTS = {
  AUTH: {
    SIGNIN: `${API_BASE_URL}/v1/auth/signin`,
    ME: `${API_BASE_URL}/v1/auth/me`,
    LOGOUT: `${API_BASE_URL}/v1/auth/logout`, 
  },



  COLEGIOS: {
    LIST: `${API_BASE_URL}/v1/colegios`,           // GET
    CREATE: `${API_BASE_URL}/v1/colegios`,         // POST
    BY_ID: (id: string) => `${API_BASE_URL}/v1/colegios/${id}`, // GET
    UPDATE: (id: string) => `${API_BASE_URL}/v1/colegios/${id}`, // PATCH
  },

};
