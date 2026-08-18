"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { VoiceCreateForm } from "./voice-create-form";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/features/billing/hooks/use-checkout";
import { useCallback } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";

import { VOICE_GENERATION_COST } from "@/features/text-to-speech/data/constants";
import { formatDollars } from "@/lib/currency";
import { EYEBROW } from "@/lib/typography";

interface VoiceCreateDialogProps {
  children?: React.ReactElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const TITLE = "Create a custom voice.";
const BLURB =
  "Five seconds of clean audio is enough. Files up to 4 MB. Reuse across the workspace is free.";

/** The charge is stated before the sheet is opened, not just on the submit button. */
const priceEyebrow = `New voice · ${formatDollars(VOICE_GENERATION_COST)} once`;

export function VoiceCreateDialog({
  children,
  open,
  onOpenChange,
}: VoiceCreateDialogProps) {
  const isMobile = useIsMobile();

  const { checkout } = useCheckout();

  const handleError = useCallback(
    (message: string) => {
      if (message === "SUBSCRIPTION_REQUIRED") {
        toast.error("Subscription required", {
          action: {
            label: "Subscribe",
            onClick: () => checkout(),
          },
        });
      } else {
        toast.error(message);
      }
    },
    [checkout],
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        {children && <DrawerTrigger render={children} />}
        <DrawerContent>
          <DrawerHeader className="gap-2 text-left group-data-[swipe-axis=y]/drawer-popup:text-left">
            <span className={EYEBROW}>{priceEyebrow}</span>
            <DrawerTitle className="text-[26px] font-semibold leading-[1.05] tracking-[-0.035em]">
              {TITLE}
            </DrawerTitle>
            <DrawerDescription className="max-w-[44ch] text-pretty text-[15px] leading-[1.6]">
              {BLURB}
            </DrawerDescription>
          </DrawerHeader>
          <VoiceCreateForm
            scrollable
            onError={handleError}
            footer={(submit) => (
              <DrawerFooter className="flex-row gap-3">
                <DrawerClose
                  render={
                    <Button
                      variant="outline"
                      className="h-9 shrink-0 rounded-xl border-foreground/10 px-4"
                    />
                  }
                >
                  Cancel
                </DrawerClose>
                {submit}
              </DrawerFooter>
            )}
          />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger render={children} />}
      {/* The sheet is taller than a short viewport once a sample is attached, so the
          body scrolls inside a capped shell rather than running off the screen. */}
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[calc(100dvh-4rem)] flex-col gap-0 rounded-2xl p-0 sm:max-w-130"
      >
        <DialogHeader className="shrink-0 gap-2 border-b border-border px-7 pb-5 pr-16 pt-6 text-left">
          <DialogClose
            render={
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Close"
                className="absolute right-6 top-6 size-8 rounded-xl border-foreground/10 bg-transparent text-muted-foreground hover:text-foreground"
              />
            }
          >
            <X className="size-3.5" />
          </DialogClose>

          <span className={EYEBROW}>{priceEyebrow}</span>
          <DialogTitle className="text-[26px] font-semibold leading-[1.05] tracking-[-0.035em]">
            {TITLE}
          </DialogTitle>
          <DialogDescription className="max-w-[44ch] text-pretty text-[15px] leading-[1.6]">
            {BLURB}
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-7 py-6">
          <VoiceCreateForm
            onError={handleError}
            footer={(submit) => (
              <div className="flex flex-row gap-3 border-t border-border pt-5">
                <DialogClose
                  render={
                    <Button
                      variant="outline"
                      className="h-9 shrink-0 rounded-xl border-foreground/10 px-4"
                    />
                  }
                >
                  Cancel
                </DialogClose>
                {submit}
              </div>
            )}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
