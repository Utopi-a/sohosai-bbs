export const removeInvisibleCharacters = (text: string): string => {
  return text.replace(/[\u200B-\u200D\uFEFF]/g, "");
};
