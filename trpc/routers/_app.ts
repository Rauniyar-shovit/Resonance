import { createTRPCRouter } from "../init";
import { billingsRouter } from "./billings";
import { generationsRouter } from "./generations";
import { voicesRouter } from "./voice";
export const appRouter = createTRPCRouter({
  voices: voicesRouter,
  generations: generationsRouter,
  billing: billingsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
