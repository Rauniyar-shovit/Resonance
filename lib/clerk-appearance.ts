/**
 * The workspace palette, restated as sRGB for Clerk.
 *
 * Clerk paints its own internals — popover cards, hover washes, dividers, footers,
 * placeholders — from a palette handed to it rather than from the cascade, so a
 * Tailwind class on a named element cannot reach them. That is what this is for.
 *
 * The values are the exact sRGB equivalents of the tokens in `globals.css`. They
 * are restated rather than referenced because Clerk builds shades from
 * `colorPrimary` and `colorNeutral`, so those have to be colours its parser can
 * take apart, and `oklch()` is not a safe bet. If a token there moves, move its
 * twin here.
 */
const LIGHT = {
  colorBackground: "#ffffff",
  colorForeground: "#0e0e0e",
  colorPrimary: "#0e0e0e",
  colorPrimaryForeground: "#ffffff",
  colorNeutral: "#0e0e0e",
  colorMuted: "#f2f2f2",
  colorMutedForeground: "#808080",
  colorInput: "#ffffff",
  colorInputForeground: "#0e0e0e",
  colorBorder: "#e5e5e5",
  colorDanger: "#b22728",
  colorShadow: "#0e0e0e",
  colorModalBackdrop: "#0e0e0e",
};

const DARK = {
  colorBackground: "#171717",
  colorForeground: "#fafafa",
  colorPrimary: "#e5e5e5",
  colorPrimaryForeground: "#171717",
  // Light shades on a dark ground, so borders and hover washes stay visible.
  colorNeutral: "#ffffff",
  colorMuted: "#262626",
  colorMutedForeground: "#a1a1a1",
  colorInput: "#171717",
  colorInputForeground: "#fafafa",
  colorBorder: "#404040",
  colorDanger: "#ff6467",
  colorShadow: "#000000",
  colorModalBackdrop: "#0a0a0a",
};

/**
 * Type and font settings shared by every Clerk surface in the app.
 *
 * The App Router `ClerkProvider` is an async server component and cannot read a
 * preference that only exists in the browser, so the theme travels on each
 * component instead of being set once at the root.
 */
export const clerkVariables = (dark: boolean) => ({
  ...(dark ? DARK : LIGHT),
  fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
  fontFamilyMono: "var(--font-geist-mono), ui-monospace, monospace",
  borderRadius: "0.75rem",
  fontSize: "0.9375rem",
});

/**
 * Clerk's stylesheet is specific enough to beat a bare utility class, so every
 * override carries Tailwind's `!` marker. These classes read `--popover`,
 * `--border` and the rest live, so they follow the `.dark` switch on their own —
 * they sharpen what the palette above already got roughly right.
 */
const PANEL =
  "rounded-xl! border! border-border! bg-popover! shadow-lg! overflow-hidden!";

const ROW = "text-[13px]! text-foreground! hover:bg-muted!";

const FOOTER = "border-t! border-border! bg-muted!";

/** The menu behind the sidebar's workspace switcher. */
export const ORGANIZATION_POPOVER_ELEMENTS = {
  organizationSwitcherPopoverCard: PANEL,
  organizationSwitcherPopoverMain: "bg-popover!",
  organizationSwitcherPopoverActions: "bg-popover!",
  organizationSwitcherPopoverActionButton: ROW,
  organizationSwitcherPopoverActionButtonIconBox: "text-muted-foreground!",
  organizationSwitcherPopoverActionButtonIcon: "text-muted-foreground!",
  organizationSwitcherPreviewButton: ROW,
  organizationSwitcherPopoverFooter: FOOTER,
};

/** The menu behind the sidebar's avatar. */
export const USER_POPOVER_ELEMENTS = {
  userButtonPopoverCard: PANEL,
  userButtonPopoverMain: "bg-popover!",
  userButtonPopoverActions: "bg-popover!",
  userButtonPopoverActionButton: ROW,
  userButtonPopoverActionButtonIconBox: "text-muted-foreground!",
  userButtonPopoverActionButtonIcon: "text-muted-foreground!",
  userButtonPopoverFooter: FOOTER,
};

/**
 * Names and roles inside any preview row.
 *
 * Clerk colours these itself, for a light card, and a colour set on the element
 * beats one inherited from its container — so they have to be pinned or they sink
 * into whichever ground they land on.
 */
export const PREVIEW_TEXT_ELEMENTS = {
  organizationPreviewMainIdentifier: "text-foreground!",
  organizationPreviewSecondaryIdentifier: "text-muted-foreground!",
  userPreviewMainIdentifier: "text-foreground!",
  userPreviewMainIdentifierText: "text-foreground!",
  userPreviewSecondaryIdentifier: "text-muted-foreground!",
};

