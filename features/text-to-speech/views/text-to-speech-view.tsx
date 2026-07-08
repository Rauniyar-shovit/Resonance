import React from "react";
import { TextInputPanel } from "../components/text-input-panel";

const TextToSpeechView = () => {
  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <div className="flex min-h-0 flex-1 flex-col">
        <TextInputPanel />
      </div>
    </div>
  );
};

export default TextToSpeechView;
