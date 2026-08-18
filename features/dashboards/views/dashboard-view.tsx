import PageHeader from "@/components/page-header";
import DashboardHeader from "@/features/dashboards/components/dashboard-header";
import QuickActionsPanel from "@/features/dashboards/components/quick-actions-panel";
import { TextInputPanel } from "@/features/dashboards/components/text-input-panel";
import { WORKSPACE_SPECS } from "@/lib/specs";

const DashboardView = () => {
  return (
    <div>
      <PageHeader title="Home" className="lg:hidden" />

      <div className="mx-auto flex w-full max-w-295 flex-col gap-[clamp(32px,4vw,56px)] px-[clamp(20px,4vw,40px)] py-[clamp(28px,4vw,56px)]">
        <DashboardHeader />
        <TextInputPanel />
        <QuickActionsPanel />

        <footer className="flex flex-wrap gap-x-8 gap-y-2 border-t border-border pt-5 font-mono text-xs text-muted-foreground">
          {WORKSPACE_SPECS.map((spec) => (
            <span key={spec}>{spec}</span>
          ))}
        </footer>
      </div>
    </div>
  );
};

export default DashboardView;
