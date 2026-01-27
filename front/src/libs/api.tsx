import Constants from "expo-constants";
import { fetchTimeout } from "./fetchTimeout";

/**
 * Expo の app.config.ts に書かれている extra の型定義。
 * apiBaseUrl は API の共通ベースURLです。
 */
type ExpoExtra = { apiBaseUrl: string };

/**
 * Expo の設定値(extra)から API のベースURLを取り出す。
 * Constants.expoConfig はビルド時に埋め込まれた設定です。
 */
const extra = Constants.expoConfig?.extra as ExpoExtra;

/**
 * API の共通ベースURL。
 * ここにエンドポイントのパスを繋げてリクエストします。
 */
const BASE_URL = extra.apiBaseUrl;

/**
 * 1ラウンドのスコア情報。
 * id はサーバー側で発行される識別子、strokes は各ホールの打数配列です。
 */
export type Score = {
    id: number;
    strokes: number[];
};

/**
 * スコア統計情報。
 * average/max/min は全体の統計、holeAverages はホールごとの平均、rounds は対象ラウンド数。
 */
type ScoreStats = {
    average: number;
    max: number;
    min: number;
    holeAverages: number[];
    rounds: number;
};

/**
 * 指定ユーザーのスコア一覧を取得します。
 * @param userId Cognito の sub など、ユーザーを一意に識別するID
 * @returns スコア配列（サーバーから返る値を整形して返却）
 */
export async function getScores(userId: string): Promise<Score[]> {
    const res = await fetchTimeout(`${BASE_URL}/scores?userId=${userId}`);
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

    const data = await res.json();
    return data.map((item: any) => ({
        id: Number(item.id),
        strokes: Array.isArray(item.strokes) ? item.strokes.map(Number) : [],
    }));
}

/**
 * 新しいスコアを登録します。
 * @param userId ユーザーID
 * @param scores 各ホールの打数配列
 * @returns 登録されたスコア（サーバー側のレスポンス）
 */
export async function postScores(userId: string, scores: number[]): Promise<Score> {
    const res = await fetchTimeout(`${BASE_URL}/scores?userId=${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scores),
    });
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    return res.json();
}

/**
 * 既存スコアを更新します。
 * @param userId ユーザーID
 * @param id 更新対象のスコアID
 * @param scores 各ホールの打数配列（更新後の値）
 */
export async function updateScore(userId: string, id: number, scores: number[]): Promise<void> {
    const res = await fetchTimeout(`${BASE_URL}/scores/${id}?userId=${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scores),
    });
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
}

/**
 * スコアを削除します。
 * @param userId ユーザーID
 * @param id 削除対象のスコアID
 */
export async function deleteScore(userId: string, id: number): Promise<void> {
    const res = await fetchTimeout(`${BASE_URL}/scores/${id}?userId=${userId}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
}

/**
 * スコアの統計情報を取得します。
 * @param userId ユーザーID
 * @param latest 直近Nラウンド分のみ取得したい場合に指定（任意）
 * @returns スコア統計（平均・最大・最小・ホール別平均・ラウンド数）
 */
export async function getScoreStats(userId: string, latest?: number): Promise<ScoreStats> {
    const url = latest
        ? `${BASE_URL}/scores/stats?userId=${userId}&latest=${latest}`
        : `${BASE_URL}/scores/stats?userId=${userId}`;

    const res = await fetchTimeout(url);
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

    const data = await res.json();

    return {
        average: Number(data.average) || 0,
        max: Number(data.max) || 0,
        min: Number(data.min) || 0,
        holeAverages: Array.isArray(data.holeAverages)
            ? data.holeAverages.map(Number)
            : [],
        rounds: Number(data.rounds) || 0,
    };
}
