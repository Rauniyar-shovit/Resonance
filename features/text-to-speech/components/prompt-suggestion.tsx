"use client";

import { EYEBROW } from "@/lib/typography";

const PROMPT_SUGGESTIONS: {
  label: string;
  prompt: string;
}[] = [
  {
    label: "Narrate a story",
    prompt:
      "In a village tucked between mist-covered mountains, there lived an old clockmaker whose clocks never told the right time — but they always told the truth. One rainy evening, a stranger walked in and asked for a clock that could show him his future.",
  },
  {
    label: "Tell a silly joke",
    prompt:
      "Why don't scientists trust atoms? Because they make up everything! And honestly, I once asked an atom if it was positive about that — it said it had lost an electron. I said, are you sure? It replied, I'm positive!",
  },
  {
    label: "Record an advertisement",
    prompt:
      "Introducing BrightBean Coffee — the smoothest roast you'll ever taste. Sourced from high-altitude farms, slow-roasted to perfection, and delivered fresh to your door every single week. Wake up to something extraordinary. Try BrightBean today and get your first bag free.",
  },
  {
    label: "Speak another language",
    prompt:
      "Hello and welcome! Today we're going on a journey around the world. Bonjour, comment allez-vous? Hola, bienvenidos a todos. Guten Tag, willkommen bei uns. Ciao a tutti, benvenuti. Let's celebrate the beauty of language together.",
  },
  {
    label: "Direct a movie scene",
    prompt:
      "The rain hammered against the window as she turned to face him. You knew, didn't you? she whispered, her voice barely holding together. He stepped forward, jaw clenched. I did what I had to do. The silence between them was louder than the storm outside.",
  },
  {
    label: "Voice a game character",
    prompt:
      "Listen up, adventurer. The realm of Ashenvale is crumbling, and the Crystal of Eternity has been shattered into seven pieces. You are the only one who can reassemble it. Gather your courage, sharpen your blade, and meet me at the Gates of Dawn. Time is not on our side.",
  },
  {
    label: "Introduce your podcast",
    prompt:
      "Hey everyone, welcome back to another episode of The Curious Mind — the podcast where we dig into the stories, science, and strange ideas that shape our world. I'm your host, and today we have an incredible guest who's going to challenge everything you thought you knew.",
  },
  {
    label: "Guide a meditation class",
    prompt:
      "Close your eyes and take a deep breath in. Hold it gently... and release. Feel the weight of the day slowly melting away. With each breath, you're sinking deeper into calm. There is nowhere else you need to be. Just here. Just now. Breathe in peace, breathe out tension.",
  },
];

export const PromptSuggestion = ({
  onSelect,
  disabled,
}: {
  onSelect: (prompt: string) => void;
  disabled?: boolean;
}) => {
  return (
    <div className="flex shrink-0 flex-col gap-3">
      <p className={EYEBROW}>Get started with</p>

      <div className="flex flex-wrap gap-2">
        {PROMPT_SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion.label}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(suggestion.prompt)}
            className="h-8 shrink-0 rounded-xl border border-foreground/10 px-3.5 text-[13px] font-medium whitespace-nowrap transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-50"
          >
            {suggestion.label}
          </button>
        ))}
      </div>
    </div>
  );
};
