import { apiFetch } from "./client.ts";

export interface WaterLogEntry {
  id: number;
  userId: number;
  loggedDate: string;
  amountMl: number;
  loggedAt: string;
}

export interface WaterLogResults {
  waterLogs: WaterLogEntry[];
}

export const getWaterLog = (date: string): Promise<WaterLogResults> => {
  return apiFetch<WaterLogResults>(`/water?date=${date}`, {
    method: "GET",
  });
};
