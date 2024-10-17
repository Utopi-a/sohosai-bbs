export const removeInvisibleCharacters = (text: string): string => {
  return text
    .replace(/[\u00A0\u00AD\u200B-\u200F\u2028\u2029\uFEFF]/g, "")
    .replace(/\r\n|\r|\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n");
};
