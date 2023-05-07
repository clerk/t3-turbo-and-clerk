import { TRPCError } from "@trpc/server";
import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  byId: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!user)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "User not found",
        });
      return user;
    }),

  byUsername: publicProcedure
    .input(
      z.object({
        username: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          username: input.username,
        },
      });

      if (!user)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "User not found",
        });
      return user;
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.delete({
        where: {
          id: input.id,
        },
      });

      if (!user) throw new TRPCError({ code: "CONFLICT" });
    }),

  upsert: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
        email: z.string().email(),
        profileImageUrl: z.string().min(1),
        firstName: z.string().min(1),
        lastName: z.string().nullable(),
        username: z.string().nullable(),
        birthday: z.string().nullable(),
        gender: z.string().nullable(),
        createdAt: z.date(),
        updatedAt: z.date(),
        lastSignInAt: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.upsert({
        create: {
          id: input.id,
          email: input.email,
          firstName: input.firstName,
          lastName: input.lastName || "",
          username: input.username || input.id,
          profileImageUrl: input.profileImageUrl,
          birthday: input.birthday || "",
          gender: input.gender || "",
          createdAt: input.createdAt,
          updatedAt: input.updatedAt,
          lastSignInAt: input.lastSignInAt,
        },
        update: {
          firstName: input.firstName || undefined,
          lastName: input.lastName || undefined,
          username: input.username || undefined,
          profileImageUrl: input.profileImageUrl || undefined,
          createdAt: input.createdAt || undefined,
          updatedAt: input.updatedAt || undefined,
          lastSignInAt: input.lastSignInAt || undefined,
        },
        where: {
          id: input.id,
        },
      });

      if (!user) throw new TRPCError({ code: "CONFLICT" });
    }),
});
