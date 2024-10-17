export const removeInvisibleCharacters = (text: string): string => {
  return text
    .replace(
      /[\u0009\u0020\u00A0\u00AD\u034F\u061C\u115F\u1160\u17B4\u17B5\u180B-\u180E\u2000-\u200F\u202A-\u202F\u205F-\u206F\u2800\u3000\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFFC\u133FC\u1D159\u1D173-\u1D17A\uE0001\uE0020-\uE007F\uE0100-\uE01EF]/g,
      ""
    )
    .replace(/\n{3,}/g, "\n\n");
};
