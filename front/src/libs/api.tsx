import Constants from "expo-constants";
import { fetchTimeout } from "./fetchTimeout";

type ExpoExtra = { apiBaseUrl: string };
const extra = Constants.expoConfig?.extra as ExpoExtra;
const BASE_URL = extra.apiBaseUrl;

export type Score = {
    id: number;
    strokes: number[];
};

export async function getScores(): Promise<Score[]> {
    const res = await fetchTimeout(`${BASE_URL}/scores`);
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

    const data = await res.json();

    return data.map((item: any) => ({
        id: Number(item.id),
        strokes: Array.isArray(item.strokes) ? item.strokes.map(Number) : [],
    }));
}

export async function postScores(scores: number[]): Promise<Score> {
    const res = await fetchTimeout(`${BASE_URL}/scores`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scores),
    });
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    return res.json();
}

export async function updateScore(id: number, scores: number[]): Promise<void> {
    const res = await fetchTimeout(`${BASE_URL}/scores/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scores),
    });
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
}

export async function deleteScore(id: number): Promise<void> {
    const res = await fetchTimeout(`${BASE_URL}/scores/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
}
