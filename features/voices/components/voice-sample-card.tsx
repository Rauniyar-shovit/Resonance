"use client";

import { Pause, Play, RotateCcw, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Waveform } from "@/components/waveform";
import { useAudioPlayback } from "@/hooks/use-audio-playback";
import { formatFileSize } from "@/lib/utils";
import { useAudioMetadata } from "../hooks/use-audio-metadata";

interface VoiceSampleCardProps {
  file: File;
  onRemove: () => void;
  /** Only the recorder offers this — an uploaded file is replaced, not retaken. */
  onRerecord?: () => void;
}

/**
 * The sample once it exists, stated the way a voice row states a voice: a waveform,
 * a name, and the specs underneath. Upload and record both land here, so a recording
 * and a dropped file read identically before either is charged for.
 */
export function VoiceSampleCard({
  file,
  onRemove,
  onRerecord,
}: VoiceSampleCardProps) {
  const { isPlaying, isLoading, togglePlay } = useAudioPlayback(file);
  const metadata = useAudioMetadata(file);

  const specs = [
    formatFileSize(file.size),
    metadata?.duration,
    metadata?.sampleRate,
  ].filter(Boolean);

  return (
    <div className="flex items-center gap-3.5 rounded-xl border border-foreground/10 bg-muted px-4 py-3.5">
      <Waveform
        count={14}
        seed={0.83}
        className="h-7 shrink-0"
        barClassName="bg-foreground/25"
      />

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="truncate font-mono text-[13px]">{file.name}</span>
        <span className="truncate font-mono text-[11px] text-muted-foreground">
          {specs.join(" · ")}
        </span>
      </div>

      <Button
        type="button"
        variant="outline"
        size="icon-lg"
        aria-label={isPlaying ? "Pause sample" : "Play sample"}
        onClick={togglePlay}
        disabled={isLoading}
        className="size-10 shrink-0 rounded-xl border-foreground/10 bg-transparent hover:border-primary hover:bg-primary hover:text-primary-foreground"
      >
        {isLoading ? (
          <Spinner className="size-4" />
        ) : isPlaying ? (
          <Pause className="size-3.5 fill-current" />
        ) : (
          <Play className="size-3.5 fill-current" />
        )}
      </Button>

      {onRerecord && (
        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          aria-label="Record again"
          onClick={onRerecord}
          className="size-10 shrink-0 rounded-xl border-foreground/10 bg-transparent text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="size-3.5" />
        </Button>
      )}

      <Button
        type="button"
        variant="outline"
        size="icon-lg"
        aria-label="Remove sample"
        onClick={onRemove}
        className="size-10 shrink-0 rounded-xl border-foreground/10 bg-transparent text-muted-foreground hover:text-foreground"
      >
        <X className="size-3.5" />
      </Button>
    </div>
  );
}
