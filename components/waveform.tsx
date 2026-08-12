import { cn } from "@/lib/utils";

/**
 * Decorative waveform bars, as percentages of whatever box holds them.
 *
 * The bars stand in for audio rather than describing any real generation, so they are
 * seeded instead of random: these panels are server-rendered and anything random would
 * produce a hydration mismatch.
 */
const buildBars = (count: number, seed: number): number[] =>
  Array.from({ length: count }, (_, index) => {
    const wave = Math.sin(index * seed) * Math.cos(index * 0.53 + seed);
    return Math.round(22 + Math.abs(wave) * 78);
  });

interface WaveformProps {
  count: number;
  /** Changing this changes the shape; the same seed always draws the same bars. */
  seed: number;
  /** Sets the height the bars are measured against. */
  className?: string;
  barClassName?: string;
}

export const Waveform = ({
  count,
  seed,
  className,
  barClassName,
}: WaveformProps) => (
  <span aria-hidden className={cn("flex items-end gap-0.5", className)}>
    {buildBars(count, seed).map((height, index) => (
      <span
        key={index}
        className={cn("w-[3px] rounded-[1.5px] bg-foreground/20", barClassName)}
        style={{ height: `${height}%` }}
      />
    ))}
  </span>
);
