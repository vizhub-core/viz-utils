import { VizContent } from "@vizhub/viz-types";
import { getFileId } from "./getFileId";
import { generateVizFileId } from "./generateVizFileId";

/**
 * Sets the text content of a file using an immutable update pattern.
 * If a file with the given fileName exists, its text is updated while preserving its fileId.
 * If no file with the given fileName exists, a new file is created with a generated fileId.
 *
 * @param content - The VizContent object to update (must not be null or undefined)
 * @param fileName - The name of the file (must be a non-empty string)
 * @param fileText - The new text content for the file (must be a non-empty string)
 * @returns A new VizContent object with the updated or newly created file
 * @throws Error if content is null or undefined
 * @throws Error if fileName is empty or not a string
 * @throws Error if fileText is empty or not a string
 */
export const setFileText = (
  content: VizContent,
  fileName: string,
  fileText: string,
): VizContent => {
  // Validate content
  if (content === null || content === undefined) {
    throw new Error("Content cannot be null or undefined");
  }

  // Validate fileName
  if (typeof fileName !== "string" || fileName.length === 0) {
    throw new Error("fileName must be a non-empty string");
  }

  // Validate fileText
  if (typeof fileText !== "string" || fileText.length === 0) {
    throw new Error("fileText must be a non-empty string");
  }

  // Initialize files object if it doesn't exist
  const files = content.files || {};

  // Try to find existing file with this name
  const existingFileId = getFileId(content, fileName);

  if (existingFileId) {
    // Update existing file - shallow copy of files object
    return {
      ...content,
      files: {
        ...files,
        [existingFileId]: {
          ...files[existingFileId],
          text: fileText,
        },
      },
    };
  } else {
    // Create new file with generated ID
    const newFileId = generateVizFileId();
    return {
      ...content,
      files: {
        ...files,
        [newFileId]: {
          name: fileName,
          text: fileText,
        },
      },
    };
  }
};
