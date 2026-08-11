import { VOICE_CATEGORY_LABELS } from "@/features/voices/data/voice-categories";

/** The line every sampler voice reads, so the voices can be compared directly. */
export const SAMPLER_SCRIPT =
  "In a village tucked between mist-covered mountains, there lived an old clockmaker whose clocks never told the right time — but they always told the truth.";

export interface SamplerVoice {
  id: string;
  name: string;
  /** "Category · language", matching the seeded system voice metadata. */
  label: string;
  /** Seeds a deterministic waveform so the bars are stable across renders. */
  seed: number;
  /** Fallback duration used to animate progress when the audio file is absent. */
  duration: number;
}

/**
 * Four seeded system voices from `scripts/seed-system-voices.ts`. Audio is served
 * from `public/voices/<id>.wav`; if a file is missing the sampler degrades to a
 * silent, animated preview rather than breaking.
 *
 * `duration` is the real file length, shown as the timestamp before playback starts.
 * Once playing, the sampler reads `audio.duration` off the element instead.
 */
export const SAMPLER_VOICES: SamplerVoice[] = [
  { id: "walter", name: "Walter", label: "Narrative · en-US", seed: 1103, duration: 9.3 },
  { id: "abigail", name: "Abigail", label: "Conversational · en-GB", seed: 5711, duration: 8.7 },
  { id: "marisol", name: "Marisol", label: "Advertising · en-US", seed: 9137, duration: 8.4 },
  { id: "gavin", name: "Gavin", label: "Meditation · en-US", seed: 4483, duration: 8.3 },
];

export interface Step {
  index: string;
  title: string;
  body: string;
}

export const STEPS: Step[] = [
  {
    index: "01",
    title: "Upload a sample",
    body: "Ten seconds of clean audio is enough. Files up to 4 MB. The voice is created once and becomes available to everyone in the workspace.",
  },
  {
    index: "02",
    title: "Direct the read",
    body: "Write up to 5,000 characters, then shape how much the delivery varies, how focused it stays and how its cadence moves — until it's the read you wanted.",
  },
  {
    index: "03",
    title: "Generate and keep it",
    body: "Play it back on the waveform, download it, and find it again later. Full generation history is org-scoped, so nothing lives on one person's machine.",
  },
];

export interface UseCase {
  index: string;
  title: string;
  description: string;
  script: string;
}

/** Titles, descriptions and scripts mirror `features/dashboards/data/quick-actions.ts`. */
export const USE_CASES: UseCase[] = [
  {
    index: "01",
    title: "Narrate a Story",
    description: "Bring characters to life with expressive AI narration.",
    script:
      "In a village tucked between mist-covered mountains, there lived an old clockmaker whose clocks never told the right time — but they always told the truth. One rainy evening, a stranger walked in and asked for a clock that could show him his future.",
  },
  {
    index: "02",
    title: "Record an Ad",
    description: "Create professional advertisements with lifelike AI voices.",
    script:
      "Introducing BrightBean Coffee — the smoothest roast you'll ever taste. Sourced from high-altitude farms, slow-roasted to perfection, and delivered fresh to your door every single week. Wake up to something extraordinary. Try BrightBean today and get your first bag free.",
  },
  {
    index: "03",
    title: "Direct a Movie Scene",
    description: "Generate dramatic dialogue for film and video.",
    script:
      "The rain hammered against the window as she turned to face him. You knew, didn't you? she whispered, her voice barely holding together. He stepped forward, jaw clenched. I did what I had to do. The silence between them was louder than the storm outside.",
  },
  {
    index: "04",
    title: "Voice a Game Character",
    description: "Build immersive worlds with dynamic character voices.",
    script:
      "Listen up, adventurer. The realm of Ashenvale is crumbling, and the Crystal of Eternity has been shattered into seven pieces. You are the only one who can reassemble it. Gather your courage, sharpen your blade, and meet me at the Gates of Dawn.",
  },
  {
    index: "05",
    title: "Introduce Your Podcast",
    description: "Hook your listeners from the very first second.",
    script:
      "Hey everyone, welcome back to another episode of The Curious Mind — the podcast where we dig into the stories, science, and strange ideas that shape our world. I'm your host, and today we have an incredible guest.",
  },
  {
    index: "06",
    title: "Guide a Meditation",
    description: "Craft soothing, calming audio for wellness content.",
    script:
      "Close your eyes and take a deep breath in. Hold it gently... and release. Feel the weight of the day slowly melting away. With each breath, you're sinking deeper into calm. Just here. Just now.",
  },
];

/** Derived from the Prisma `VoiceCategory` enum so the page can't drift from the schema. */
export const CATEGORY_LABELS = Object.values(VOICE_CATEGORY_LABELS);

export interface PricingFeature {
  label: string;
}

export const PRICING_FEATURES: PricingFeature[] = [
  { label: "Unlimited members — no per-seat charge" },
  { label: "5,000 characters per generation" },
  { label: "Voice cloning from a 10-second, 4 MB sample" },
  { label: "Shared voice library across twelve categories" },
  { label: "Full generation history, org-scoped" },
  { label: "Creativity, Voice Variety, Expression Range and Natural Flow" },
];

export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: "How much audio do I need to clone a voice?",
    answer:
      "Ten seconds or more, in a file up to 4 MB. Cleaner input gives a cleaner voice, but you don't need a studio session.",
  },
  {
    question: "Who can use a voice once it exists?",
    answer:
      "Everyone in the organization. Voices are org-scoped, not per-user, so one person's upload becomes the whole team's asset.",
  },
  {
    question: "How long can one generation be?",
    answer:
      "Up to 5,000 characters at a time. Longer pieces are generated in sequence and kept together in history.",
  },
  {
    question: "What control do I have over the output?",
    answer:
      "Creativity, Voice Variety, Expression Range and Natural Flow are all yours to set, and each one is stored with the generation so a good take can be reproduced.",
  },
  {
    question: "What's running underneath?",
    answer:
      "Chatterbox Turbo on A10G GPUs. It's the reason a 5,000-character generation comes back in the time it takes to read the script.",
  },
  {
    question: "How does billing work?",
    answer:
      "$0.30 per 1,000 characters generated, plus a per-voice fee when you create a custom voice. There are no seat fees.",
  },
  {
    question: "Can I find something I generated last month?",
    answer:
      "Yes. Every generation is kept in the workspace with its script, its voice and its settings, and plays back on the waveform.",
  },
  {
    question: "Is there a public API?",
    answer: "Not yet. Resonance is used through the web workspace today.",
  },
];
