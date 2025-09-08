import {
  COGNITO_CLIENT_ID,
  COGNITO_DOMAIN,
  COGNITO_REDIRECT_URI,
} from "../../config";

export default function LoginButton() {
  const handleLogin = () => {
    const loginUrl = `https://${COGNITO_DOMAIN}/login?client_id=${COGNITO_CLIENT_ID}&response_type=code&scope=openid+profile&redirect_uri=${COGNITO_REDIRECT_URI}`;
    window.location.href = loginUrl;
  };

  return <button onClick={handleLogin}>ログイン</button>;
}
