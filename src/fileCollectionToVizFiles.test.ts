import { describe, it, expect, vi, beforeEach } from "vitest";
import { fileCollectionToVizFiles } from "./fileCollectionToVizFiles";
import { FileCollection } from "@vizhub/viz-types";
import { generateVizFileId } from "./generateVizFileId";

vi.mock("./generateVizFileId");

describe("fileCollectionToVizFiles", () => {
  beforeEach(() => {
    vi.mocked(generateVizFileId).mockReset().mockReturnValueOnce("id1");
  });
  it("should convert a single file to VizFiles format", () => {
    const files: FileCollection = {
      "index.html": "<html>Test</html>",
    };

    const result = fileCollectionToVizFiles(files);

    expect(result).toEqual({
      id1: {
        name: "index.html",
        text: "<html>Test</html>",
      },
    });
  });

  it("should convert multiple files to VizFiles format", () => {
    vi.mocked(generateVizFileId)
      .mockReset()
      .mockReturnValueOnce("id1")
      .mockReturnValueOnce("id2");

    const files: FileCollection = {
      "index.html": "<html>Test</html>",
      "style.css": "body { color: red; }",
    };

    const result = fileCollectionToVizFiles(files);

    expect(result).toEqual({
      id1: {
        name: "index.html",
        text: "<html>Test</html>",
      },
      id2: {
        name: "style.css",
        text: "body { color: red; }",
      },
    });
  });

  it("should handle empty file collection", () => {
    const files: FileCollection = {};

    const result = fileCollectionToVizFiles(files);

    expect(result).toEqual({});
  });

  it("should preserve file content exactly", () => {
    vi.mocked(generateVizFileId).mockReset().mockReturnValueOnce("id1");

    const complexContent = `function test() {
      return {
        data: [1, 2, 3],
        nested: { a: 1 }
      };
    }`;

    const files: FileCollection = {
      "complex.js": complexContent,
    };

    const result = fileCollectionToVizFiles(files);

    expect(result.id1.text).toBe(complexContent);
  });
});
