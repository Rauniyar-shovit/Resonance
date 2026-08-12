/**
 * Money formatting for the workspace.
 *
 * Billing quotes AUD, so every price the signed-in app shows — estimates, usage,
 * and the rates quoted alongside them — goes through here rather than hand-written
 * dollar signs, which is how "$0.30" and "$0.50" ended up on screen together.
 */
const workspaceCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "AUD",
  minimumFractionDigits: 2,
});

export const formatDollars = (dollars: number): string =>
  workspaceCurrency.format(dollars);

export const formatCents = (cents: number): string =>
  workspaceCurrency.format(cents / 100);
