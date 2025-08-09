import { VizContent } from "@vizhub/viz-types";
import { getFileId } from "./getFileId";

// Gets the text content of a file with the given name.
// Returns null if not found.
export const getFileText = (
  content: VizContent,
  fileName: string,
): string | null => {
  const fileId = getFileId(content, fileName);
  if (fileId && content && content.files) {
    return content.files[fileId].text;
  }
  return null;
};
