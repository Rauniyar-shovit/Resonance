import { useState } from "react";
import { useQueryState } from "nuqs";
import { useDebouncedCallback } from "use-debounce";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { Waveform } from "@/components/waveform";
import { VOICE_GENERATION_COST } from "@/features/text-to-speech/data/constants";
import { formatDollars } from "@/lib/currency";
import { EYEBROW } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { VoiceCategory } from "@/lib/generated/prisma/client";
import { VOICE_CATEGORY_LABELS } from "../data/voice-categories";
import { voicesSearchParams } from "../lib/params";
import { VoiceCreateDialog } from "./voice-create-dialog";

interface VoicesToolbarProps {
  /** Only the categories the library actually holds, so no chip filters to nothing. */
  categories: VoiceCategory[];
  activeCategory: VoiceCategory | null;
  onCategoryChange: (category: VoiceCategory | null) => void;
}

const CHIP =
  "h-8 shrink-0 rounded-xl px-3.5 font-mono text-[11px] uppercase tracking-[0.12em] whitespace-nowrap transition-colors";

export function VoicesToolbar({
  categories,
  activeCategory,
  onCategoryChange,
}: VoicesToolbarProps) {
  const [query, setQuery] = useQueryState("query", voicesSearchParams.query);
  const [localQuery, setLocalQuery] = useState(query);

  const debouncedSetQuery = useDebouncedCallback(
    (value: string) => setQuery(value),
    300,
  );

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <span className={EYEBROW}>All libraries</span>

        <h2 className="max-w-[16ch] text-[clamp(2rem,3.8vw,3.25rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
          Discover a voice, or make your own.
        </h2>

        <p className="max-w-[48ch] text-pretty text-base leading-[1.6] text-muted-foreground">
          Five seconds of clean audio is enough to clone one. Files up to 4 MB.{" "}
          {formatDollars(VOICE_GENERATION_COST)} per voice generated, then reuse
          is free.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <InputGroup className="h-10 min-w-[220px] flex-1 basis-[280px] rounded-xl border-foreground/10 bg-card pl-3.5 lg:max-w-md">
          <InputGroupAddon className="pl-0">
            <Waveform
              count={3}
              seed={1.4}
              className="h-3"
              barClassName="w-[2px] bg-muted-foreground"
            />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search voices, categories, or regions"
            value={localQuery}
            onChange={(e) => {
              setLocalQuery(e.target.value);
              debouncedSetQuery(e.target.value);
            }}
          />
        </InputGroup>

        <VoiceCreateDialog>
          <Button className="h-10 rounded-xl px-4.5">Custom voice</Button>
        </VoiceCreateDialog>
      </div>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onCategoryChange(null)}
            className={cn(
              CHIP,
              activeCategory === null
                ? "bg-primary text-primary-foreground"
                : "border border-foreground/10 text-muted-foreground hover:text-foreground",
            )}
          >
            All
          </button>

          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={cn(
                CHIP,
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "border border-foreground/10 text-muted-foreground hover:text-foreground",
              )}
            >
              {VOICE_CATEGORY_LABELS[category]}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
