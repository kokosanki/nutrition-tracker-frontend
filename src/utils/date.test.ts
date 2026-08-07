import { afterEach, describe, expect, it, vi } from "vitest";
import {
  addDays,
  formatLocalDate,
  getDateLabel,
  getTodayDateString,
  parseLocalDate,
} from "./date.ts";

describe("getTodayDateString", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
  });

  it("returns today's local date as YYYY-MM-DD", () => {
    vi.stubEnv("TZ", "UTC");
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-07T15:30:00Z"));

    expect(getTodayDateString()).toBe("2026-08-07");
  });
});

describe("addDays", () => {
  it("adds a positive delta", () => {
    expect(addDays("2026-08-07", 1)).toBe("2026-08-08");
  });

  it("subtracts via a negative delta", () => {
    expect(addDays("2026-08-07", -1)).toBe("2026-08-06");
  });

  it("returns the same date for a zero delta", () => {
    expect(addDays("2026-08-07", 0)).toBe("2026-08-07");
  });

  it("rolls over to the next month", () => {
    expect(addDays("2026-08-31", 1)).toBe("2026-09-01");
  });

  it("rolls back to the previous month", () => {
    expect(addDays("2026-09-01", -1)).toBe("2026-08-31");
  });

  it("rolls over to the next year", () => {
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
  });

  it("handles a leap-year February correctly", () => {
    expect(addDays("2024-02-28", 1)).toBe("2024-02-29");
    expect(addDays("2024-02-29", 1)).toBe("2024-03-01");
  });

  it("handles a non-leap-year February correctly", () => {
    expect(addDays("2026-02-28", 1)).toBe("2026-03-01");
  });

  it("handles multi-day deltas spanning a year boundary", () => {
    expect(addDays("2026-01-01", 365)).toBe("2027-01-01");
  });
});

describe("getDateLabel", () => {
  it("formats a date as weekday, month, day", () => {
    expect(getDateLabel("2026-08-07")).toBe("Friday, Aug 7");
  });

  it("pads single-digit days without adding a leading zero", () => {
    expect(getDateLabel("2026-01-05")).toBe("Monday, Jan 5");
  });

  it("formats a date at year-end correctly", () => {
    expect(getDateLabel("2026-12-25")).toBe("Friday, Dec 25");
  });
});

describe("parseLocalDate", () => {
  it("parses a date string into a local Date at midnight", () => {
    const date = parseLocalDate("2026-08-07");

    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(7);
    expect(date.getDate()).toBe(7);
    expect(date.getHours()).toBe(0);
    expect(date.getMinutes()).toBe(0);
    expect(date.getSeconds()).toBe(0);
  });

  it("handles single-digit months and days", () => {
    const date = parseLocalDate("2026-01-05");

    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(0);
    expect(date.getDate()).toBe(5);
  });
});

describe("formatLocalDate", () => {
  it("formats a Date into YYYY-MM-DD", () => {
    expect(formatLocalDate(new Date(2026, 7, 7))).toBe("2026-08-07");
  });

  it("pads single-digit months and days with a leading zero", () => {
    expect(formatLocalDate(new Date(2026, 0, 5))).toBe("2026-01-05");
  });
});

describe("parseLocalDate and formatLocalDate round-trip", () => {
  it("returns the original string after parsing and formatting", () => {
    const original = "2026-08-07";
    expect(formatLocalDate(parseLocalDate(original))).toBe(original);
  });

  it("returns an equivalent Date after formatting and parsing", () => {
    const original = new Date(2026, 0, 5);
    const roundTripped = parseLocalDate(formatLocalDate(original));
    expect(roundTripped.getTime()).toBe(original.getTime());
  });
});
