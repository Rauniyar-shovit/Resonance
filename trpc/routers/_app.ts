import { createTRPCRouter } from "../init";
import { voicesRouter } from "./voice";
export const appRouter = createTRPCRouter({
  voices: voicesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
