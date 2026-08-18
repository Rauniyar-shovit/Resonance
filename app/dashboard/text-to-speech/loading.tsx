import { Skeleton } from "@/components/ui/skeleton";
import { VoicePreviewPlaceholder } from "@/features/text-to-speech/components/voice-preview-placeholder";

export default function Loading() {
  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex min-h-0 flex-col max-lg:flex-1 lg:grow-0 lg:shrink-0 lg:basis-3/5">
          <div className="flex min-h-0 flex-1 flex-col gap-6 px-[clamp(16px,3vw,32px)] py-[clamp(20px,3vw,36px)]">
            <div className="flex min-h-0 flex-1 flex-col gap-3">
              <Skeleton className="h-4 w-full max-w-160" />
              <Skeleton className="h-4 w-full max-w-140" />
              <Skeleton className="h-4 w-full max-w-120" />
            </div>

            <div className="flex flex-col gap-3">
              <Skeleton className="h-3 w-28" />
              <div className="flex flex-wrap gap-2">
                {["one", "two", "three", "four", "five"].map((chip) => (
                  <Skeleton key={chip} className="h-8 w-36 rounded-xl" />
                ))}
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-6 gap-y-3.5 border-t border-border bg-muted px-[clamp(16px,3vw,32px)] py-3.5">
            <Skeleton className="h-4 w-56" />
            <Skeleton className="h-9 w-full lg:w-36" />
          </div>
        </div>

        <VoicePreviewPlaceholder />
      </div>

      <div className="hidden w-105 min-h-0 flex-col border-l border-border lg:flex">
        <div className="grid h-13 shrink-0 grid-cols-2 items-center border-b border-border px-[clamp(16px,2.4vw,28px)]">
          <Skeleton className="h-3 w-20 justify-self-center" />
          <Skeleton className="h-3 w-20 justify-self-center" />
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto p-[clamp(16px,2.4vw,28px)]">
          <div className="flex flex-col gap-2.5">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>

          {["creativity", "variety", "range", "flow"].map((item) => (
            <div key={item} className="flex flex-col gap-3">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-0.5 w-full" />
              <Skeleton className="h-3 w-full max-w-56" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
