import { TextToSpeechLayout } from "@/features/text-to-speech/views/text-to-speech-layout";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <TextToSpeechLayout>{children}</TextToSpeechLayout>;
};

export default Layout;
