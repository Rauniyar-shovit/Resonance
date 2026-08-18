import { Mic, Square } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAudioRecorder } from "@/features/voices/hooks/use-audio-recorder";
import { VoiceSampleCard } from "./voice-sample-card";

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function VoiceRecorder({
  file,
  onFileChange,
  isInvalid,
}: {
  file: File | null;
  onFileChange: (file: File | null) => void;
  isInvalid?: boolean;
}) {
  const {
    isRecording,
    elapsedTime,
    containerRef,
    error,
    startRecording,
    stopRecording,
    resetRecording,
  } = useAudioRecorder();

  const handleStop = () => {
    stopRecording((blob) => {
      const recordedFile = new File([blob], "recording.wav", {
        type: "audio/wav",
      });
      onFileChange(recordedFile);
    });
  };

  const handleReRecord = () => {
    onFileChange(null);
    resetRecording();
  };

  if (error) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-destructive/50 bg-destructive/5 px-6 py-10">
        <p className="text-center text-[15px] leading-[1.6] text-destructive">
          {error}
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={resetRecording}
          className="h-9 rounded-xl border-foreground/10 px-4"
        >
          Try again
        </Button>
      </div>
    );
  }

  if (file) {
    return (
      <VoiceSampleCard
        file={file}
        onRemove={handleReRecord}
        onRerecord={handleReRecord}
      />
    );
  }

  if (isRecording) {
    return (
      <div className="flex flex-col overflow-hidden rounded-xl border border-foreground/10 bg-card">
        <div ref={containerRef} className="w-full" />
        <div className="flex items-center justify-between border-t p-4">
          <p className="text-[28px] font-semibold leading-[1.2] tracking-tight">
            {formatTime(elapsedTime)}
          </p>
          <Button
            type="button"
            variant="destructive"
            onClick={handleStop}
            className="h-9 rounded-xl px-4"
          >
            <Square className="size-3" />
            Stop
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 overflow-hidden rounded-xl border border-foreground/10 bg-card px-6 py-10",
        isInvalid && "border-destructive",
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
        <Mic className="size-5 text-muted-foreground" />
      </div>

      <div className="flex flex-col items-center gap-1.5">
        <p className="text-base font-semibold tracking-[-0.02em]">
          Record your voice
        </p>
        <p className="text-center text-[15px] leading-[1.6] text-muted-foreground">
          Five seconds of clean audio is enough to clone one.
        </p>
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={startRecording}
        className="h-9 rounded-xl border-foreground/10 px-4"
      >
        <Mic className="size-3.5" />
        Record
      </Button>
    </div>
  );
}
