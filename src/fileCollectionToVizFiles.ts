import { FileCollection, VizFiles } from "@vizhub/viz-types";
import { generateVizFileId } from "./generateVizFileId";

export const fileCollectionToVizFiles = (files: FileCollection): VizFiles => {
  return Object.entries(files).reduce((acc, [name, text]) => {
    acc[generateVizFileId()] = { name, text };
    return acc;
  }, {} as VizFiles);
};
