import {
  COST_PER_UNIT,
  TEXT_MAX_LENGTH,
  VOICE_GENERATION_COST,
} from "@/features/text-to-speech/data/constants";
import { formatDollars } from "@/lib/currency";

/**
 * The running terms of the workspace, stated once at the foot of a page.
 *
 * Every page that closes with the mono spec strip reads the same list, so the model
 * and the rates can never drift apart between the dashboard and the libraries.
 */
export const WORKSPACE_SPECS = [
  "Chatterbox Turbo · A10G",
  `Speech ${formatDollars(COST_PER_UNIT * 1000)} / 1,000 chars`,
  `Voice generation ${formatDollars(VOICE_GENERATION_COST)} once`,
  `Max ${TEXT_MAX_LENGTH.toLocaleString()} chars per generation`,
];
