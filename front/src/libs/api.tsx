import Constants from "expo-constants";
import { fetchTimeout } from "./fetchTimeout";

type ExpoExtra = { apiBaseUrl: string };
const extra = Constants.expoConfig?.extra as ExpoExtra;
const BASE_URL = extra.apiBaseUrl;

export type Score = {
    id: number;
    strokes: number[];
};

/**
 * ユーザーのスコアを取得
 * @param userId - ユーザーID
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
 * ユーザーのスコアを登録
 * @param userId - ユーザーID
 * @param scores - スコア配列
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
 * スコアを更新
 * @param userId - ユーザーID
 * @param id - スコアID
 * @param scores - 更新するスコア配列
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
 * スコアを削除
 * @param userId - ユーザーID
 * @param id - スコアID
 */
export async function deleteScore(userId: string, id: number): Promise<void> {
    const res = await fetchTimeout(`${BASE_URL}/scores/${id}?userId=${userId}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
}
