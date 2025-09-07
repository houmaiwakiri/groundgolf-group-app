import axios from "axios";

import type { Score } from "../../domain/models/Score";
import { API_BASE_URL, DEFAULT_HEADERS } from "../../config";

// infrastructure層: 外部依存をまとめる場所
// API通信の共通設定
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: DEFAULT_HEADERS,
});

export const scoreApi = {
  async getScores(): Promise<Score[]> {
    const res = await api.get<Score[]>("/scores");
    return res.data;
  },

  async postScore(strokes: number[]): Promise<Score> {
    const res = await api.post<Score>("/scores", strokes);
    console.log("送信データ:", JSON.stringify(strokes));
    return res.data;
  }
};
