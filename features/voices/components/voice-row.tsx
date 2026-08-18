import Link from "next/link";
import { Mic, MoreHorizontal, Pause, Play, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { Waveform } from "@/components/waveform";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";
import { VOICE_CATEGORY_LABELS } from "@/features/voices/data/voice-categories";
import { useAudioPlayback } from "@/hooks/use-audio-playback";
import { useTRPC } from "@/trpc/client";
import { useState } from "react";

export type VoiceItem =
  inferRouterOutputs<AppRouter>["voices"]["getAll"]["custom"][number];

interface VoiceRowProps {
  voice: VoiceItem;
  /** Position in the list — only the glyph uses it, so each row draws its own bars. */
  index: number;
}

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

/**
 * `en-US` reads as a mono `US` in the row, with the spelled-out region on hover.
 * The code keeps the metadata column narrow enough to sit beside the description.
 */
function parseLanguage(locale: string) {
  const [, country] = locale.split("-");
  if (!country) return { code: locale.toUpperCase(), region: locale };

  const code = country.toUpperCase();

  return { code, region: regionNames.of(code) ?? code };
}

export function VoiceRow({ voice, index }: VoiceRowProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { code, region } = parseLanguage(voice.language);

  const audioSrc = `/api/voices/${encodeURIComponent(voice.id)}`;
  const { isPlaying, isLoading, togglePlay } = useAudioPlayback(audioSrc);

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    trpc.voices.delete.mutationOptions({
      onSuccess: () => {
        toast.success("Voice deleted successfully");
        queryClient.invalidateQueries({
          queryKey: trpc.voices.getAll.queryKey(),
        });
      },
      onError: (error) => {
        toast.error(error.message ?? "Failed to delete voice");
      },
    }),
  );

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3.5 border-t border-border px-2 py-[18px] transition-colors hover:bg-muted/40">
      <Waveform
        count={5}
        seed={0.9 + index * 0.27}
        className="h-8 w-10 shrink-0 justify-center"
        barClassName="bg-foreground/30"
      />

      <div className="flex min-w-[120px] shrink-0 basis-[152px] flex-col gap-1">
        <span className="truncate text-base font-semibold tracking-[-0.02em]">
          {voice.name}
        </span>
        <span className="truncate font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          {VOICE_CATEGORY_LABELS[voice.category]}
        </span>
      </div>

      <p className="min-w-0 max-w-[52ch] flex-1 basis-[300px] text-pretty text-[15px] leading-[1.6] text-muted-foreground">
        {voice.description}
      </p>

      <span
        title={region}
        className="shrink-0 font-mono text-xs text-muted-foreground"
      >
        {code}
      </span>

      <div className="ml-auto flex shrink-0 items-center gap-2">
        <Button
          variant="outline"
          size="icon-lg"
          aria-label={isPlaying ? `Pause ${voice.name}` : `Play ${voice.name}`}
          className="size-10 rounded-xl border-foreground/10 bg-transparent hover:border-primary hover:bg-primary hover:text-primary-foreground"
          onClick={togglePlay}
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner className="size-4" />
          ) : isPlaying ? (
            <Pause className="size-3.5 fill-current" />
          ) : (
            <Play className="size-3.5 fill-current" />
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="outline"
                size="icon-lg"
                aria-label={`More options for ${voice.name}`}
                className="size-10 rounded-xl border-foreground/10 bg-transparent text-muted-foreground hover:text-foreground"
              />
            }
          >
            <MoreHorizontal className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              render={
                <Link href={`/dashboard/text-to-speech?voiceId=${voice.id}`} />
              }
            >
              <Mic className="size-4 text-foreground" />
              <span className="font-medium">Use this voice</span>
            </DropdownMenuItem>
            {voice.variant === "CUSTOM" && (
              <DropdownMenuItem
                onClick={() => setShowDeleteDialog(true)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="size-4 text-destructive" />
                <span className="font-medium">Delete voice</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {voice.variant === "CUSTOM" && (
          <AlertDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete voice</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete &quot;{voice.name}&quot;? This
                  action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={deleteMutation.isPending}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  disabled={deleteMutation.isPending}
                  onClick={(e) => {
                    e.preventDefault();
                    deleteMutation.mutate(
                      { id: voice.id },
                      { onSuccess: () => setShowDeleteDialog(false) },
                    );
                  }}
                >
                  {deleteMutation.isPending ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
}
