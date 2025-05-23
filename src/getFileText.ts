import { VizContent } from "@vizhub/viz-types";

// Gets the text content of a file with the given name.
// Returns null if not found.
export const getFileText = (
  content: VizContent,
  fileName: string,
): string | null => {
  if (content && content.files) {
    for (const fileId of Object.keys(content.files)) {
      const file = content.files[fileId];
      if (file.name === fileName) {
        return file.text;
      }
    }
  }
  return null;
};
