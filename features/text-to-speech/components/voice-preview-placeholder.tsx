import { buttonVariants } from "@/components/ui/button";
import { Waveform } from "@/components/waveform";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const VoicePreviewPlaceholder = () => {
  return (
    <div className="hidden min-h-0 shrink-0 grow-0 basis-2/5 flex-col items-center justify-center gap-4 overflow-hidden border-t border-border px-[clamp(20px,3vw,32px)] py-6 text-center lg:flex">
      <Waveform
        count={40}
        seed={0.61}
        className="h-12"
        barClassName="bg-foreground/15"
      />

      <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
        Preview will appear here.
      </h2>

      <p className="max-w-[44ch] text-pretty text-[15px] leading-[1.6] text-muted-foreground">
        Once you generate, the audio result plays here with its waveform,
        duration, and download.
      </p>
    </div>
  );
};
