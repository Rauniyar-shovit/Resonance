import { quickActions } from "@/features/dashboards/data/quick-actions";
import QuickActionCard from "@/features/dashboards/components/quick-action-card";

const QuickActionsPanel = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {quickActions.map((action) => (
            <QuickActionCard
              key={action.title}
              title={action.title}
              description={action.description}
              gradient={action.gradient}
              href={action.href}
            />
          ))}
        </div>
      </h2>
    </div>
  );
};

export default QuickActionsPanel;
