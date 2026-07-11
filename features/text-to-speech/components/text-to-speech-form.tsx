"use client";
import { z } from "zod";
import { useAppForm } from "@/hooks/use-app-form";
import { formOptions } from "@tanstack/react-form";
import { ReactNode } from "react";

const ttsFormSchema = z.object({
  text: z.string().min(1, "Please enter some text"),
  voiceId: z.string().min(1, "Please select a voice"),
  temperature: z.number(),
  topP: z.number(),
  topK: z.number(),
  repetitionPenalty: z.number(),
});

export type TTSFormValues = z.infer<typeof ttsFormSchema>;

export const defaultTTSValues: TTSFormValues = {
  text: "",
  voiceId: "",
  temperature: 0.8,
  topP: 0.95,
  topK: 1000,
  repetitionPenalty: 1.2,
};

export const ttsFormOptions = formOptions({
  defaultValues: defaultTTSValues,
});

export const TextToSpeechForm = ({
  children,
  defaultValues,
}: {
  children: ReactNode;
  defaultValues?: TTSFormValues;
}) => {
  const form = useAppForm({
    ...ttsFormOptions,
    defaultValues: defaultValues ?? defaultTTSValues,
    validators: {
      onSubmit: ttsFormSchema,
    },
    onSubmit: async (values) => {
      console.log(values);
      // generation logic will be added later
    },
  });

  return <form.AppForm> {children}</form.AppForm>;
};
