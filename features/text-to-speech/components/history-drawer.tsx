import { History } from "lucide-react";
import { SettingsPanelHistory } from "./settings-panel-history";

import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export const HistoryDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" size="sm" />}>
        {/* <DrawerTrigger render={<Button variant="outline" size="sm" />}> */}
        <History className="size-4" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>History</DrawerHeader>
        <div className="overflow-y-auto">
          <SettingsPanelHistory />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
