import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleAuthCallback } from "../../application/usecases/authUseCase";

const CallbackPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (!code) {
      console.error("認可コードが取得できませんでした");
      return;
    }

    const processAuth = async () => {
      try {
        await handleAuthCallback(code);
        navigate("/scores", { replace: true });
      } catch (err) {
        console.error("トークン取得に失敗しました", err);
      }
    };

    processAuth();
  }, [navigate]);

  return <div>ログイン処理中…</div>;
};

export default CallbackPage;
