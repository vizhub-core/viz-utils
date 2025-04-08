import { describe, it, expect } from "vitest";
import { isVizId } from "./isVizId";

describe("isVizId", () => {
  it("should return true for valid VizId", () => {
    // Valid VizId with '4' as the 13th character
    const validId = "12345678901234567890123456789012";
    const validIdWith4 = validId.substring(0, 12) + "4" + validId.substring(13);

    expect(isVizId(validIdWith4)).toBe(true);
  });

  it("should return false for strings that are not 32 characters", () => {
    expect(isVizId("123")).toBe(false);
    expect(isVizId("12345678901234567890123456789012345")).toBe(false);
  });

  it("should return false for strings with non-hex characters", () => {
    expect(isVizId("1234567890123g5678901234567890123")).toBe(false);
    expect(isVizId("12345678901234567890123456789012!")).toBe(false);
  });

  it('should return false if the 13th character is not "4"', () => {
    const validId = "12345678901234567890123456789012";
    const invalidIdWith5 =
      validId.substring(0, 12) + "5" + validId.substring(13);

    expect(isVizId(invalidIdWith5)).toBe(false);
  });
});
