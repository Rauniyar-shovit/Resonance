"use client";

import { Slider } from "@/components/ui/slider";
import { useTypedAppFormContext } from "@/hooks/use-app-form";
import { EYEBROW } from "@/lib/typography";
import { useSelector } from "@tanstack/react-form";
import { TEXT_MAX_LENGTH } from "../data/constants";
import { formatSliderValue, sliders } from "../data/sliders";
import { ttsFormOptions } from "./text-to-speech-form";
import { VoiceSelector } from "./voice-selector";

/** The running terms of a generation, stated once at the foot of the panel. */
const SPECS = [
  `A10G GPU · max ${TEXT_MAX_LENGTH.toLocaleString()} chars`,
  "Reuse of a generated voice is free",
];

export const SettingsPanelSettings = () => {
  const form = useTypedAppFormContext(ttsFormOptions);
  const isSubmitting = useSelector(form.store, (s) => s.isSubmitting);

  return (
    <div className="flex flex-col gap-8 p-[clamp(16px,2.4vw,28px)]">
      <VoiceSelector />

      {sliders.map((slider) => (
        <form.Field key={slider.id} name={slider.id}>
          {(field) => (
            <div className="flex flex-col gap-3">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm font-medium">{slider.label}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {formatSliderValue(slider, field.state.value)}
                </span>
              </div>

              <Slider
                value={[field.state.value]}
                onValueChange={(value) =>
                  field.handleChange(Array.isArray(value) ? value[0] : value)
                }
                min={slider.min}
                max={slider.max}
                step={slider.step}
                disabled={isSubmitting}
                className="**:data-[slot=slider-thumb]:size-3 **:data-[slot=slider-thumb]:border-foreground **:data-[slot=slider-thumb]:bg-foreground **:data-[slot=slider-track]:h-0.5 **:data-[slot=slider-track]:bg-border"
              />

              <div className={`flex justify-between ${EYEBROW}`}>
                <span>{slider.leftLabel}</span>
                <span>{slider.rightLabel}</span>
              </div>
            </div>
          )}
        </form.Field>
      ))}

      <div
        className={`flex flex-col gap-1 border-t border-border pt-4 ${EYEBROW}`}
      >
        {SPECS.map((spec) => (
          <span key={spec}>{spec}</span>
        ))}
      </div>
    </div>
  );
};
