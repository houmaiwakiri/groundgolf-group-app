import { CLIENT_ID, DOMAIN, REDIRECT_URI } from "../../config";

export const exchangeCodeForToken = async (code: string): Promise<string> => {
  const res = await fetch(`https://${DOMAIN}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: CLIENT_ID,
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });
  const data = await res.json();
  return data.access_token;
};
