import { cn } from "@/lib/utils";
import { VoiceRow } from "./voice-row";
import type { VoiceItem } from "./voice-row";

interface VoicesListProps {
  title: string;
  /** Mono tally opposite the heading — "8 of 20", "0 shared". */
  countLabel: string;
  voices: VoiceItem[];
  /** Shown in place of the rows when nothing is left after filtering. */
  empty: React.ReactNode;
  /**
   * The section's own library gets a solid rule; the ones below it get a hairline,
   * so the page reads as one owned list followed by everything else.
   */
  emphasized?: boolean;
}

export function VoicesList({
  title,
  countLabel,
  voices,
  empty,
  emphasized,
}: VoicesListProps) {
  return (
    <section className="flex flex-col gap-5">
      <div
        className={cn(
          "flex flex-wrap items-baseline justify-between gap-4 border-t pt-4",
          emphasized ? "border-foreground" : "border-border",
        )}
      >
        <h3 className="text-[clamp(1.25rem,2vw,1.5rem)] font-semibold tracking-[-0.035em]">
          {title}
        </h3>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          {countLabel}
        </span>
      </div>

      {voices.length ? (
        <div className="flex flex-col border-b border-border">
          {voices.map((voice, index) => (
            <VoiceRow key={voice.id} voice={voice} index={index} />
          ))}
        </div>
      ) : (
        empty
      )}
    </section>
  );
}
