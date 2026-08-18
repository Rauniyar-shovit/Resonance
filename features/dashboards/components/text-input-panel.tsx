"use client";

import { Button } from "@/components/ui/button";
import { Waveform } from "@/components/waveform";
import {
  COST_PER_UNIT,
  TEXT_MAX_LENGTH,
} from "@/features/text-to-speech/data/constants";
import { formatDollars } from "@/lib/currency";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const TextInputPanel = () => {
  const [text, setText] = useState("");
  const router = useRouter();

  const trimmed = text.trim();

  const handleGenerate = () => {
    if (!trimmed) return;

    router.push(`/dashboard/text-to-speech?text=${encodeURIComponent(trimmed)}`);
  };

  return (
    <section className="overflow-hidden rounded-xl border border-foreground/10 bg-card">
      <div className="flex flex-col gap-4.5 p-[clamp(20px,2.4vw,28px)]">
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Text to speech
          </span>
          <Waveform
            count={24}
            seed={0.42}
            className="h-4.5"
            barClassName="bg-foreground/15"
          />
        </div>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          maxLength={TEXT_MAX_LENGTH}
          rows={7}
          placeholder="Start typing or paste your text here."
          className="w-full resize-y bg-transparent text-[17px] leading-[1.6] outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border bg-muted px-[clamp(20px,2.4vw,28px)] py-3.5">
        <div className="flex items-center gap-5 font-mono text-xs text-muted-foreground">
          <span>
            {text.length.toLocaleString()} /{" "}
            {TEXT_MAX_LENGTH.toLocaleString()} characters
          </span>
          <span className="text-foreground">
            {formatDollars(text.length * COST_PER_UNIT)} estimated
          </span>
        </div>
        <Button
          size="lg"
          disabled={!trimmed}
          onClick={handleGenerate}
          className="w-full px-4.5 lg:w-auto"
        >
          Generate speech
        </Button>
      </div>
    </section>
  );
};
