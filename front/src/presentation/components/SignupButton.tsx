import {
  COGNITO_CLIENT_ID,
  COGNITO_DOMAIN,
  COGNITO_REDIRECT_URI,
} from "../../config";

export default function SignupButton() {
  const handleSignup = () => {
    const signupUrl = `https://${COGNITO_DOMAIN}/signup?client_id=${COGNITO_CLIENT_ID}&response_type=code&scope=openid+profile&redirect_uri=${COGNITO_REDIRECT_URI}`;
    window.location.href = signupUrl;
  };

  return <button onClick={handleSignup}>サインアップ</button>;
}
