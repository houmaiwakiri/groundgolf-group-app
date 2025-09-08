import { CLIENT_ID, DOMAIN, REDIRECT_URI } from "../../config";

export default function SignupButton() {
  const handleSignup = () => {
    const signupUrl = `https://${DOMAIN}/signup?client_id=${CLIENT_ID}&response_type=code&scope=openid+profile&redirect_uri=${REDIRECT_URI}`;
    window.location.href = signupUrl;
  };

  return <button onClick={handleSignup}>サインアップ</button>;
}
