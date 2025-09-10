import axios from "axios";
import type { Token } from "../../domain/models/Token";

export const exchangeCodeForToken = async (code: string, redirectUri: string): Promise<Token> => {
  const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
  const domain = import.meta.env.VITE_COGNITO_DOMAIN;

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", clientId);
  params.append("code", code);
  params.append("redirect_uri", redirectUri);

  const response = await axios.post(
    `https://${domain}/oauth2/token`,
    params,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );

  const data = response.data;
  return {
    accessToken: data.access_token,
    idToken: data.id_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
    tokenType: data.token_type,
  };
};
