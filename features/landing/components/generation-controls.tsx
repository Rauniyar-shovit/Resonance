"use client";

import { useMemo, useState } from "react";
import { sliders } from "@/features/text-to-speech/data/sliders";
import { buildPreviewBars, normalise } from "@/features/landing/lib/waveform";

const PREVIEW_BAR_COUNT = 56;

type SliderId = (typeof sliders)[number]["id"];

const DEFAULTS = Object.fromEntries(
  sliders.map((slider) => [slider.id, slider.defaultValue]),
) as Record<SliderId, number>;

/**
 * Interactive preview of the generation controls.
 *
 * Labels, ranges and defaults come straight from `features/text-to-speech/data/sliders.ts`,
 * so the landing page always shows visitors the same wording they meet in the app.
 * The waveform is illustrative rather than a real synthesis — it reacts to the
 * settings so the controls feel connected to an outcome.
 */
export const GenerationControls = () => {
  const [values, setValues] = useState<Record<SliderId, number>>(DEFAULTS);

  const bars = useMemo(() => {
    // Normalise each value within its own range before shaping the waveform.
    const shape = sliders.reduce(
      (acc, slider) => ({
        ...acc,
        [slider.id]: normalise(values[slider.id], slider.min, slider.max),
      }),
      {} as Record<SliderId, number>,
    );

    return buildPreviewBars(shape, PREVIEW_BAR_COUNT);
  }, [values]);

  return (
    <div className="rounded-[14px] border border-border bg-card p-[clamp(22px,3vw,34px)]">
      <div className="flex h-13 items-center gap-px">
        {bars.map((height, index) => (
          <div
            key={index}
            className="flex-1 bg-(--lp-accent)"
            style={{ height: `${height}px` }}
          />
        ))}
      </div>
      <p className="mt-3.5 mb-6.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
        Shape of the read at these settings
      </p>

      <div className="flex flex-col gap-6">
        {sliders.map((slider) => (
          <div key={slider.id}>
            <label
              htmlFor={`control-${slider.id}`}
              className="text-sm font-medium tracking-[-0.01em]"
            >
              {slider.label}
            </label>
            <input
              id={`control-${slider.id}`}
              type="range"
              min={slider.min}
              max={slider.max}
              step={slider.step}
              value={values[slider.id]}
              onChange={(event) =>
                setValues((previous) => ({
                  ...previous,
                  [slider.id]: Number(event.target.value),
                }))
              }
              className="mt-3 w-full accent-foreground"
            />
            <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span>{slider.leftLabel}</span>
              <span>{slider.rightLabel}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
