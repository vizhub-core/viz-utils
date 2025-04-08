import type { VizId } from "@vizhub/viz-types";

// Resolve a Web‑Crypto‑compatible `crypto` object exactly once.
// • Browsers & Node 19 +   → globalThis.crypto
// • Anything else (rare)   → lazy‑load node:crypto and grab its `webcrypto`
const cryptoObj: Crypto =
  typeof globalThis.crypto !== "undefined"
    ? (globalThis.crypto as Crypto)
    : ((await import("node:crypto")).webcrypto as Crypto);

/**
 * Generates a dash‑free RFC 4122‑compliant UUID v4 (32 hex chars).
 * Works in all evergreen browsers and Node 19 + without extra deps.
 */
export const generateVizId = (): VizId => {
  const bytes = new Uint8Array(16);
  cryptoObj.getRandomValues(bytes);

  // RFC 4122: set version (4) and variant (10xx)
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join(
    "",
  ) as VizId;
};
