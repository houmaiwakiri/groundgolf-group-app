// frontの基本URL
export const API_BASE_URL =
  import.meta.env.VITE_BASE_URL || "http://localhost:8080";

// 基本headers
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

// login
export const COGNITO_CLIENT_ID = import.meta.env.VITE_COGNITO_CLIENT_ID!;
export const COGNITO_DOMAIN = import.meta.env.VITE_COGNITO_DOMAIN!;
export const COGNITO_REDIRECT_URI = import.meta.env.VITE_COGNITO_REDIRECT_URI!;
