import {
  COGNITO_CLIENT_ID,
  COGNITO_DOMAIN,
  COGNITO_REDIRECT_URI,
} from "../../config";

export const exchangeCodeForToken = async (code: string): Promise<string> => {
  const res = await fetch(`https://${COGNITO_DOMAIN}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: COGNITO_CLIENT_ID,
      code,
      redirect_uri: COGNITO_REDIRECT_URI,
    }),
  });
  const data = await res.json();
  return data.access_token;
};
