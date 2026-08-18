"use client";

import { DrawerTrigger } from "@/components/ui/drawer";
import { VoiceAvatar } from "@/components/voice-avatar/voice-avatar";
import { useTypedAppFormContext } from "@/hooks/use-app-form";
import { useSelector } from "@tanstack/react-form";
import { ChevronDown } from "lucide-react";
import { useTTSVoices } from "../contexts/tts-voices-context";
import { ttsFormOptions } from "./text-to-speech-form";

export const VoiceSelectorButton = () => {
  const { allVoices } = useTTSVoices();

  const form = useTypedAppFormContext(ttsFormOptions);
  const voiceId = useSelector(form.store, (s) => s.values.voiceId);

  const currentVoice = allVoices.find((v) => v.id === voiceId) ?? allVoices[0];

  const buttonLabel = currentVoice?.name ?? "Select Voice";

  return (
    <DrawerTrigger className="flex h-9 flex-1 items-center gap-2.5 rounded-xl border border-foreground/10 bg-card px-3 text-left transition-colors hover:border-foreground/25">
      {currentVoice && (
        <VoiceAvatar
          seed={currentVoice.id}
          name={currentVoice.name}
          className="size-5"
        />
      )}
      <span className="flex-1 truncate text-sm font-medium">{buttonLabel}</span>
      <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
    </DrawerTrigger>
  );
};
