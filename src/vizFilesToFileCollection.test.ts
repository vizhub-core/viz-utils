import { describe, it, expect } from "vitest";
import { vizFilesToFileCollection } from "./vizFilesToFileCollection";

describe("vizContentToFileCollection", () => {
  it("should convert VizContent files to FileCollection format", () => {
    const files = {
      file1: {
        name: "index.html",
        text: "<html>Test</html>",
      },
      file2: {
        name: "script.js",
        text: 'console.log("Hello");',
      },
    };

    const result = vizFilesToFileCollection(files);

    expect(result).toEqual({
      "index.html": "<html>Test</html>",
      "script.js": 'console.log("Hello");',
    });
  });

  it("should return an empty object when no files exist", () => {
    const result = vizFilesToFileCollection({});

    expect(result).toEqual({});
  });

  it("should return an empty object when no files property", () => {
    const result = vizFilesToFileCollection();

    expect(result).toEqual({});
  });

  it("should handle files with special characters in names", () => {
    const files = {
      fileId1: {
        name: "file with spaces.txt",
        text: "content",
      },
      fileId2: { name: "data.csv", text: "a,b,c\n1,2,3" },
    };

    const result = vizFilesToFileCollection(files);

    expect(result).toEqual({
      "file with spaces.txt": "content",
      "data.csv": "a,b,c\n1,2,3",
    });
  });

  it("should preserve file content exactly", () => {
    const longText = `function complex() {
      return {
        nested: {
          data: [1, 2, 3]
        }
      };
    }`;

    const files = {
      fileId: { name: "complex.js", text: longText },
    };

    const result = vizFilesToFileCollection(files);

    expect(result["complex.js"]).toBe(longText);
  });
});
