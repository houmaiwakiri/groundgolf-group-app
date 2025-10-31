import Constants from "expo-constants";
import { fetchTimeout } from "./fetchTimeout";

type ExpoExtra = { apiBaseUrl: string };
const extra = Constants.expoConfig?.extra as ExpoExtra;
const BASE_URL = extra.apiBaseUrl;

export async function getScores(): Promise<number[][]> {
    const res = await fetchTimeout(`${BASE_URL}/scores`);
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    return res.json();
}

export async function postScores(scores: number[]): Promise<void> {
    const res = await fetchTimeout(`${BASE_URL}/scores`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scores),
    });
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    await res.json();
}
