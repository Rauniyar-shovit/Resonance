import Link from "next/link";
import { GenerationControls } from "@/features/landing/components/generation-controls";
import { PricingSection } from "@/features/landing/components/pricing-section";
import { ThemeToggle } from "@/features/landing/components/theme-toggle";
import { VoiceSampler } from "@/features/landing/components/voice-sampler";
import {
  CATEGORY_LABELS,
  FAQS,
  STEPS,
  USE_CASES,
} from "@/features/landing/data/landing-content";

const SHELL = "mx-auto max-w-[1180px] px-[clamp(20px,4vw,40px)]";
const SECTION = `${SHELL} py-[clamp(72px,9vw,140px)]`;
const HEADING =
  "text-[clamp(2rem,3.8vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.035em]";
const EYEBROW = "font-mono text-[11px] tracking-[0.12em] text-muted-foreground";

/** The five-bar wordmark, sized by the caller. */
const Wordmark = ({ height }: { height: number }) => {
  const scale = height / 15;
  return (
    <span
      className="flex items-end gap-0.5"
      style={{ height: `${height}px` }}
      aria-hidden
    >
      {[6, 13, 9, 15, 5].map((bar, index) => (
        <span
          key={index}
          className={index === 2 ? "bg-(--lp-accent)" : "bg-foreground"}
          style={{ width: "1.5px", height: `${bar * scale}px` }}
        />
      ))}
    </span>
  );
};

/** Repeating tick marks used as a section divider — a ruler, not a rule. */
const Divider = () => (
  <div className={SHELL}>
    <div className="relative h-7 overflow-hidden opacity-[0.22]">
      <div className="absolute inset-x-0 top-2.75 h-1.5 bg-[repeating-linear-gradient(90deg,var(--foreground)_0_1px,transparent_1px_6px)]" />
      <div className="absolute inset-x-0 top-1.5 h-4 bg-[repeating-linear-gradient(90deg,var(--foreground)_0_1px,transparent_1px_19px)]" />
      <div className="absolute inset-x-0 top-0 h-7 bg-[repeating-linear-gradient(90deg,var(--foreground)_0_1px,transparent_1px_53px)]" />
    </div>
  </div>
);

const ScriptCard = ({ script }: { script: string }) => (
  <div className="rounded-xl border border-border bg-card p-[clamp(20px,2.5vw,28px)]">
    <div className="mb-3.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
      Sample script
    </div>
    <p className="font-mono text-[13.5px] leading-[1.75]">{script}</p>
  </div>
);

