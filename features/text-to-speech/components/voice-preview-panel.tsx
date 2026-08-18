"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { VoiceAvatar } from "@/components/voice-avatar/voice-avatar";
import { EYEBROW } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Download, Pause, Play, Redo, Undo } from "lucide-react";
import { useState } from "react";
import { useWaveSurfer } from "../hooks/use-wavesurfer";

type VoicePreviewPanelVoice = {
  id?: string;
  name: string;
};

function formatTime(seconds: number): string {
  return format(new Date(seconds * 1000), "mm:ss");
}

export const VoicePreviewPanel = ({
  audioUrl,
  voice,
  text,
}: {
  audioUrl: string;
  voice: VoicePreviewPanelVoice | null;
  text: string;
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const selectedVoiceSeed = voice?.id ?? null;
  const selectedVoiceName = voice?.name ?? null;

  const {
    containerRef,
    isPlaying,
    isReady,
    currentTime,
    duration,
    togglePlayPause,
    seekBackward,
    seekForward,
  } = useWaveSurfer({
    url: audioUrl,
    autoplay: true,
  });

  const handleDownload = () => {
    setIsDownloading(true);

    const safeName =
      text
        .slice(0, 50)
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase() || "speech";

    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = `${safeName}.wav`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setIsDownloading(false), 1000);
  };

  return (
    <div className="hidden min-h-0 shrink-0 grow-0 basis-1/2 flex-col gap-6 overflow-hidden border-t border-border px-[clamp(20px,3vw,32px)] py-[clamp(20px,2.4vw,28px)] lg:flex">
      <p className={EYEBROW}>Voice preview</p>

      {/* waveform */}
      <div className="relative flex flex-1 items-center justify-center">
        {!isReady && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <Badge
              variant="outline"
              className="gap-2 rounded-xl border-foreground/10 bg-background/90 px-3 py-1.5 text-sm text-muted-foreground"
            >
              <Spinner className="size-4" />
              <span>Loading audio...</span>
            </Badge>
          </div>
        )}
        <div
          ref={containerRef}
          className={cn(
            "w-full cursor-pointer transition-opacity duration-200",
            !isReady && "opacity-0",
          )}
        />
      </div>

      <p className="text-center font-mono text-[clamp(1.5rem,2.6vw,2rem)] font-medium tracking-[-0.03em] tabular-nums">
        {formatTime(currentTime)}
        <span className="text-muted-foreground"> / {formatTime(duration)}</span>
      </p>

      {/* metadata, transport, download */}
      <div className="grid w-full grid-cols-3 items-center gap-4">
        <div className="flex min-w-0 flex-col gap-1.5">
          <span className="truncate text-sm font-medium">{text}</span>

          {selectedVoiceName && (
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
              <VoiceAvatar
                seed={selectedVoiceSeed ?? selectedVoiceName}
                name={selectedVoiceName}
                className="shrink-0"
              />
              <span className="truncate">{selectedVoiceName}</span>
            </span>
          )}
        </div>

        <div className="flex items-center justify-center gap-3">
          <Button
            variant="ghost"
            size="icon-lg"
            className="flex-col rounded-xl"
            onClick={() => seekBackward(10)}
            disabled={!isReady}
          >
            <Undo className="-mb-1 size-4" />
            <span className="text-[10px] font-medium">10</span>
          </Button>

          <Button
            variant="default"
            size="icon-lg"
            className="rounded-full"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <Pause className="fill-background" />
            ) : (
              <Play className="fill-background" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon-lg"
            className="flex-col rounded-xl"
            onClick={() => seekForward(10)}
            disabled={!isReady}
          >
            <Redo className="-mb-1 size-4" />
            <span className="text-[10px] font-medium">10</span>
          </Button>
        </div>

        <div className="flex justify-end">
          <Button
            variant="outline"
            size="lg"
            className="rounded-xl border-foreground/10 px-3.5"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            <Download className="size-4" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};
