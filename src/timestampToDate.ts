import type { VizTimestamp } from "@vizhub/viz-types";

export const timestampToDate = (timestamp: VizTimestamp): Date =>
  new Date(timestamp * 1000);
