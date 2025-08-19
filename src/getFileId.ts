import { VizContent, VizFileId } from "@vizhub/viz-types";

// Gets the file id of a file with the given name.
// Returns null if not found.
export const getFileId = (
  content: VizContent,
  fileName: string,
): VizFileId | null => {
  if (content && content.files) {
    for (const fileId of Object.keys(content.files)) {
      const file = content.files[fileId];
      if (file.name === fileName) {
        return fileId;
      }
    }
  }
  return null;
};
