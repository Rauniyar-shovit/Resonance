"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  SAMPLER_SCRIPT,
  SAMPLER_VOICES,
  type SamplerVoice,
} from "@/features/landing/data/landing-content";
import { buildVoiceBars, formatClock } from "@/features/landing/lib/waveform";

const BAR_COUNT = 96;

interface WaveformProps {
  bars: number[];
  progress: number;
}

const Waveform = ({ bars, progress }: WaveformProps) => (
  <div className="relative h-10 min-w-[60px] flex-1">
    <div className="absolute inset-0 flex items-center gap-px opacity-20">
      {bars.map((height, index) => (
        <div
          key={index}
          className="flex-1 bg-foreground"
          style={{ height: `${height}px` }}
        />
      ))}
    </div>
    <div
      className="absolute inset-0 flex items-center gap-px"
      style={{ clipPath: `inset(0 ${((1 - progress) * 100).toFixed(2)}% 0 0)` }}
    >
      {bars.map((height, index) => (
        <div
          key={index}
          className="flex-1 bg-(--lp-accent)"
          style={{ height: `${height}px` }}
        />
      ))}
    </div>
  </div>
);

interface VoiceRowProps {
  voice: SamplerVoice;
  isPlaying: boolean;
  progress: number;
  onToggle: (id: string) => void;
}

const VoiceRow = ({ voice, isPlaying, progress, onToggle }: VoiceRowProps) => {
  const bars = useMemo(
    () => buildVoiceBars(voice.seed, BAR_COUNT),
    [voice.seed],
  );

  return (
    <div className="flex items-center gap-[clamp(14px,2vw,24px)] border-t border-border py-4">
      <button
        type="button"
        onClick={() => onToggle(voice.id)}
        aria-label={`${isPlaying ? "Pause" : "Play"} ${voice.name}`}
        className="flex size-11 flex-none cursor-pointer items-center justify-center rounded-full border border-border transition-colors hover:border-foreground"
      >
        {isPlaying ? (
          <span className="flex gap-[3px]">
            <span className="h-3 w-[3px] bg-foreground" />
            <span className="h-3 w-[3px] bg-foreground" />
          </span>
        ) : (
          <span className="ml-[3px] size-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-foreground" />
        )}
      </button>

      <div className="w-[clamp(96px,13vw,150px)] flex-none">
        <div className="text-[15px] font-semibold tracking-[-0.01em]">
          {voice.name}
        </div>
        <div className="mt-[3px] font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {voice.label}
        </div>
      </div>

      <Waveform bars={bars} progress={progress} />

      <div className="w-[38px] flex-none text-right font-mono text-[11px] text-muted-foreground">
        {formatClock(isPlaying ? voice.duration * progress : voice.duration)}
      </div>
    </div>
  );
};

/**
 * Hero sampler: the same line read by four system voices.
 *
 * Audio lives at `public/voices/<id>.wav`. If a file is missing the component keeps
 * working — it animates progress on a timer and flags itself as a silent preview
 * instead of appearing broken.
 */
export const VoiceSampler = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [isSilent, setIsSilent] = useState(false);

  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const frameRef = useRef<number | null>(null);
  const startedAtRef = useRef(0);

  useEffect(() => {
    const elements: HTMLAudioElement[] = [];

    for (const voice of SAMPLER_VOICES) {
      const audio = new Audio(`/voices/${voice.id}.wav`);
      audio.preload = "metadata";
      audio.addEventListener("error", () => setIsSilent(true));
      audioRefs.current[voice.id] = audio;
      elements.push(audio);
    }

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      for (const audio of elements) audio.pause();
    };
  }, []);

  const stopPlayback = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    for (const audio of Object.values(audioRefs.current)) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, []);

  const toggle = useCallback(
    (id: string) => {
      const wasPlaying = playingId === id;
      stopPlayback();
      setProgress(0);

      if (wasPlaying) {
        setPlayingId(null);
        return;
      }

      const voice = SAMPLER_VOICES.find((candidate) => candidate.id === id);
      if (!voice) return;

      const audio = audioRefs.current[id];
      // Rejected play() promises are expected when the file is absent or autoplay
      // is blocked; the timer fallback below still drives the waveform.
      void audio?.play().catch(() => setIsSilent(true));

      startedAtRef.current = performance.now();
      setPlayingId(id);

      const tick = () => {
        const elapsed = (performance.now() - startedAtRef.current) / 1000;
        const fraction =
          audio && !audio.paused && Number.isFinite(audio.duration)
            ? audio.currentTime / audio.duration
            : elapsed / voice.duration;

        if (fraction >= 1) {
          frameRef.current = null;
          setPlayingId(null);
          setProgress(0);
          return;
        }

        setProgress(fraction);
        frameRef.current = requestAnimationFrame(tick);
      };

      frameRef.current = requestAnimationFrame(tick);
    },
    [playingId, stopPlayback],
  );

  return (
    <div className="mt-[clamp(48px,6vw,84px)] overflow-hidden rounded-[14px] border border-border bg-card">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4 border-b border-border px-[clamp(20px,3vw,34px)] py-[clamp(20px,2.5vw,30px)]">
        <div className="flex flex-none items-center gap-2.5">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">
            One line · Multiple system voices
          </p>
          {isSilent && (
            <span className="rounded-[5px] border border-border px-[7px] py-[3px] font-mono text-[9.5px] uppercase tracking-widest text-muted-foreground">
              Silent preview
            </span>
          )}
        </div>
        <p className="min-w-[280px] flex-1 text-[clamp(1rem,1.6vw,1.25rem)] leading-[1.5] tracking-[-0.015em]">
          &ldquo;{SAMPLER_SCRIPT}&rdquo;
        </p>
      </div>

      <div className="px-[clamp(20px,3vw,34px)] pt-1.5 pb-[clamp(14px,2vw,22px)]">
        {SAMPLER_VOICES.map((voice) => (
          <VoiceRow
            key={voice.id}
            voice={voice}
            isPlaying={playingId === voice.id}
            progress={playingId === voice.id ? progress : 0}
            onToggle={toggle}
          />
        ))}
      </div>
    </div>
  );
};
