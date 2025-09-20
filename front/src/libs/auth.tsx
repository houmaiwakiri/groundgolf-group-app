import axios from "axios";
import * as SecureStore from "expo-secure-store";

type ExpoExtra = {
  cognitoClientId: string;
  cognitoDomain: string;
  cognitoRedirectUri: string;
  cognitoResponseType: string;
  cognitoScope: string;
};

type CognitoTokens = {
  access_token: string;
  id_token: string;
  refresh_token: string;
  expires_in?: number;
  token_type?: string;
};

export async function exchangeCodeForToken(code: string, extra: ExpoExtra) {
  const url = `https://${extra.cognitoDomain}/oauth2/token`;

  const data = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: extra.cognitoClientId,
    code,
    redirect_uri: extra.cognitoRedirectUri,
  });

  const res = await axios.post<CognitoTokens>(url, data.toString(), {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const tokens = res.data;

  await SecureStore.setItemAsync("access_token", tokens.access_token);
  await SecureStore.setItemAsync("id_token", tokens.id_token);
  await SecureStore.setItemAsync("refresh_token", tokens.refresh_token);

  return tokens;
}
