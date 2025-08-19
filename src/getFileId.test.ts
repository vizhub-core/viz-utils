import { describe, it, expect } from "vitest";
import { getFileId } from "./getFileId";
import type { VizContent } from "@vizhub/viz-types";

describe("getFileId", () => {
  it("should return the file id of a file with matching name", () => {
    const mockVizContent: VizContent = {
      id: "test-viz-123",
      files: {
        file1: {
          name: "index.html",
          text: "<html>Test</html>",
        },
        file2: {
          name: "script.js",
          text: 'console.log("Hello");',
        },
      },
    };

    const result = getFileId(mockVizContent, "index.html");

    expect(result).toBe("file1");
  });

  it("should return null when no file with the given name exists", () => {
    const mockVizContent: VizContent = {
      id: "test-viz-123",
      files: {
        file1: {
          name: "index.html",
          text: "<html>Test</html>",
        },
        file2: {
          name: "script.js",
          text: 'console.log("Hello");',
        },
      },
    };

    const result = getFileId(mockVizContent, "style.css");

    expect(result).toBeNull();
  });

  it("should return null when content has no files property", () => {
    const mockVizContent = {
      id: "test-viz-123",
    } as VizContent;

    const result = getFileId(mockVizContent, "index.html");

    expect(result).toBeNull();
  });

  it("should return null when content is undefined", () => {
    const result = getFileId(undefined as unknown as VizContent, "index.html");

    expect(result).toBeNull();
  });

  it("should find the correct file id when multiple files exist", () => {
    const mockVizContent: VizContent = {
      id: "test-viz-123",
      files: {
        abc123: { name: "data.csv", text: "a,b,c" },
        def456: {
          name: "index.html",
          text: "<html>First</html>",
        },
        ghi789: {
          name: "script.js",
          text: 'console.log("Hello");',
        },
        jkl012: {
          name: "style.css",
          text: "body { color: red; }",
        },
      },
    };

    // Should return the correct file ID
    expect(getFileId(mockVizContent, "data.csv")).toBe("abc123");
    expect(getFileId(mockVizContent, "index.html")).toBe("def456");
    expect(getFileId(mockVizContent, "script.js")).toBe("ghi789");
    expect(getFileId(mockVizContent, "style.css")).toBe("jkl012");
  });

  it("should return the first matching file id when duplicate file names exist", () => {
    const mockVizContent: VizContent = {
      id: "test-viz-123",
      files: {
        file1: { name: "data.csv", text: "a,b,c" },
        file2: {
          name: "index.html",
          text: "<html>First</html>",
        },
        file3: {
          name: "script.js",
          text: 'console.log("Hello");',
        },
        file4: {
          name: "index.html",
          text: "<html>Second</html>",
        },
      },
    };

    // Should return the first matching file's id
    const result = getFileId(mockVizContent, "index.html");

    expect(result).toBe("file2");
  });
});