/**
 * The full-page profiles Clerk opens in a modal — "Manage" on the workspace
 * switcher, "Manage account" on the avatar.
 *
 * These mount separately from the control that opens them, so they inherit none of
 * its appearance and have to be handed their own through `organizationProfileProps`
 * / `userProfileProps`.
 */
export const PROFILE_MODAL_ELEMENTS = {
  ...PREVIEW_TEXT_ELEMENTS,

  // A dark scrim reads correctly under either theme; `--foreground` would invert
  // into a white veil over the dark workspace.
  modalBackdrop: "bg-black/50! backdrop-blur-xs!",
  modalContent: "rounded-2xl!",
  modalCloseButton:
    "rounded-lg! text-muted-foreground! hover:bg-muted! hover:text-foreground!",

  cardBox: "rounded-2xl! border! border-border! shadow-lg!",
  card: "bg-popover!",
  page: "bg-popover!",
  pageScrollBox: "bg-popover!",
  header: "gap-2!",
  headerTitle:
    "text-2xl! font-semibold! tracking-[-0.035em]! text-foreground!",
  headerSubtitle: "text-[15px]! leading-[1.6]! text-muted-foreground!",

  // The rail down the left of the modal.
  navbar: "border-r! border-border! bg-muted!",
  navbarButton: `${ROW} rounded-lg! font-medium!`,
  navbarButtonIcon: "text-muted-foreground!",
  navbarMobileMenuButton: "text-muted-foreground! hover:text-foreground!",

  profileSection: "border-border!",
  profileSectionTitleText: "text-[15px]! font-medium! text-foreground!",
  profileSectionSubtitleText: "text-[13px]! text-muted-foreground!",
  profileSectionPrimaryButton:
    "rounded-lg! text-[13px]! font-medium! text-foreground! hover:bg-muted!",
  profileSectionItem: "border-border!",

  formFieldLabel: "text-[13px]! font-medium! text-foreground!",
  formFieldInput:
    "h-10! rounded-xl! border! border-border! bg-card! px-3.5! text-[15px]! text-foreground! shadow-none!",
  formButtonPrimary:
    "h-9! rounded-xl! bg-primary! text-sm! font-medium! normal-case! tracking-normal! text-primary-foreground! shadow-none! after:hidden! hover:bg-primary! hover:opacity-88!",
  formButtonReset:
    "h-9! rounded-xl! bg-transparent! text-sm! font-medium! text-foreground! shadow-none! hover:bg-muted!",

  // The Members tab.
  tableHeaderCell: "text-[13px]! font-medium! text-muted-foreground!",
  paginationButton: `${ROW} rounded-lg!`,
  membersPageInviteButton:
    "h-9! rounded-xl! bg-primary! text-sm! font-medium! text-primary-foreground! shadow-none! hover:opacity-88!",
  badge:
    "rounded-lg! font-mono! text-[10px]! uppercase! tracking-[0.14em]! shadow-none!",
  menuButton: "text-muted-foreground! hover:text-foreground!",
  menuList: PANEL,
  menuItem: ROW,
  selectButton:
    "h-10! rounded-xl! border! border-border! bg-card! text-[15px]! text-foreground! shadow-none!",
  selectOptionsContainer: PANEL,
  selectOption: ROW,

  footer: FOOTER,
  spinner: "text-foreground!",
};

/**
 * Appearance for every Clerk surface in the app, set once on `ClerkProvider`.
 *
 * Popovers and modals are mounted by a global host rather than by the control that
 * opens them, so per-component `appearance` — and even the documented
 * `organizationProfileProps` / `userProfileProps` — does not reliably reach them.
 * The provider does.
 *
 * The provider is an async server component and cannot read a preference that only
 * exists in the browser, which is why the colours are handed over as `var(--clerk-*)`
 * rather than as values: the cascade resolves them per theme, so the same object
 * serves light and dark. Those variables are declared in `globals.css`.
 */
export const CLERK_PROVIDER_APPEARANCE = {
  variables: {
    colorBackground: "var(--clerk-background)",
    colorForeground: "var(--clerk-foreground)",
    colorPrimary: "var(--clerk-primary)",
    colorPrimaryForeground: "var(--clerk-primary-foreground)",
    colorNeutral: "var(--clerk-neutral)",
    colorMuted: "var(--clerk-muted)",
    colorMutedForeground: "var(--clerk-muted-foreground)",
    colorInput: "var(--clerk-input)",
    colorInputForeground: "var(--clerk-foreground)",
    colorBorder: "var(--clerk-border)",
    colorDanger: "var(--clerk-danger)",
    fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
    fontFamilyMono: "var(--font-geist-mono), ui-monospace, monospace",
    borderRadius: "0.75rem",
    fontSize: "0.9375rem",
  },
  elements: {
    ...ORGANIZATION_POPOVER_ELEMENTS,
    ...USER_POPOVER_ELEMENTS,
    ...PROFILE_MODAL_ELEMENTS,
  },
};
