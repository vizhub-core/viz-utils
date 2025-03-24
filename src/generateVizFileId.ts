import type { VizFileId } from "@vizhub/viz-types";
import { generateVizId } from "./generateVizId";

// Generates a file id
export const generateVizFileId = (): VizFileId =>
  generateVizId().substring(0, 8);
