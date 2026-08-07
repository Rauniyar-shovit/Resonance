import { createPolar } from "@polar-sh/sdk/2026-04";
import { env } from "./env";

export const polar = createPolar({
  accessToken: env.POLAR_ACCESS_TOKEN,
  environment: env.POLAR_SERVER,
});
