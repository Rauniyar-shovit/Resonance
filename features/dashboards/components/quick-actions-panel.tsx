import QuickActionRow from "@/features/dashboards/components/quick-action-row";
import { quickActions } from "@/features/dashboards/data/quick-actions";

const QuickActionsPanel = () => {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-foreground pt-4">
        <h2 className="text-[clamp(1.25rem,2vw,1.5rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
          Start from a script.
        </h2>
        <p className="max-w-[44ch] text-[15px] leading-[1.6] text-muted-foreground">
          Six prepared prompts. Each one opens the editor with the script
          already loaded.
        </p>
      </div>

      {/* The trailing border closes the last row, so the list reads as a ruled table. */}
      <div className="flex flex-col border-b border-border">
        {quickActions.map((action, index) => (
          <QuickActionRow
            key={action.index}
            seed={0.7 + index * 0.31}
            {...action}
          />
        ))}
      </div>
    </section>
  );
};

export default QuickActionsPanel;
