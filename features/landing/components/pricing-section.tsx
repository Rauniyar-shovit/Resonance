"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  COST_PER_UNIT,
  TEXT_MAX_LENGTH,
} from "@/features/text-to-speech/data/constants";
import { PRICING_PLANS } from "@/features/landing/data/landing-content";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "AUD",
});

const Diamond = () => (
  <span
    aria-hidden
    className="mt-2 size-1.25 shrink-0 rotate-45 bg-foreground"
  />
);

/**
 * Pricing: two meters shown side by side, plus a per-generation estimate.
 *
 * Rates come from the app's own constants rather than being restated here, so the
 * advertised price and the workspace's live estimate can never disagree.
 */
export const PricingSection = () => {
  const [characters, setCharacters] = useState(2_500);

  return (
    <section className="border-y border-border bg-muted/40">
      <div className="mx-auto flex max-w-295 flex-col items-center px-5 py-18 text-center sm:px-10 lg:py-35">
        <h2 className="max-w-[16ch] text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-balance sm:text-5xl lg:text-[3.25rem]">
          You pay for what you generate.
        </h2>
        <p className="mt-5 max-w-[44ch] text-[17px] leading-relaxed text-muted-foreground text-pretty">
          Two meters, billed separately: characters of speech, and voices you
          generate. No seats, no minimums.
        </p>

        <div className="mt-10 grid w-full max-w-235 gap-5 text-left sm:grid-cols-2 lg:mt-16">
          {PRICING_PLANS.map((plan) => (
            <Card
              key={plan.label}
              className="flex flex-col gap-0 rounded-xl p-8 ring-1 ring-foreground/10"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {plan.label}
              </div>
              <div className="mt-5 flex flex-wrap items-baseline gap-2">
                <span className="text-[2.5rem] font-semibold leading-none tracking-tighter lg:text-[3.25rem]">
                  {currency.format(plan.price)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {plan.unit}
                </span>
              </div>
              <p className="mt-3.5 text-sm leading-relaxed text-muted-foreground text-pretty">
                {plan.blurb}
              </p>
              <div className="my-6 h-px bg-border" />
              <ul className="flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Diamond />
                    <span className="text-sm leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <Card className="mt-5 w-full max-w-235 rounded-xl p-8 text-left ring-1 ring-foreground/10">
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Estimate a generation
          </div>

          <div className="mt-6">
            <div className="flex items-baseline justify-between font-mono text-xs">
              <span>characters</span>
              <span className="text-muted-foreground">
                {characters.toLocaleString("en-US")}
              </span>
            </div>
            <Slider
              className="mt-3"
              aria-label="characters per generation"
              min={100}
              max={TEXT_MAX_LENGTH}
              step={100}
              value={[characters]}
              // base-ui types this as `number | readonly number[]` depending on
              // whether `value` is a single thumb or a range.
              onValueChange={(next) =>
                setCharacters(typeof next === "number" ? next : next[0])
              }
            />
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-6">
            <div className="flex flex-wrap items-baseline gap-2.5">
              <span className="text-[1.75rem] font-semibold tracking-[-0.035em]">
                {currency.format(characters * COST_PER_UNIT)}
              </span>
              <span className="text-[13px] text-muted-foreground">
                per generation, before voice generation fees
              </span>
            </div>
            {/* nativeButton={false} because `render` produces an <a>, not a <button>. */}
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/sign-up" />}
            >
              Get started
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};
