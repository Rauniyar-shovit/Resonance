"use client";

import { SignUp } from "@clerk/nextjs";

import { useIsDarkTheme } from "@/components/theme-toggle";
import { clerkVariables } from "@/lib/clerk-appearance";

/**
 * Clerk's stylesheet is specific enough to beat a bare utility class, so every
 * override carries Tailwind's `!` marker.
 *
 * These classes read `--card`, `--border` and the rest live, so everything named
 * here follows the `.dark` switch on <html> on its own. They cannot reach Clerk's
 * internals, though — hashed elements, hover washes, placeholders, focus rings —
 * which is what `clerkVariables` is for.
 */
const MONO_LABEL =
  "font-mono! text-[11px]! uppercase! tracking-[0.14em]! text-muted-foreground!";

const OUTLINE_BUTTON =
  "h-10! rounded-xl! border! border-foreground/10! bg-transparent! text-sm! font-medium! text-foreground! shadow-none! hover:bg-muted!";

const ELEMENTS = {
  cardBox: "rounded-2xl! border-none! shadow-none!",
  card: "rounded-2xl! border! border-foreground/10! bg-card! shadow-none!",
  header: "gap-2!",
  headerTitle:
    "text-[26px]! font-semibold! leading-[1.05]! tracking-[-0.035em]! text-foreground!",
  headerSubtitle: "text-[15px]! leading-[1.6]! text-muted-foreground!",

  socialButtonsBlockButton: OUTLINE_BUTTON,
  socialButtonsBlockButtonText: "text-sm! font-medium!",
  socialButtonsIconButton:
    "size-10! rounded-xl! border! border-foreground/10! bg-transparent! shadow-none! hover:bg-muted!",

  dividerLine: "bg-border!",
  dividerText: MONO_LABEL,

  formFieldLabel: MONO_LABEL,
  formFieldInput:
    "h-10! rounded-xl! border! border-foreground/10! bg-card! px-3.5! text-[15px]! text-foreground! shadow-none!",
  formFieldInputShowPasswordButton:
    "text-muted-foreground! hover:text-foreground!",
  formFieldAction: "text-[13px]! text-muted-foreground! hover:text-foreground!",
  formFieldHintText: "text-[13px]! text-muted-foreground!",
  formFieldErrorText: "text-[13px]! text-destructive!",
  // Clerk paints a gloss over its primary button; the workspace's is flat.
  formButtonPrimary:
    "h-10! rounded-xl! bg-primary! text-sm! font-medium! normal-case! tracking-normal! text-primary-foreground! shadow-none! after:hidden! hover:bg-primary! hover:opacity-88!",
  formButtonReset: OUTLINE_BUTTON,
  formResendCodeLink:
    "text-[13px]! font-medium! text-foreground! hover:text-muted-foreground!",

  // The verification step the sign-up flow lands on after the form.
  otpCodeFieldInput:
    "size-12! rounded-xl! border! border-foreground/10! bg-card! font-mono! text-foreground! shadow-none!",
  identityPreview:
    "rounded-xl! border! border-foreground/10! bg-muted! shadow-none!",
  identityPreviewText: "text-[15px]! text-foreground!",
  identityPreviewEditButton: "text-muted-foreground! hover:text-foreground!",

  alert: "rounded-xl! border! border-foreground/10! bg-muted! shadow-none!",
  alertText: "text-[13px]! text-foreground!",

  footer: "border-t! border-border! bg-transparent!",
  footerActionText: "text-[13px]! text-muted-foreground!",
  footerActionLink:
    "text-[13px]! font-medium! text-foreground! no-underline! hover:text-muted-foreground!",
  footerPagesLink: `${MONO_LABEL} hover:text-foreground!`,
  spinner: "text-foreground!",
};

const SignUpPage = () => {
  const dark = useIsDarkTheme();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5 py-12">
      <SignUp
        appearance={{
          variables: clerkVariables(dark),
          elements: ELEMENTS,
        }}
      />
    </div>
  );
};

export default SignUpPage;
