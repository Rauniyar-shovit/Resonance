import PageHeader from "@/components/page-header";
import DashboardHeader from "@/features/dashboards/components/dashboard-header";
import QuickActionsPanel from "@/features/dashboards/components/quick-actions-panel";
import { TextInputPanel } from "@/features/dashboards/components/text-input-panel";
import {
  COST_PER_UNIT,
  TEXT_MAX_LENGTH,
  VOICE_GENERATION_COST,
} from "@/features/text-to-speech/data/constants";
import { formatDollars } from "@/lib/currency";

/** The running terms of the workspace, stated once at the foot of the page. */
const SPECS = [
  "Chatterbox Turbo · A10G",
  `Speech ${formatDollars(COST_PER_UNIT * 1000)} / 1,000 chars`,
  `Voice generation ${formatDollars(VOICE_GENERATION_COST)} once`,
  `Max ${TEXT_MAX_LENGTH.toLocaleString()} chars per generation`,
];

const DashboardView = () => {
  return (
    <div>
      <PageHeader title="Home" className="lg:hidden" />

      <div className="mx-auto flex w-full max-w-295 flex-col gap-[clamp(32px,4vw,56px)] px-[clamp(20px,4vw,40px)] py-[clamp(28px,4vw,56px)]">
        <DashboardHeader />
        <TextInputPanel />
        <QuickActionsPanel />

        <footer className="flex flex-wrap gap-x-8 gap-y-2 border-t border-border pt-5 font-mono text-xs text-muted-foreground">
          {SPECS.map((spec) => (
            <span key={spec}>{spec}</span>
          ))}
        </footer>
      </div>
    </div>
  );
};

export default DashboardView;
