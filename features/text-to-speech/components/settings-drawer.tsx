import { Settings } from "lucide-react";
import { SettingsPanelSettings } from "./settings-panel-settings";

import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface SettingsDrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export const SettingsDrawer = ({
  open,
  onOpenChange,
  children,
}: SettingsDrawerProps) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {children ?? (
        <DrawerTrigger render={<Button variant="outline" size="sm" />}>
          {/* <DrawerTrigger render={<Button variant="outline" size="sm" />}> */}
          <Settings className="size-4" />
        </DrawerTrigger>
      )}

      <DrawerContent>
        <DrawerHeader>Settings</DrawerHeader>
        <div className="overflow-y-auto">
          <SettingsPanelSettings />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
