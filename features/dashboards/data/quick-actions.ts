export interface QuickAction {
  /** Two-digit row marker, shown in the list gutter. */
  index: string;
  title: string;
  description: string;
  /** Rough length of the read, as m:ss. Illustrative, not measured. */
  duration: string;
  href: string;
}

export const quickActions: QuickAction[] = [
  {
    index: "01",
    title: "Narrate a story",
    description:
      "Long-form reading voice, even pacing, minimal expression drift.",
    duration: "0:18",
    href: "/dashboard/text-to-speech?text=In a village tucked between mist-covered mountains, there lived an old clockmaker whose clocks never told the right time — but they always told the truth. One rainy evening, a stranger walked in and asked for a clock that could show him his future.",
  },
  {
    index: "02",
    title: "Record an ad",
    description: "Thirty-second read with a hard close. Two takes per script.",
    duration: "0:12",
    href: "/dashboard/text-to-speech?text=Introducing BrightBean Coffee — the smoothest roast you'll ever taste. Sourced from high-altitude farms, slow-roasted to perfection, and delivered fresh to your door every single week. Wake up to something extraordinary. Try BrightBean today and get your first bag free.",
  },
  {
    index: "03",
    title: "Direct a movie scene",
    description:
      "Multi-speaker dialogue. Assign a cloned voice per character.",
    duration: "0:24",
    href: "/dashboard/text-to-speech?text=The rain hammered against the window as she turned to face him. You knew, didn't you? she whispered, her voice barely holding together. He stepped forward, jaw clenched. I did what I had to do. The silence between them was louder than the storm outside.",
  },
  {
    index: "04",
    title: "Voice a game character",
    description: "Short barks and callouts, batched from one line list.",
    duration: "0:09",
    href: "/dashboard/text-to-speech?text=Listen up, adventurer. The realm of Ashenvale is crumbling, and the Crystal of Eternity has been shattered into seven pieces. You are the only one who can reassemble it. Gather your courage, sharpen your blade, and meet me at the Gates of Dawn. Time is not on our side.",
  },
  {
    index: "05",
    title: "Introduce your podcast",
    description:
      "Cold open under fifteen seconds. Reuse the voice for every episode.",
    duration: "0:15",
    href: "/dashboard/text-to-speech?text=Hey everyone, welcome back to another episode of The Curious Mind — the podcast where we dig into the stories, science, and strange ideas that shape our world. I'm your host, and today we have an incredible guest who's going to challenge everything you thought you knew.",
  },
  {
    index: "06",
    title: "Guide a meditation",
    description: "Slow delivery with held pauses. Files up to 4 MB clone cleanly.",
    duration: "0:31",
    href: "/dashboard/text-to-speech?text=Close your eyes and take a deep breath in. Hold it gently... and release. Feel the weight of the day slowly melting away. With each breath, you're sinking deeper into calm. There is nowhere else you need to be. Just here. Just now. Breathe in peace, breathe out tension.",
  },
];
