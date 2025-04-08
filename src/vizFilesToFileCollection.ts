import type { VizFiles, FileCollection } from "@vizhub/viz-types";

/**
 * Converts VizContent to FileCollection format.
 */
export const vizFilesToFileCollection = (files?: VizFiles): FileCollection => {
  const fileCollection: FileCollection = {};

  // Return empty object if files is undefined
  if (!files) {
    return fileCollection;
  }

  // Convert each VizFile to the FileCollection format
  for (const file of Object.values(files)) {
    fileCollection[file.name] = file.text;
  }

  return fileCollection;
};
