"use client";

import { useState } from "react";
import { useQueryState } from "nuqs";
import { useSuspenseQuery } from "@tanstack/react-query";

import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Waveform } from "@/components/waveform";
import type { VoiceCategory } from "@/lib/generated/prisma/client";
import { WORKSPACE_SPECS } from "@/lib/specs";
import { useTRPC } from "@/trpc/client";
import { VoiceCreateDialog } from "../components/voice-create-dialog";
import type { VoiceItem } from "../components/voice-row";
import { VoicesList } from "../components/voices-list";
import { VoicesToolbar } from "../components/voices-toolbar";
import { VOICE_CATEGORIES } from "../data/voice-categories";
import { voicesSearchParams } from "../lib/params";

/** Search runs on the server; the category chips narrow what came back, in place. */
const byCategory = (voices: VoiceItem[], category: VoiceCategory | null) =>
  category ? voices.filter((voice) => voice.category === category) : voices;

const NoMatches = ({ label }: { label: string }) => (
  <p className="text-[15px] leading-[1.6] text-muted-foreground">
    No {label} voice matches that search.
  </p>
);

export const VoicesView = () => {
  const trpc = useTRPC();
  const [query] = useQueryState("query", voicesSearchParams.query);
  const { data } = useSuspenseQuery(trpc.voices.getAll.queryOptions({ query }));
  const [category, setCategory] = useState<VoiceCategory | null>(null);

  const present = new Set(
    [...data.custom, ...data.system].map((voice) => voice.category),
  );
  const categories = VOICE_CATEGORIES.filter((c) => present.has(c));

  const custom = byCategory(data.custom, category);
  const system = byCategory(data.system, category);

  return (
    <>
      {/* The model and the rates close the page in the spec strip, so the header
          spends its mono note on what the library actually holds. */}
      <PageHeader
        title="Voices"
        eyebrow={`${data.totals.system} built-in · ${data.totals.custom} team`}
      />

      <div className="flex-1 overflow-y-auto px-[clamp(20px,4vw,40px)] pb-24 pt-[clamp(28px,4vw,48px)]">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-[clamp(40px,5vw,64px)]">
          <VoicesToolbar
            categories={categories}
            activeCategory={category}
            onCategoryChange={setCategory}
          />

          <VoicesList
            emphasized
            title="Team voices"
            countLabel={`${custom.length} shared`}
            voices={custom}
            empty={
              // An empty library gets the invitation; an empty *search* gets a line.
              data.totals.custom ? (
                <NoMatches label="team" />
              ) : (
                <div className="flex flex-col items-center gap-4 rounded-2xl border border-foreground/10 bg-card px-6 py-[clamp(40px,6vw,72px)] text-center">
                  <Waveform
                    count={40}
                    seed={0.61}
                    className="h-11"
                    barClassName="bg-foreground/15"
                  />

                  <h4 className="text-xl font-semibold tracking-[-0.03em]">
                    No team voices yet.
                  </h4>

                  <p className="max-w-[44ch] text-pretty text-[15px] leading-[1.6] text-muted-foreground">
                    Clone one and it appears here for every member of the
                    workspace. No seats, no minimums.
                  </p>

                  <VoiceCreateDialog>
                    <Button variant="outline" className="h-9 rounded-xl px-4">
                      Clone a voice
                    </Button>
                  </VoiceCreateDialog>
                </div>
              )
            }
          />

          <VoicesList
            title="Built-in voices"
            countLabel={`${system.length} of ${data.totals.system}`}
            voices={system}
            empty={<NoMatches label="built-in" />}
          />

          <footer className="flex flex-wrap gap-x-8 gap-y-2 border-t border-border pt-5 font-mono text-xs text-muted-foreground">
            {WORKSPACE_SPECS.map((spec) => (
              <span key={spec}>{spec}</span>
            ))}
          </footer>
        </div>
      </div>
    </>
  );
};
