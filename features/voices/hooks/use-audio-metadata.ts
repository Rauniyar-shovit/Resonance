"use client";

import { useEffect, useState } from "react";

export interface AudioMetadata {
  /** Seconds of audio, as `0:12`. */
  duration: string;
  /** Sample rate, as `44.1 kHz`. */
  sampleRate: string;
}

const formatDuration = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

const formatSampleRate = (hz: number) =>
  `${(hz / 1000).toFixed(1).replace(/\.0$/, "")} kHz`;

/**
 * Reads how long a sample runs and how finely it was captured.
 *
 * The clone endpoint wants ten clean seconds, so the create form states both back
 * before the charge is made rather than leaving the file as a name and a byte count.
 * Decoding is the only way to get the sample rate, and samples are capped at 4 MB,
 * so the whole buffer is decoded rather than sniffed from a header.
 */
export function useAudioMetadata(file: File | null): AudioMetadata | null {
  // Keyed by the file it describes, so a swapped sample reads as "not known yet"
  // during render rather than needing an effect to clear the stale answer first.
  const [resolved, setResolved] = useState<{
    file: File;
    metadata: AudioMetadata;
  } | null>(null);

  useEffect(() => {
    if (!file) return;

    let cancelled = false;
    const context = new AudioContext();

    file
      .arrayBuffer()
      .then((buffer) => context.decodeAudioData(buffer))
      .then((decoded) => {
        if (cancelled) return;
        setResolved({
          file,
          metadata: {
            duration: formatDuration(decoded.duration),
            sampleRate: formatSampleRate(decoded.sampleRate),
          },
        });
      })
      // An undecodable sample is still uploadable — the card just goes without.
      .catch(() => {})
      .finally(() => void context.close());

    return () => {
      cancelled = true;
    };
  }, [file]);

  return resolved?.file === file ? resolved.metadata : null;
}
