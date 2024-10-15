import { NG_WORDS } from "@/features/const/NG_WORDS";
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
        author: z.string().max(10, "名前は10文字以内である必要があります").optional(),
        content: z
          .string()
          .min(1, "内容は1文字以上である必要があります")
          .max(1000, "内容は1000文字以内である必要があります")
          .refine((value) => {
            return !NG_WORDS.some((word) => value.includes(word));
          }, "不適切な言葉が含まれています"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      try {
        const createdMessage = await ctx.db.message.create({
          data: {
            author: input.author !== "" ? input.author : "風吹けばんぽたそ",
            content: input.content,
          },
        });
        return createdMessage;
      } catch (error) {
        console.error("メッセージの作成中にエラーが発生しました:", error);
        throw new Error("メッセージの投稿に失敗しました。もう一度お試しください。");
      }
    }),
});
