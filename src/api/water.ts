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

export interface LogWaterPayload {
  amountMl: number;
  loggedDate: string;
}

export interface LogWaterResult {
  waterLog: WaterLogEntry;
}

export const logWater = (payload: LogWaterPayload): Promise<LogWaterResult> => {
  return apiFetch<LogWaterResult>("/water", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const deleteWaterLog = (id: number): Promise<void> => {
  return apiFetch<void>(`/water/${id}`, {
    method: "DELETE",
  });
};
