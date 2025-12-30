import Constants from "expo-constants";
import { fetchTimeout } from "./fetchTimeout";

type ExpoExtra = { apiBaseUrl: string };
const extra = Constants.expoConfig?.extra as ExpoExtra;
const BASE_URL = extra.apiBaseUrl;

export type Score = {
    id: number;
    strokes: number[];
};

type ScoreStats = {
    average: number;
    max: number;
    min: number;
    holeAverages: number[];
    rounds: number;
};

/**
 * ユーザーのスコアを取得
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
 * スコア登録
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
 * スコア更新
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
 * スコア削除
 */
export async function deleteScore(userId: string, id: number): Promise<void> {
    const res = await fetchTimeout(`${BASE_URL}/scores/${id}?userId=${userId}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
}

/**
 * 統計情報取得
 * @param userId ユーザーID
 * @param latest 過去〇ラウンド分（任意）
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
