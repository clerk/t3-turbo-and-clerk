import { router } from "../trpc";
import { postRouter } from "./post";
import { authRouter } from "./auth";
import { userRouter } from "./user";

export const appRouter = router({
  post: postRouter,
  auth: authRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
