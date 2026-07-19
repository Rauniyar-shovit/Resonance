"use client";
import { TextInputPanel } from "../components/text-input-panel";
import { VoicePreviewPlaceholder } from "../components/voice-preview-placeholder";
import { SettingsPanel } from "../components/settings-panel";
import {
  defaultTTSValues,
  TextToSpeechForm,
  type TTSFormValues,
} from "../components/text-to-speech-form";
import { useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { TTSVoicesProvider } from "../contexts/tts-voices-context";
import { VoicePreviewPanel } from "../components/voice-preview-panel";
import { VoicePreviewMobile } from "../components/voice-preview-mobile";

const TextToSpeechDetailView = ({ generationId }: { generationId: string }) => {
  const trpc = useTRPC();
  const [generationQuery, voicesQuery] = useSuspenseQueries({
    queries: [
      trpc.generations.getById.queryOptions({ id: generationId }),
      trpc.voices.getAll.queryOptions(),
    ],
  });

  const data = generationQuery.data;

  const { custom: customVoices, system: systemVoices } = voicesQuery.data;

  const allVoices = [...customVoices, ...systemVoices];
  const fallbackVoiceId = allVoices[0]?.id ?? "";

  // requested voice may no longer exist (deleted)

  const resolveVoiceId =
    data?.voiceId && allVoices.some((v) => v.id === data.voiceId)
      ? data.voiceId
      : fallbackVoiceId;

  const defaultValues: TTSFormValues = {
    text: data.text,
    voiceId: resolveVoiceId,
    temperature: data.temperature,
    topP: data.topP,
    topK: data.topK,
    repetitionPenalty: data.repetitionPenalty,
  };

  const generationVoice = {
    id: data.voiceId ?? undefined,
    name: data.voiceName,
  };

  return (
    <TTSVoicesProvider value={{ customVoices, systemVoices, allVoices }}>
      <TextToSpeechForm key={generationId} defaultValues={defaultValues}>
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <div className="flex min-h-0 flex-1 flex-col">
            <TextInputPanel />
            <VoicePreviewPanel
              audioUrl={data.audioUrl}
              voice={generationVoice}
              text={data.text}
            />
            <VoicePreviewMobile
              audioUrl={data.audioUrl}
              voice={generationVoice}
              text={data.text}
            />
          </div>
          <SettingsPanel />
        </div>
      </TextToSpeechForm>
    </TTSVoicesProvider>
  );
};

export default TextToSpeechDetailView;
