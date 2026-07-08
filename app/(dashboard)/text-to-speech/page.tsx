import React from "react";

import type { Metadata } from "next";
import TextToSpeechView from "@/features/text-to-speech/views/text-to-speech-view";

export const metadata: Metadata = { title: "Text To Speech" };
const TextToSpeechPage = () => {
  return <TextToSpeechView />;
};

export default TextToSpeechPage;
