"use client";

import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { useDropzone } from "react-dropzone";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AudioLines, Check, ChevronsUpDown, FolderOpen } from "lucide-react";
import locales from "locale-codes";

import { cn } from "@/lib/utils";
import { formatDollars } from "@/lib/currency";
import { EYEBROW } from "@/lib/typography";
import { useTRPC } from "@/trpc/client";
import { VOICE_GENERATION_COST } from "@/features/text-to-speech/data/constants";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError } from "@/components/ui/field";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  VOICE_CATEGORIES,
  VOICE_CATEGORY_LABELS,
} from "@/features/voices/data/voice-categories";
import {
  VOICE_DESCRIPTION_MAX_LENGTH,
  VOICE_SAMPLE_MAX_BYTES,
} from "@/features/voices/data/constants";
import { VoiceRecorder } from "./voice-recorder";
import { VoiceSampleCard } from "./voice-sample-card";

const LANGUAGE_OPTIONS = locales.all
  .filter((l) => l.tag && l.tag.includes("-") && l.name)
  .map((l) => ({
    value: l.tag,
    label: l.location ? `${l.name} (${l.location})` : l.name,
  }));

/** Every control in the sheet sits on the same 40px rounded-xl rail. */
const CONTROL =
  "h-10 rounded-xl border-foreground/10 bg-card text-[15px] md:text-[15px]";

/** Upload/Record read as a mono rule across the sheet, not as a pill. */
const TAB =
  "h-full flex-1 rounded-none font-mono text-[11px] uppercase tracking-[0.14em] group-data-horizontal/tabs:after:-bottom-px";

const voiceCreateFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  file: z
    .instanceof(File, { message: "An audio file is required" })
    .nullable()
    .refine((f) => f !== null, "An audio file is required"),
  category: z.string().min(1, "A category is required"),
  language: z.string().min(1, "A language is required"),
  description: z.string().max(VOICE_DESCRIPTION_MAX_LENGTH),
});

/** Mono, wide-tracked label sitting above each control. */
const FieldLabel = ({
  children,
  htmlFor,
  trailing,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  trailing?: React.ReactNode;
}) => (
  <div className="flex items-baseline justify-between gap-3">
    <label htmlFor={htmlFor} className={EYEBROW}>
      {children}
    </label>
    {trailing}
  </div>
);

function FileDropzone({
  file,
  onFileChange,
  isInvalid,
}: {
  file: File | null;
  onFileChange: (file: File | null) => void;
  isInvalid?: boolean;
}) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: { "audio/*": [] },
      maxSize: VOICE_SAMPLE_MAX_BYTES,
      multiple: false,
      onDrop: (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
          onFileChange(acceptedFiles[0]);
        }
      },
    });

  if (file) {
    return <VoiceSampleCard file={file} onRemove={() => onFileChange(null)} />;
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-xl border border-foreground/10 bg-card px-6 py-10 transition-colors",
        isDragReject || isInvalid
          ? "border-destructive"
          : isDragActive
            ? "border-primary"
            : "",
      )}
    >
      <input {...getInputProps()} />
      <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
        <AudioLines className="size-5 text-muted-foreground" />
      </div>

      <div className="flex flex-col items-center gap-1.5">
        <p className="text-base font-semibold tracking-[-0.02em]">
          Upload your audio file
        </p>

        <p className="text-center text-[15px] leading-[1.6] text-muted-foreground">
          Supports all audio formats, max size 4 MB
        </p>
      </div>

      <Button
        type="button"
        variant="outline"
        className="h-9 rounded-xl border-foreground/10 px-4"
      >
        <FolderOpen className="size-3.5" />
        Upload file
      </Button>
    </div>
  );
}

