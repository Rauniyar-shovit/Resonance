import PageHeader from "@/components/page-header";
import HeroPattern from "@/features/dashboards/components/hero-pattern";
import DashboardHeader from "@/features/dashboards/components/dashboard-header";
import { TextInputPanel } from "@/features/dashboards/components/text-input-panel";
import QuickActionsPanel from "@/features/dashboards/components/quick-actions-panel";

const DashboardView = () => {
  return (
    <div className="realtive">
      <PageHeader title="Home" className="lg:hidden" />
      <HeroPattern />
      <div className="relative space-y-8 p-4 lg:p-16">
        <DashboardHeader />
        <TextInputPanel />
        <QuickActionsPanel />
      </div>
    </div>
  );
};

export default DashboardView;
