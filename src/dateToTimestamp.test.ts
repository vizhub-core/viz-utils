import { describe, it, expect } from "vitest";
import { dateToTimestamp } from "./dateToTimestamp";

describe("dateToTimestamp", () => {
  it("should convert a Date to Unix timestamp", () => {
    const date = new Date("2023-01-01T00:00:00.000Z");
    const timestamp = dateToTimestamp(date);
    expect(timestamp).toBe(1672531200);
  });

  it("should handle dates with milliseconds by flooring", () => {
    const date = new Date("2023-01-01T00:00:00.999Z");
    const timestamp = dateToTimestamp(date);
    expect(timestamp).toBe(1672531200); // Should floor the milliseconds
  });

  it("should handle epoch date", () => {
    const date = new Date("1970-01-01T00:00:00.000Z");
    const timestamp = dateToTimestamp(date);
    expect(timestamp).toBe(0);
  });

  it("should handle future dates", () => {
    const date = new Date("2030-12-31T23:59:59.000Z");
    const timestamp = dateToTimestamp(date);
    expect(timestamp).toBe(1924991999);
  });

  it("should handle dates before epoch", () => {
    const date = new Date("1969-12-31T23:59:59.000Z");
    const timestamp = dateToTimestamp(date);
    expect(timestamp).toBe(-1);
  });
});
