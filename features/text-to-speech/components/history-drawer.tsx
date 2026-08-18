import { History } from "lucide-react";
import { SettingsPanelHistory } from "./settings-panel-history";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { EYEBROW } from "@/lib/typography";

export const HistoryDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger
        render={<Button variant="outline" size="icon-lg" />}
        className="rounded-xl border-foreground/10 bg-card"
      >
        <History className="size-4" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className={EYEBROW}>History</DrawerHeader>
        <div className="overflow-y-auto">
          <SettingsPanelHistory />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
