import { describe, it, expect } from "vitest";
import { setFileText } from "./setFileText";
import type { VizContent } from "@vizhub/viz-types";

describe("setFileText", () => {
  describe("updating existing files", () => {
    it("should update text of an existing file while preserving fileId", () => {
      const mockVizContent: VizContent = {
        id: "test-viz-123",
        files: {
          file1: {
            name: "index.html",
            text: "<html>Old</html>",
          },
          file2: {
            name: "script.js",
            text: 'console.log("Hello");',
          },
        },
      };

      const result = setFileText(
        mockVizContent,
        "index.html",
        "<html>New</html>",
      );

      expect(result.files?.file1.text).toBe("<html>New</html>");
      expect(result.files?.file1.name).toBe("index.html");
      expect(result.files?.file2).toEqual(mockVizContent.files?.file2);
    });

    it("should maintain immutability when updating existing file", () => {
      const mockVizContent: VizContent = {
        id: "test-viz-123",
        files: {
          file1: {
            name: "index.html",
            text: "<html>Old</html>",
          },
        },
      };

      const result = setFileText(
        mockVizContent,
        "index.html",
        "<html>New</html>",
      );

      // Original should be unchanged
      expect(mockVizContent.files?.file1.text).toBe("<html>Old</html>");
      // Result should be a new object
      expect(result.files).not.toBe(mockVizContent.files);
      // But new result should have the change
      expect(result.files?.file1.text).toBe("<html>New</html>");
    });

    it("should preserve other files when updating one file", () => {
      const mockVizContent: VizContent = {
        id: "test-viz-123",
        files: {
          file1: { name: "index.html", text: "<html>Old</html>" },
          file2: { name: "style.css", text: "body { color: red; }" },
          file3: { name: "script.js", text: 'console.log("test");' },
        },
      };

      const result = setFileText(
        mockVizContent,
        "index.html",
        "<html>New</html>",
      );

      expect(result.files?.file1.text).toBe("<html>New</html>");
      expect(result.files?.file2).toEqual(mockVizContent.files?.file2);
      expect(result.files?.file3).toEqual(mockVizContent.files?.file3);
    });

    it("should update file even when there are multiple files with same name (updates first match)", () => {
      const mockVizContent: VizContent = {
        id: "test-viz-123",
        files: {
          file1: { name: "index.html", text: "<html>First</html>" },
          file2: { name: "other.js", text: 'console.log("test");' },
          file3: { name: "index.html", text: "<html>Second</html>" },
        },
      };

      const result = setFileText(
        mockVizContent,
        "index.html",
        "<html>Updated</html>",
      );

      // Should update the first matching file
      expect(result.files?.file1.text).toBe("<html>Updated</html>");
      // Other file should remain unchanged
      expect(result.files?.file3.text).toBe("<html>Second</html>");
    });
  });

  describe("creating new files", () => {
    it("should create a new file when fileName does not exist", () => {
      const mockVizContent: VizContent = {
        id: "test-viz-123",
        files: {
          file1: {
            name: "index.html",
            text: "<html>Test</html>",
          },
        },
      };

      const result = setFileText(
        mockVizContent,
        "style.css",
        "body { color: blue; }",
      );

      // Should have two files
      expect(Object.keys(result.files || {}).length).toBe(2);
      // New file should exist
      const newFileId = Object.keys(result.files || {}).find(
        (id) => result.files?.[id]?.name === "style.css",
      );
      expect(newFileId).toBeDefined();
      if (newFileId) {
        expect(result.files?.[newFileId]?.text).toBe("body { color: blue; }");
      }
    });

    it("should create a new file with generated fileId in empty files object", () => {
      const mockVizContent: VizContent = {
        id: "test-viz-123",
        files: {},
      };

      const result = setFileText(
        mockVizContent,
        "index.html",
        "<html>Test</html>",
      );

      expect(Object.keys(result.files || {}).length).toBe(1);
      const fileId = Object.keys(result.files || {})[0];
      expect(result.files?.[fileId]?.name).toBe("index.html");
      expect(result.files?.[fileId]?.text).toBe("<html>Test</html>");
    });

    it("should maintain immutability when creating new file", () => {
      const mockVizContent: VizContent = {
        id: "test-viz-123",
        files: {
          file1: {
            name: "index.html",
            text: "<html>Test</html>",
          },
        },
      };

      const result = setFileText(
        mockVizContent,
        "style.css",
        "body { color: blue; }",
      );

      // Original should be unchanged
      expect(Object.keys(mockVizContent.files || {}).length).toBe(1);
      // Result should be a new object
      expect(result.files).not.toBe(mockVizContent.files);
      // Result should have new file
      expect(Object.keys(result.files || {}).length).toBe(2);
    });

    it("should preserve existing file IDs when adding new file", () => {
      const mockVizContent: VizContent = {
        id: "test-viz-123",
        files: {
          file1: {
            name: "index.html",
            text: "<html>Test</html>",
          },
        },
      };

      const result = setFileText(
        mockVizContent,
        "style.css",
        "body { color: blue; }",
      );

      // Original file should still be there with same ID and content
      expect(result.files?.file1).toEqual(mockVizContent.files?.file1);
    });
  });

  describe("edge cases and error handling", () => {
    it("should throw error when content is null", () => {
      expect(() => {
        setFileText(
          null as unknown as VizContent,
          "index.html",
          "<html>Test</html>",
        );
      }).toThrow();
    });

    it("should throw error when content is undefined", () => {
      expect(() => {
        setFileText(
          undefined as unknown as VizContent,
          "index.html",
          "<html>Test</html>",
        );
      }).toThrow();
    });

    it("should throw error when fileName is empty string", () => {
      const mockVizContent: VizContent = {
        id: "test-viz-123",
        files: {},
      };

      expect(() => {
        setFileText(mockVizContent, "", "<html>Test</html>");
      }).toThrow();
    });

    it("should throw error when fileText is empty string", () => {
      const mockVizContent: VizContent = {
        id: "test-viz-123",
        files: {},
      };

      expect(() => {
        setFileText(mockVizContent, "index.html", "");
      }).toThrow();
    });

    it("should allow non-empty fileText with special characters", () => {
      const mockVizContent: VizContent = {
        id: "test-viz-123",
        files: {},
      };

      const complexContent = `function test() {
  return {
    data: [1, 2, 3],
    nested: { a: 1 }
  };
}`;

      expect(() => {
        setFileText(mockVizContent, "complex.js", complexContent);
      }).not.toThrow();
    });

    it("should handle content with no files property", () => {
      const mockVizContent = {
        id: "test-viz-123",
      } as VizContent;

      const result = setFileText(
        mockVizContent,
        "index.html",
        "<html>Test</html>",
      );

      expect(result.files).toBeDefined();
      const fileCount = result.files ? Object.keys(result.files).length : 0;
      expect(fileCount).toBe(1);
    });

    it("should handle fileName with special characters", () => {
      const mockVizContent: VizContent = {
        id: "test-viz-123",
        files: {},
      };

      const result = setFileText(
        mockVizContent,
        "my-file@v2.0.js",
        "console.log('test');",
      );

      const fileId = Object.keys(result.files || {})[0];
      expect(result.files?.[fileId]?.name).toBe("my-file@v2.0.js");
    });

    it("should handle single character fileName", () => {
      const mockVizContent: VizContent = {
        id: "test-viz-123",
        files: {},
      };

      const result = setFileText(mockVizContent, "a", "x");

      const fileId = Object.keys(result.files || {})[0];
      expect(result.files?.[fileId]?.name).toBe("a");
      expect(result.files?.[fileId]?.text).toBe("x");
    });

    it("should handle whitespace in fileText (should not throw)", () => {
      const mockVizContent: VizContent = {
        id: "test-viz-123",
        files: {},
      };

      const result = setFileText(mockVizContent, "index.html", "   ");

      const fileId = Object.keys(result.files || {})[0];
      expect(result.files?.[fileId]?.text).toBe("   ");
    });

    it("should handle large content", () => {
      const mockVizContent: VizContent = {
        id: "test-viz-123",
        files: {},
      };

      const largeContent = "x".repeat(100000);

      const result = setFileText(mockVizContent, "large.txt", largeContent);

      const fileId = Object.keys(result.files || {})[0];
      expect(result.files?.[fileId]?.text.length).toBe(100000);
    });
  });

  describe("integration scenarios", () => {
    it("should correctly handle sequence of updates and additions", () => {
      let content: VizContent = {
        id: "test-viz-123",
        files: {},
      };

      // Add first file
      content = setFileText(content, "index.html", "<html>Test</html>");
      expect(content.files ? Object.keys(content.files).length : 0).toBe(1);

      // Update first file
      content = setFileText(content, "index.html", "<html>Updated</html>");
      expect(content.files ? Object.keys(content.files).length : 0).toBe(1);
      const htmlFileId = content.files
        ? Object.keys(content.files).find(
            (id) => content.files?.[id]?.name === "index.html",
          )
        : undefined;
      if (htmlFileId && content.files) {
        expect(content.files[htmlFileId].text).toBe("<html>Updated</html>");
      }

      // Add second file
      content = setFileText(content, "style.css", "body { color: red; }");
      expect(content.files ? Object.keys(content.files).length : 0).toBe(2);

      // Update second file
      content = setFileText(content, "style.css", "body { color: blue; }");
      expect(content.files ? Object.keys(content.files).length : 0).toBe(2);
      const cssFileId = content.files
        ? Object.keys(content.files).find(
            (id) => content.files?.[id]?.name === "style.css",
          )
        : undefined;
      if (cssFileId && content.files) {
        expect(content.files[cssFileId].text).toBe("body { color: blue; }");
      }

      // Original HTML file should be unchanged
      if (htmlFileId && content.files) {
        expect(content.files[htmlFileId].text).toBe("<html>Updated</html>");
      }
    });
  });
});
