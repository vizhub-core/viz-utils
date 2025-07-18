import { describe, it, expect } from "vitest";
import { timestampToDate } from "./timestampToDate";

describe("timestampToDate", () => {
  it("should convert Unix timestamp to Date", () => {
    const timestamp = 1672531200;
    const date = timestampToDate(timestamp);
    expect(date.toISOString()).toBe("2023-01-01T00:00:00.000Z");
  });

  it("should handle epoch timestamp", () => {
    const timestamp = 0;
    const date = timestampToDate(timestamp);
    expect(date.toISOString()).toBe("1970-01-01T00:00:00.000Z");
  });

  it("should handle negative timestamps", () => {
    const timestamp = -1;
    const date = timestampToDate(timestamp);
    expect(date.toISOString()).toBe("1969-12-31T23:59:59.000Z");
  });

  it("should handle future timestamps", () => {
    const timestamp = 1924991999;
    const date = timestampToDate(timestamp);
    expect(date.toISOString()).toBe("2030-12-31T23:59:59.000Z");
  });

  it("should be inverse of dateToTimestamp", () => {
    const originalDate = new Date("2023-06-15T12:30:45.000Z");
    const timestamp = Math.floor(originalDate.getTime() / 1000);
    const convertedDate = timestampToDate(timestamp);

    // Should match to the second (milliseconds are lost in timestamp conversion)
    expect(convertedDate.getTime()).toBe(timestamp * 1000);
  });
});
