import { NG_WORDS } from "@/features/const/NG_WORDS";
import { removeInvisibleCharacters } from "@/features/utils";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const messageRouter = createTRPCRouter({
  getMessages: publicProcedure.query(({ ctx }) => {
    return ctx.db.message.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  createMessage: publicProcedure
    .input(
      z.object({
        author: z.string().max(10, "名前は10文字以内である必要があります"),
        content: z
          .string()
          .min(1, "内容は1文字以上である必要があります")
          .max(1000, "内容は1000文字以内である必要があります"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const removeInvisibleCharacterContent = removeInvisibleCharacters(input.content);
      const removeInvisibleCharacterAuthor = removeInvisibleCharacters(input.author);

      const removeNGWords = (text: string): string => {
        return NG_WORDS.reduce((cleanText, ngWord) => {
          return cleanText.replace(new RegExp(ngWord, "gi"), "");
        }, text);
      };

      const cleanContent = removeNGWords(removeInvisibleCharacterContent);
      const cleanAuthor = removeNGWords(removeInvisibleCharacterAuthor);

      try {
        const createdMessage = await ctx.db.message.create({
          data: {
            author: cleanAuthor !== "" ? cleanAuthor : "風吹けばんぽたそ",
            content: cleanContent,
          },
        });
        return createdMessage;
      } catch (error) {
        console.error("メッセージの作成中にエラーが発生しました:", error);
        throw new Error("メッセージの投稿に失敗しました。もう一度お試しください。");
      }
    }),
});
