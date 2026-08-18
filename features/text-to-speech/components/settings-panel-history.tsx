"use client";

import { Waveform } from "@/components/waveform";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { formatDistanceToNowStrict } from "date-fns";
import { Play } from "lucide-react";
import Link from "next/link";

export const SettingsPanelHistory = () => {
  const trpc = useTRPC();

  const { data: generations } = useSuspenseQuery(
    trpc.generations.getAll.queryOptions(),
  );

  if (!generations.length) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-[clamp(16px,2.4vw,28px)] py-16 text-center">
        <Waveform
          count={24}
          seed={1.27}
          className="h-8"
          barClassName="bg-foreground/15"
        />
        <p className="text-lg font-semibold tracking-[-0.03em]">
          No generations yet.
        </p>
        <p className="max-w-[36ch] text-pretty text-[15px] leading-[1.6] text-muted-foreground">
          Generate some speech and every take lands here, ready to play again.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-[clamp(16px,2.4vw,28px)]">
      {generations.map((generation) => (
        <Link
          href={`/dashboard/text-to-speech/${generation.id}`}
          key={generation.id}
          className="group flex items-center gap-3.5 border-b border-border py-4 text-left"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-foreground/10 transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
            <Play className="size-3.5 fill-current" />
          </span>

          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <span className="truncate text-sm font-medium">
              {generation.text}
            </span>
            <span className="truncate font-mono text-[11px] text-muted-foreground">
              {generation.voiceName} · {generation.text.length.toLocaleString()}{" "}
              chars
            </span>
          </div>

          <span className="shrink-0 font-mono text-xs text-muted-foreground">
            {formatDistanceToNowStrict(new Date(generation.createdAt))}
          </span>
        </Link>
      ))}
    </div>
  );
};
