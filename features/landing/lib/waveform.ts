/**
 * Deterministic waveform generation for the landing page.
 *
 * These bars are decorative — they stand in for real audio so the page reads as a
 * voice product. Everything is seeded rather than random so server and client
 * render identical markup and hydration stays quiet.
 */

/** Linear congruential generator — same constants as the source design. */
const nextSeed = (seed: number) => (seed * 1103515245 + 12345) % 2147483648;

/** A bell-shaped envelope so waveforms taper at both ends instead of running flat. */
const envelope = (index: number, count: number, floor: number) =>
  floor + (1 - floor) * Math.sin((Math.PI * (index + 0.5)) / count);

/** Bar heights in px for one voice's static waveform. */
export const buildVoiceBars = (seed: number, count: number): number[] => {
  let s = seed;
  const bars: number[] = [];

  for (let i = 0; i < count; i++) {
    s = nextSeed(s);
    const r = s / 2147483648;
    bars.push(Math.round(3 + (0.2 + 0.8 * r) * 33 * envelope(i, count, 0.35)));
  }

  return bars;
};

/**
 * Each setting normalised to 0–1 within its own range, so the shaping maths is
 * independent of the units the app actually uses.
 */
export interface PreviewSettings {
  temperature: number;
  topP: number;
  topK: number;
  repetitionPenalty: number;
}

/** Maps a raw slider value onto 0–1 for {@link buildPreviewBars}. */
export const normalise = (value: number, min: number, max: number): number =>
  max === min ? 0 : (value - min) / (max - min);

/**
 * Bar heights that visibly react to the generation settings: creativity and
 * expression range widen the spread, natural flow stretches the cadence, and voice
 * variety scales amplitude.
 */
export const buildPreviewBars = (
  { temperature, topP, topK, repetitionPenalty }: PreviewSettings,
  count: number,
): number[] => {
  const spread = 0.12 + 0.88 * temperature * (0.55 + 0.45 * topK);
  let s = 970413;
  const bars: number[] = [];

  for (let i = 0; i < count; i++) {
    s = nextSeed(s);
    const r = s / 2147483648;
    const cadence = 0.72 + 0.28 * Math.sin(i / (1.4 + repetitionPenalty * 3.4));
    const amplitude = (1 - spread) * 0.62 + spread * r;

    bars.push(
      Math.round(
        2 + amplitude * 42 * envelope(i, count, 0.4) * cadence * (0.55 + 0.45 * topP),
      ),
    );
  }

  return bars;
};

/** Seconds to m:ss. */
export const formatClock = (seconds: number): string => {
  const total = Math.max(0, Math.floor(seconds));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
};
