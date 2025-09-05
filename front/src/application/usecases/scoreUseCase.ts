import type { Score } from "../../domain/models/Score";
import { scoreApi } from "../../infrastructure/api/scoreApi";

export const scoreUseCase = {
  async loadScores(): Promise<Score[]> {
    try {
      return await scoreApi.getScores();
    } catch (e) {
      console.error("Failed to load scores", e);
      throw e;
    }
  },

  async registerScore(strokes: number[]): Promise<Score> {
    try {
      return await scoreApi.postScore(strokes);
    } catch (e) {
      console.error("Failed to register score", e);
      throw e;
    }
  },
};