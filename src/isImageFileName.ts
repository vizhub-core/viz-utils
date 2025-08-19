// Check if a file name has an image file extension
export const isImageFileName = (fileName: string): boolean => {
  if (!fileName || typeof fileName !== "string" || fileName.trim() === "") {
    return false;
  }

  // Check if it's an image file based on extension
  // Also ensure there's at least one character before the dot
  return /^.+\.(png|jpg|jpeg|gif|bmp|svg|webp)$/i.test(fileName);
};
