"use client";

import { Button } from "@/components/ui/button";
import { VoiceAvatar } from "@/components/voice-avatar/voice-avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Download, Pause, Play } from "lucide-react";
import { useRef, useState, useEffect } from "react";

type VoicePreviewMobileVoice = {
  id?: string;
  name: string;
};

export const VoicePreviewMobile = ({
  audioUrl,
  voice,
  text,
}: {
  audioUrl: string;
  voice: VoicePreviewMobileVoice | null;
  text: string;
}) => {
  const selectedVoiceSeed = voice?.id ?? null;
  const selectedVoiceName = voice?.name ?? null;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    audio.pause();
    audio.currentTime = 0;

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioUrl]);

  useEffect(() => {
    if (!isMobile) {
      audioRef.current?.pause();
    }
  }, [isMobile]);

  const tooglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  if (!audioUrl) return null;

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
  };

  return (
    <div className="border-t lg:hidden gap-4 p-4">
      <audio ref={audioRef} src={audioUrl} />
      <div className="grid grid-cols-[1fr_auto] items-center gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium ">{text}</p>
          {selectedVoiceName && (
            <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <VoiceAvatar
                seed={selectedVoiceSeed ?? selectedVoiceName}
                name={selectedVoiceName}
                className="shrink-0"
              />
              <span className="truncate"> {selectedVoiceName}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleDownload}>
            <Download className="size-4" />
            Download
          </Button>

          <Button
            variant={"default"}
            size={"icon"}
            className={"rounded-full "}
            onClick={tooglePlayPause}
          >
            {isPlaying ? (
              <Pause className="fill-background" />
            ) : (
              <Play className="fill-background" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
