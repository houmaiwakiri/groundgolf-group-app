import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithCode } from "../../application/usecases/cognitoUseCase";

export default function CallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      loginWithCode(code).then(() => navigate("/scores"));
    }
  }, []);

  return <div>ログイン処理中…</div>;
}
