import { exchangeCodeForToken } from "../../infrastructure/api/authApi";
import type { Token } from "../../domain/models/Token";

export const handleAuthCallback = async (code: string) => {
  const redirectUri = window.location.origin + "/callback";
  const token: Token = await exchangeCodeForToken(code, redirectUri);

  // localStorage に保存
  localStorage.setItem("access_token", token.accessToken);
  localStorage.setItem("id_token", token.idToken);
  localStorage.setItem("refresh_token", token.refreshToken);
  localStorage.setItem("expires_in", token.expiresIn.toString());
  localStorage.setItem("token_type", token.tokenType);

  return token;
};