export const LandingView = () => {
  const [narrate, ad, movie, ...compact] = USE_CASES;

  return (
    <div className="min-h-screen bg-background text-foreground [--lp-accent:var(--chart-1)] dark:[--lp-accent:var(--chart-2)]">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-[14px]">
        <div
          className={`${SHELL} flex h-16 items-center justify-between gap-6`}
        >
          <Link href="#top" className="flex items-center gap-2.5">
            <Wordmark height={15} />
            <span className="text-[15px] font-semibold tracking-[-0.02em]">
              Resonance
            </span>
          </Link>
          <nav className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/sign-in"
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="rounded-[9px] bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section
          className={`${SHELL} pt-[clamp(64px,9vw,132px)] pb-[clamp(48px,6vw,88px)]`}
        >
          <p className="mb-[clamp(24px,3vw,40px)] font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            AI voice generation for teams
          </p>
          <h1 className="max-w-[16ch] text-[clamp(2.75rem,7.2vw,5.75rem)] font-semibold leading-[0.96] tracking-[-0.045em]">
            A voice your whole team can use.
          </h1>
          <p className="mt-[clamp(24px,3vw,36px)] max-w-[56ch] text-[clamp(1.0625rem,1.5vw,1.3125rem)] leading-[1.55] text-muted-foreground">
            Clone a voice from ten seconds of audio. Generate up to 5,000
            characters at a time. Every voice and every generation lives in your
            organization&rsquo;s workspace — not locked to one account.
          </p>
          <div className="mt-[clamp(32px,4vw,44px)] flex flex-wrap gap-3">
            <Link
              href="/sign-up"
              className="rounded-[10px] bg-foreground px-6.5 py-3.5 text-[15px] font-medium text-background transition-opacity hover:opacity-85"
            >
              Get started
            </Link>
            <Link
              href="/sign-in"
              className="rounded-[10px] border border-border px-6.5 py-3.5 text-[15px] font-medium transition-colors hover:border-foreground"
            >
              Sign in
            </Link>
          </div>
          <VoiceSampler />
        </section>

        <Divider />

        {/* How it works */}
        <section className={SECTION}>
          <h2 className={`${HEADING} max-w-[18ch]`}>
            From a voice memo to a finished read.
          </h2>
          <div className="mt-[clamp(44px,5vw,72px)] grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[clamp(28px,4vw,56px)]">
            {STEPS.map((step, index) => (
              <div
                key={step.index}
                className={`border-t pt-5.5 ${index === 0 ? "border-foreground" : "border-border"}`}
              >
                <div className={EYEBROW}>{step.index}</div>
                <h3 className="mt-3.5 text-[1.375rem] font-semibold tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-muted-foreground">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-[clamp(36px,4vw,56px)] font-mono text-[11.5px] tracking-[0.06em] text-muted-foreground">
            Chatterbox Turbo, running on A10G GPUs.
          </p>
        </section>

        {/* Use cases */}
        <section className="border-y border-border bg-muted">
          <div className={SECTION}>
            <h2 className={`${HEADING} max-w-[16ch]`}>
              Six things teams do on day one.
            </h2>
            <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.6] text-muted-foreground">
              These six sit in the workspace as quick actions, scripts already
              written. Pick one, pick a voice, and hear it.
            </p>

            <div className="mt-[clamp(52px,6vw,88px)] flex flex-col gap-[clamp(48px,6vw,92px)]">
              {/* Three full-width rows, the middle one mirrored. */}
              {[narrate, ad, movie].map((useCase, index) => {
                const mirrored = index === 1;
                const copy = (
                  <div key="copy">
                    <div className={EYEBROW}>{useCase.index}</div>
                    <h3 className="mt-3.5 text-[clamp(1.5rem,2.4vw,2rem)] font-semibold tracking-[-0.028em]">
                      {useCase.title}
                    </h3>
                    <p className="mt-3.5 max-w-[44ch] text-base leading-[1.6] text-muted-foreground">
                      {useCase.description}
                    </p>
                  </div>
                );
                const card = <ScriptCard key="card" script={useCase.script} />;

                return (
                  <div
                    key={useCase.index}
                    className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-[clamp(24px,4vw,64px)]"
                  >
                    {mirrored ? [card, copy] : [copy, card]}
                  </div>
                );
              })}

              <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-px overflow-hidden rounded-xl border border-border bg-border">
                {compact.map((useCase) => (
                  <div
                    key={useCase.index}
                    className="flex flex-col gap-3 bg-background p-[clamp(22px,2.6vw,30px)]"
                  >
                    <div className={EYEBROW}>{useCase.index}</div>
                    <h3 className="text-xl font-semibold tracking-[-0.022em]">
                      {useCase.title}
                    </h3>
                    <p className="text-[14.5px] leading-[1.6] text-muted-foreground">
                      {useCase.description}
                    </p>
                    <p className="mt-1.5 border-t border-border pt-4 font-mono text-[12.5px] leading-[1.7]">
                      {useCase.script}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Voice library */}
        <section className={SECTION}>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-[clamp(28px,4vw,64px)]">
            <div>
              <h2 className={`${HEADING} max-w-[14ch]`}>
                A library, not a list.
              </h2>
              <p className="mt-5 max-w-[46ch] text-[17px] leading-[1.6] text-muted-foreground">
                Resonance&rsquo;s system voices sit alongside the ones your
                organization creates, filed under twelve categories so the right
                read is two clicks away.
              </p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-px overflow-hidden rounded-xl border border-border bg-border">
              {CATEGORY_LABELS.map((label, index) => (
                <div key={label} className="bg-background px-5 py-4.5">
                  <span className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-1.5 text-[14.5px] font-medium">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* Generation controls */}
        <section className={SECTION}>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center gap-[clamp(32px,5vw,72px)]">
            <div>
              <h2 className={`${HEADING} max-w-[16ch]`}>
                The performance is yours to direct.
              </h2>
              <p className="mt-5 max-w-[46ch] text-[17px] leading-[1.6] text-muted-foreground">
                Most tools give you one voice and one reading of it. Resonance
                gives you four controls over how the line is actually delivered
                — and remembers every one of them per generation, so a take you
                liked can be run again exactly.
              </p>
              <Link
                href="/sign-up"
                className="mt-8 inline-block rounded-[10px] border border-border px-6 py-3.5 text-[15px] font-medium transition-colors hover:border-foreground"
              >
                Try the controls
              </Link>
            </div>
            <GenerationControls />
          </div>
        </section>

        {/* Pricing — brings its own section wrapper and copy. */}
        <PricingSection />

        {/* FAQ */}
        <section className={SECTION}>
          <h2 className={HEADING}>Questions.</h2>
          <div className="mt-[clamp(44px,5vw,72px)] grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-x-[clamp(32px,5vw,80px)] gap-y-[clamp(32px,4vw,56px)]">
            {FAQS.map((faq) => (
              <div key={faq.question} className="border-t border-border pt-5">
                <h3 className="text-[1.0625rem] font-semibold tracking-[-0.015em]">
                  {faq.question}
                </h3>
                <p className="mt-2.5 text-[15px] leading-[1.6] text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="border-t border-border">
          <div
            className={`${SHELL} flex flex-col items-center py-[clamp(80px,10vw,160px)] text-center`}
          >
            <h2 className="max-w-[18ch] text-[clamp(2.25rem,5.5vw,4.25rem)] font-semibold leading-none tracking-[-0.045em]">
              Ten seconds of audio is all it takes to start.
            </h2>
            <div className="mt-[clamp(32px,4vw,44px)] flex flex-wrap justify-center gap-3">
              <Link
                href="/sign-up"
                className="rounded-[10px] bg-foreground px-7 py-3.5 text-[15px] font-medium text-background transition-opacity hover:opacity-85"
              >
                Get started
              </Link>
              <Link
                href="/sign-in"
                className="rounded-[10px] border border-border px-7 py-3.5 text-[15px] font-medium transition-colors hover:border-foreground"
              >
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div
          className={`${SHELL} flex flex-wrap items-center justify-between gap-6 py-10`}
        >
          <div className="flex items-center gap-2.5">
            <Wordmark height={13} />
            <span className="text-sm font-semibold tracking-[-0.02em]">
              Resonance
            </span>
          </div>
          <div className="flex flex-wrap gap-5.5 text-[13.5px] text-muted-foreground">
            <Link href="/sign-in" className="hover:text-foreground">
              Sign in
            </Link>
            <Link href="/sign-up" className="hover:text-foreground">
              Create an account
            </Link>
            <Link href="/dashboard" className="hover:text-foreground">
              Dashboard
            </Link>
          </div>
          <div className="font-mono text-[11px] text-muted-foreground">
            Chatterbox Turbo · A10G
          </div>
        </div>
      </footer>
    </div>
  );
};
