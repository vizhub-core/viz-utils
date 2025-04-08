import type { VizId } from "@vizhub/viz-types";

// Resolve a Web‑Crypto‑compatible `crypto` object.
// • Browsers & Node 19 +   → globalThis.crypto
// • Anything else (rare)   → use node:crypto's webcrypto
const getCryptoObj = (): Crypto => {
  if (typeof globalThis.crypto !== "undefined") {
    return globalThis.crypto as Crypto;
  }
  // Use require instead of import to avoid top-level await
  // This will only run in Node.js environments
  return (require("node:crypto").webcrypto as Crypto);
};

const cryptoObj = getCryptoObj();

/**
 * Generates a dash‑free RFC 4122‑compliant UUID v4 (32 hex chars).
 * Works in all evergreen browsers and Node 19 + without extra deps.
 */
export const generateVizId = (): VizId => {
  const bytes = new Uint8Array(16);
  cryptoObj.getRandomValues(bytes);

  // RFC 4122: set version (4) and variant (10xx)
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join(
    "",
  ) as VizId;
};
