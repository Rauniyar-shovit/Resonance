import { buttonVariants } from "@/components/ui/button";
import { Waveform } from "@/components/waveform";
import type { QuickAction } from "@/features/dashboards/data/quick-actions";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface QuickActionRowProps extends QuickAction {
  /** Seeds this row's waveform so no two rows share a shape. */
  seed: number;
}

const QuickActionRow = ({
  index,
  title,
  description,
  duration,
  href,
  seed,
}: QuickActionRowProps) => {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-border px-2 py-5 transition-colors hover:bg-muted">
      <span className="w-8 shrink-0 font-mono text-xs tracking-[0.14em] text-muted-foreground">
        {index}
      </span>

      <h3 className="min-w-0 flex-[1_1_200px] text-lg font-semibold tracking-[-0.025em]">
        {title}
      </h3>

      <p className="min-w-0 max-w-[52ch] flex-[1_1_280px] text-pretty text-[15px] leading-[1.6] text-muted-foreground">
        {description}
      </p>

      <div className="flex shrink-0 items-center gap-3">
        <Waveform count={18} seed={seed} className="h-6.5" />
        <span className="font-mono text-xs text-muted-foreground">
          {duration}
        </span>
      </div>

      <Link
        href={href}
        className={cn(
          buttonVariants({ variant: "outline", size: "lg" }),
          "ml-auto shrink-0 px-4 hover:border-primary hover:bg-primary hover:text-primary-foreground",
        )}
      >
        Try now
      </Link>
    </div>
  );
};

export default QuickActionRow;
