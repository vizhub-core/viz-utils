import type { Timestamp } from "@vizhub/viz-types";

export const timestampToDate = (timestamp: Timestamp): Date =>
  new Date(timestamp * 1000);
