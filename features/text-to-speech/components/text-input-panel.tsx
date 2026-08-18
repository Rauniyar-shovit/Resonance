"use client";

import { formatDollars } from "@/lib/currency";
import { useTypedAppFormContext } from "@/hooks/use-app-form";
import { useSelector } from "@tanstack/react-form";
import { COST_PER_UNIT, TEXT_MAX_LENGTH } from "../data/constants";
import { GenerateButton } from "./generate-button";
import { HistoryDrawer } from "./history-drawer";
import { PromptSuggestion } from "./prompt-suggestion";
import { SettingsDrawer } from "./settings-drawer";
import { ttsFormOptions } from "./text-to-speech-form";
import { VoiceSelectorButton } from "./voice-selector-button";

export const TextInputPanel = () => {
  const form = useTypedAppFormContext(ttsFormOptions);
  const text = useSelector(form.store, (s) => s.values.text);
  const isSubmitting = useSelector(form.store, (s) => s.isSubmitting);

  const isEmpty = text.trim().length === 0;

  return (
    <div className="flex min-h-0 flex-col max-lg:flex-1 lg:grow-0 lg:shrink-0 lg:basis-1/2">
      {/* The panel itself never scrolls; the textarea takes what is left and scrolls inside. */}
      <div className="flex min-h-0 flex-1 flex-col gap-6 px-[clamp(16px,3vw,32px)] py-[clamp(20px,3vw,36px)]">
        <form.Field name="text">
          {(field) => (
            <textarea
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              placeholder="Start typing or paste your text here."
              maxLength={TEXT_MAX_LENGTH}
              disabled={isSubmitting}
              className="min-h-0 w-full flex-1 resize-none overflow-y-auto bg-transparent text-[17px] leading-[1.6] outline-none placeholder:text-muted-foreground disabled:opacity-50"
            />
          )}
        </form.Field>

        <PromptSuggestion
          disabled={isSubmitting}
          onSelect={(prompt) => form.setFieldValue("text", prompt)}
        />
      </div>

      {/* The meter and the action sit together on the muted rail, below the writing surface. */}
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-6 gap-y-3.5 border-t border-border bg-muted px-[clamp(16px,3vw,32px)] py-3.5">
        <div className="flex items-center gap-5 font-mono text-xs text-muted-foreground">
          <span>
            {text.length.toLocaleString()} / {TEXT_MAX_LENGTH.toLocaleString()}{" "}
            characters
          </span>
          <span className="text-foreground">
            {formatDollars(text.length * COST_PER_UNIT)} estimated
          </span>
        </div>

        <div className="flex w-full flex-col gap-2.5 lg:w-auto lg:flex-row lg:items-center">
          {/* Settings and history are a docked panel on desktop, drawers below it. */}
          <div className="flex items-center gap-2 lg:hidden">
            <SettingsDrawer>
              <VoiceSelectorButton />
            </SettingsDrawer>
            <HistoryDrawer />
          </div>

          <GenerateButton
            size="lg"
            className="w-full px-4.5 lg:w-auto"
            disabled={isSubmitting || isEmpty}
            isSubmitting={isSubmitting}
            onSubmit={() => form.handleSubmit()}
          />
        </div>
      </div>
    </div>
  );
};