function LanguageCombobox({
  value,
  onChange,
  isInvalid,
}: {
  value: string;
  onChange: (value: string) => void;
  isInvalid?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const selectedLabel =
    LANGUAGE_OPTIONS.find((l) => l.value === value)?.label ?? "";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-invalid={isInvalid}
            className={cn(
              CONTROL,
              "w-full justify-between px-3.5 font-normal",
              !value && "text-muted-foreground",
            )}
          />
        }
      >
        <span className="truncate">
          {value ? selectedLabel : "Select language..."}
        </span>
        <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
      </PopoverTrigger>
      <PopoverContent className="w-(--anchor-width) p-0">
        <Command>
          <CommandInput placeholder="Search language..." />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {LANGUAGE_OPTIONS.map((lang) => (
                <CommandItem
                  key={lang.value}
                  value={lang.label}
                  onSelect={() => {
                    onChange(lang.value);
                    setOpen(false);
                  }}
                >
                  {lang.label}
                  <Check
                    className={cn(
                      "ml-auto size-4",
                      value === lang.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

interface VoiceCreateFormProps {
  scrollable?: boolean;
  footer?: (submit: React.ReactNode) => React.ReactNode;
  onError?: (message: string) => void;
}

export function VoiceCreateForm({
  scrollable,
  footer,
  onError,
}: VoiceCreateFormProps) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async ({
      name,
      file,
      category,
      language,
      description,
    }: {
      name: string;
      file: File;
      category: string;
      language: string;
      description?: string;
    }) => {
      const params = new URLSearchParams({
        name,
        category,
        language,
      });
      if (description) {
        params.set("description", description);
      }

      const response = await fetch(`/api/voices/create?${params.toString()}`, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.error ?? "Failed to create voice");
      }

      return response.json();
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      file: null as File | null,
      category: "GENERAL" as string,
      language: "en-US",
      description: "",
    },
    validators: {
      onSubmit: voiceCreateFormSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await createMutation.mutateAsync({
          name: value.name,
          file: value.file!,
          category: value.category,
          language: value.language,
          description: value.description || undefined,
        });

        toast.success("Voice created successfully!");
        queryClient.invalidateQueries({
          queryKey: trpc.voices.getAll.queryKey(),
        });
        form.reset();
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to create voice";

        if (onError) {
          onError(message);
        } else {
          toast.error(message);
        }
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className={cn("flex flex-col", scrollable ? "min-h-0 flex-1" : "gap-6")}
    >
      <div
        className={cn(
          "flex flex-col gap-6",
          scrollable && "no-scrollbar min-h-0 flex-1 overflow-y-auto px-4",
        )}
      >
        <form.Field name="file">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid} className="gap-2.5">
                <FieldLabel>Source</FieldLabel>

                <Tabs defaultValue="upload" className="gap-4">
                  {/* The prefixed variants have to match the ones baked into the
                      primitive, or the primitive's own height and rule offset win. */}
                  <TabsList
                    variant="line"
                    className="w-full gap-0 border-b border-border p-0 group-data-horizontal/tabs:h-10"
                  >
                    <TabsTrigger value="upload" className={TAB}>
                      Upload
                    </TabsTrigger>
                    <TabsTrigger value="record" className={TAB}>
                      Record
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="upload">
                    <FileDropzone
                      file={field.state.value}
                      onFileChange={field.handleChange}
                      isInvalid={isInvalid}
                    />
                  </TabsContent>
                  <TabsContent value="record">
                    <VoiceRecorder
                      file={field.state.value}
                      onFileChange={field.handleChange}
                      isInvalid={isInvalid}
                    />
                  </TabsContent>
                </Tabs>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="name">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid} className="gap-2">
                <FieldLabel htmlFor={field.name}>Voice name</FieldLabel>
                <Input
                  id={field.name}
                  placeholder="Aaron"
                  aria-invalid={isInvalid}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className={cn(CONTROL, "px-3.5")}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <div className="flex flex-wrap gap-4">
          <form.Field name="category">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field
                  data-invalid={isInvalid}
                  className="min-w-45 flex-1 basis-50 gap-2"
                >
                  <FieldLabel>Category</FieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value ?? "")}
                  >
                    <SelectTrigger className={cn(CONTROL, "w-full px-3.5")}>
                      <SelectValue placeholder="Select category..." />
                    </SelectTrigger>
                    <SelectContent>
                      {VOICE_CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {VOICE_CATEGORY_LABELS[cat]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="language">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field
                  data-invalid={isInvalid}
                  className="min-w-45 flex-1 basis-50 gap-2"
                >
                  <FieldLabel>Language</FieldLabel>
                  <LanguageCombobox
                    value={field.state.value}
                    onChange={field.handleChange}
                    isInvalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </div>

        <form.Field name="description">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid} className="gap-2">
                <FieldLabel
                  htmlFor={field.name}
                  trailing={
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {field.state.value.length} /{" "}
                      {VOICE_DESCRIPTION_MAX_LENGTH}
                    </span>
                  }
                >
                  Description
                </FieldLabel>
                <Textarea
                  id={field.name}
                  placeholder="Soothing and calm, like a self-help audiobook narrator."
                  aria-invalid={isInvalid}
                  maxLength={VOICE_DESCRIPTION_MAX_LENGTH}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className="min-h-20 rounded-xl border-foreground/10 bg-card px-3.5 py-3 text-[15px] leading-[1.6] md:text-[15px]"
                  rows={3}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Subscribe
          selector={(s) => ({
            isSubmitting: s.isSubmitting,
          })}
        >
          {({ isSubmitting }) => {
            const submitButton = (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-9 flex-1 rounded-xl"
              >
                {isSubmitting
                  ? "Creating…"
                  : `Create voice — ${formatDollars(VOICE_GENERATION_COST)}`}
              </Button>
            );

            return footer ? footer(submitButton) : submitButton;
          }}
        </form.Subscribe>
      </div>
    </form>
  );
}
