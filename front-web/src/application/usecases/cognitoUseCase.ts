import { exchangeCodeForToken } from "../../infrastructure/api/cognitoApi";

export const loginWithCode = async (code: string) => {
  const token = await exchangeCodeForToken(code);
  localStorage.setItem("access_token", token);
  return token;
};
