import { describe, it, expect } from 'vitest';
import { generateVizFileId } from './generateVizFileId';

describe('generateVizFileId', () => {
  it('should generate a string of length 8', () => {
    const fileId = generateVizFileId();
    expect(fileId.length).toBe(8);
  });

  it('should generate a string with only hexadecimal characters', () => {
    const fileId = generateVizFileId();
    expect(/^[0-9a-f]{8}$/i.test(fileId)).toBe(true);
  });

  it('should generate unique file IDs', () => {
    const fileIds = new Set();
    for (let i = 0; i < 100; i++) {
      fileIds.add(generateVizFileId());
    }
    expect(fileIds.size).toBe(100);
  });
});
