const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export const ENDPOINTS = {
  AUTH: {
    SIGNIN: `${API_BASE_URL}/v1/auth/signin`,
    ME: `${API_BASE_URL}/v1/auth/me`,
  },
};
