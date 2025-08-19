import { describe, it, expect } from "vitest";
import { isImageFileName } from "./isImageFileName";

describe("isImageFileName", () => {
  it("should return true for valid image file extensions", () => {
    expect(isImageFileName("photo.png")).toBe(true);
    expect(isImageFileName("image.jpg")).toBe(true);
    expect(isImageFileName("picture.jpeg")).toBe(true);
    expect(isImageFileName("animation.gif")).toBe(true);
    expect(isImageFileName("bitmap.bmp")).toBe(true);
    expect(isImageFileName("vector.svg")).toBe(true);
    expect(isImageFileName("modern.webp")).toBe(true);
  });

  it("should be case-insensitive", () => {
    expect(isImageFileName("photo.PNG")).toBe(true);
    expect(isImageFileName("image.JPG")).toBe(true);
    expect(isImageFileName("picture.JPEG")).toBe(true);
    expect(isImageFileName("animation.GIF")).toBe(true);
    expect(isImageFileName("bitmap.BMP")).toBe(true);
    expect(isImageFileName("vector.SVG")).toBe(true);
    expect(isImageFileName("modern.WEBP")).toBe(true);
  });

  it("should return false for non-image file extensions", () => {
    expect(isImageFileName("document.txt")).toBe(false);
    expect(isImageFileName("script.js")).toBe(false);
    expect(isImageFileName("style.css")).toBe(false);
    expect(isImageFileName("data.json")).toBe(false);
    expect(isImageFileName("readme.md")).toBe(false);
    expect(isImageFileName("archive.zip")).toBe(false);
  });

  it("should return false for files without extensions", () => {
    expect(isImageFileName("filename")).toBe(false);
    expect(isImageFileName("README")).toBe(false);
  });

  it("should return false for empty or invalid input", () => {
    expect(isImageFileName("")).toBe(false);
    expect(isImageFileName("   ")).toBe(false);
    expect(isImageFileName(".png")).toBe(false); // just extension without filename
  });

  it("should handle filenames with multiple dots", () => {
    expect(isImageFileName("my.file.name.png")).toBe(true);
    expect(isImageFileName("backup.2023.12.25.jpg")).toBe(true);
    expect(isImageFileName("config.local.txt")).toBe(false);
  });

  it("should handle edge cases with partial matches", () => {
    expect(isImageFileName("notpng.txt")).toBe(false);
    expect(isImageFileName("file.pngtxt")).toBe(false);
    expect(isImageFileName("pngfile")).toBe(false);
  });
});
