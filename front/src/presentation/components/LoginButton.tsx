import { CLIENT_ID, DOMAIN, REDIRECT_URI } from "../../config";

export default function LoginButton() {
  const handleLogin = () => {
    const loginUrl = `https://${DOMAIN}/login?client_id=${CLIENT_ID}&response_type=code&scope=openid+profile&redirect_uri=${REDIRECT_URI}`;
    window.location.href = loginUrl;
  };

  return <button onClick={handleLogin}>ログイン</button>;
}
