import axios from "axios";
import type { Score } from "../../domain/models/Score";

// axios
const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});


export const scoreApi = {
  async getScores(): Promise<Score[]> {
    const res = await api.get<Score[]>("/scores");
    return res.data;
  },

  async postScore(strokes: number[]): Promise<Score> {
    const res = await api.post<Score>("/scores", strokes);
    return res.data;
  }
};
