import type { VizTimestamp } from "@vizhub/viz-types";

export const dateToTimestamp = (date: Date): VizTimestamp =>
  Math.floor(date.getTime() / 1000);
