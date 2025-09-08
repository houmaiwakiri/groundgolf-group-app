import LoginButton from "../components/LoginButton";
import SignupButton from "../components/SignupButton";

export default function Top() {
  console.log(import.meta.env);
  return (
    <div>
      <h1>groundgolf-group-app</h1>
      <LoginButton />
      <SignupButton />
    </div>
  );
}
