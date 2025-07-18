import type { Timestamp } from "@vizhub/viz-types";

export const dateToTimestamp = (date: Date): Timestamp =>
  Math.floor(date.getTime() / 1000);
