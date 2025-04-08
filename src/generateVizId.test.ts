import { describe, it, expect } from "vitest";
import { generateVizId } from "./generateVizId";
import { isVizId } from "./isVizId";

describe("generateVizId", () => {
  it("should generate a valid VizId", () => {
    const id = generateVizId();
    expect(isVizId(id)).toBe(true);
  });

  it("should generate a string of length 32", () => {
    const id = generateVizId();
    expect(id.length).toBe(32);
  });

  it("should generate a string with only hexadecimal characters", () => {
    const id = generateVizId();
    expect(/^[0-9a-f]{32}$/i.test(id)).toBe(true);
  });

  it('should generate a string with "4" as the 13th character', () => {
    const id = generateVizId();
    expect(id[12]).toBe("4");
  });

  it("should generate unique IDs", () => {
    const ids = new Set();
    for (let i = 0; i < 100; i++) {
      ids.add(generateVizId());
    }
    expect(ids.size).toBe(100);
  });
});
