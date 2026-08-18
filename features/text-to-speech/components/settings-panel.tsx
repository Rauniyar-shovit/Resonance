import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsPanelHistory } from "./settings-panel-history";
import { SettingsPanelSettings } from "./settings-panel-settings";

/**
 * Each tab carries its own bottom rule rather than the list drawing one, so the two
 * segments together form the panel's top border and the active one darkens in place.
 */
const tabTriggerClassName =
  "h-full flex-1 rounded-none border-0 border-b border-b-border bg-transparent font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground shadow-none after:hidden hover:text-foreground data-active:border-b-foreground data-active:bg-transparent data-active:text-foreground data-active:shadow-none";

export const SettingsPanel = () => {
  return (
    <div className="hidden w-105 min-h-0 flex-col border-l border-border lg:flex">
      <Tabs
        defaultValue="settings"
        className="flex h-full min-h-0 flex-col gap-y-0"
      >
        <TabsList
          variant="line"
          className="h-13 w-full shrink-0 gap-0 rounded-none p-0 group-data-horizontal/tabs:h-13"
        >
          <TabsTrigger value="settings" className={tabTriggerClassName}>
            Settings
          </TabsTrigger>

          <TabsTrigger value="history" className={tabTriggerClassName}>
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="settings"
          className="mt-0 flex min-h-0 flex-1 flex-col overflow-y-auto"
        >
          <SettingsPanelSettings />
        </TabsContent>

        <TabsContent
          value="history"
          className="mt-0 flex min-h-0 flex-1 flex-col overflow-y-auto"
        >
          <SettingsPanelHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};
