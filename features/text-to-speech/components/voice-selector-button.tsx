"use client";

import { useTypedAppFormContext } from "@/hooks/use-app-form";
import { useTTSVoices } from "../contexts/tts-voices-context";
import { ttsFormOptions } from "./text-to-speech-form";
import { useSelector } from "@tanstack/react-form";
import { DrawerTrigger } from "@/components/ui/drawer";
import { VoiceAvatar } from "@/components/voice-avatar/voice-avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export const VoiceSelectorButton = () => {
  const { allVoices } = useTTSVoices();

  const form = useTypedAppFormContext(ttsFormOptions);
  const voiceId = useSelector(form.store, (s) => s.values.voiceId);

  const currentVoice = allVoices.find((v) => v.id === voiceId) ?? allVoices[0];

  const buttonLabel = currentVoice?.name ?? "Select Voice";

  return (
    <DrawerTrigger
      render={<Button variant="outline" size="sm" />}
      className="flex-1 justify-start gap-2 px-2"
    >
      {currentVoice && (
        <VoiceAvatar
          seed={currentVoice.id}
          name={currentVoice.name}
          className="size-6"
        />
      )}
      <span className="flex-1 truncate text-left text-sm font-medium">
        {buttonLabel}
      </span>
      <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
    </DrawerTrigger>
  );
};
