import { useEffect, useState } from "react";
import type { Score } from "../../domain/models/Score";
import { scoreUseCase } from "../../application/usecases/scoreUseCase";

export default function ApiTestPage() {
  const [scores, setScores] = useState<Score[]>([]);
  const [strokesInput, setStrokesInput] = useState(""); // 登録用入力
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchScores = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await scoreUseCase.loadScores();
      setScores(data);
    } catch (e) {
      setError("データ取得に失敗しました : " + e);
    } finally {
      setLoading(false);
    }
  };

  const registerScore = async () => {
    setLoading(true);
    setError(null);
    try {
      const strokes = strokesInput
        .split(",")
        .map((s) => parseInt(s.trim(), 10));
      await scoreUseCase.registerScore(strokes);
      setStrokesInput("");
      fetchScores(); // 登録後に一覧更新
    } catch (e) {
      setError("登録に失敗しました : " + e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>API テストページ</h1>

      {/* 登録フォーム */}
      <div>
        <input
          type="text"
          value={strokesInput}
          onChange={(e) => setStrokesInput(e.target.value)}
          placeholder="例: 3,4,5,2,3"
        />
        <button onClick={registerScore} disabled={loading}>
          {loading ? "処理中..." : "登録"}
        </button>
      </div>

      <button onClick={fetchScores} disabled={loading}>
        {loading ? "読み込み中..." : "一覧更新"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 一覧表示 */}
      <ul>
        {scores.map((s) => (
          <li key={s.id}>
            ID: {s.id}, Strokes: {s.strokes.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}
