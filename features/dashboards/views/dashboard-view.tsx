import PageHeader from "@/components/page-header";
import HeroPattern from "../components/hero-pattern";
import DashboardHeader from "../components/dashboard-header";

const DashboardView = () => {
  return (
    <div className="realtive">
      <PageHeader title="Home" className="lg:hidden" />
      <HeroPattern />
      <div className="relative space-y-8 p-4 lg:p-16">
        <DashboardHeader />
      </div>
    </div>
  );
};

export default DashboardView;
