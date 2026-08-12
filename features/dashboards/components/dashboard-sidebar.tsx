"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Wordmark } from "@/components/wordmark";
import { UsageContainer } from "@/features/billing/components/usage-container";
import { VoiceCreateDialog } from "@/features/voices/components/voice-create-dialog";
import { OrganizationSwitcher, useClerk, UserButton } from "@clerk/nextjs";
import {
  AudioLines,
  Headphones,
  Home,
  LayoutGrid,
  LucideIcon,
  Settings,
  Volume2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

/** Mono, wide-tracked, uppercase — the label voice used across the workspace. */
const EYEBROW =
  "font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground";

interface MenuItem {
  title: string;
  url?: string;
  icon: LucideIcon;
  onClick?: () => void;
}

interface NavSectionProps {
  label?: string;
  items: MenuItem[];
  pathname: string;
}

/**
 * Nav items read as a dot and a word when the sidebar is open. Collapsed to the rail
 * there is no word left to anchor the dot, so the item's icon takes over.
 */
const NavMarker = ({ icon: Icon }: { icon: LucideIcon }) => (
  <span className="flex size-4 shrink-0 items-center justify-center">
    <span className="size-1.5 rounded-full bg-foreground/30 transition-colors group-data-active/menu-button:bg-foreground group-data-[collapsible=icon]:hidden" />
    <Icon className="hidden group-data-[collapsible=icon]:block" />
  </span>
);

const NavSection = ({ label, items, pathname }: NavSectionProps) => {
  return (
    <SidebarGroup>
      {label && <SidebarGroupLabel className={EYEBROW}>{label}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                isActive={
                  item.url
                    ? item.url === "/dashboard"
                      ? pathname === "/dashboard"
                      : pathname.startsWith(item.url)
                    : false
                }
                onClick={item.onClick}
                tooltip={item.title}
                className="h-9 rounded-lg border border-transparent px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground data-active:border-foreground/10 data-active:bg-sidebar-accent data-active:text-foreground"
              >
                {item.url ? (
                  <Link href={item.url} className="flex items-center gap-2.5">
                    <NavMarker icon={item.icon} />
                    <span>{item.title}</span>
                  </Link>
                ) : (
                  <>
                    <NavMarker icon={item.icon} />
                    <span>{item.title}</span>
                  </>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

const DashboardSidebar = () => {
  const pathname = usePathname();
  const clerk = useClerk();

  const [voiceDialogOpen, setVoiceDialogOpen] = useState(false);

  const mainMenuItem: MenuItem[] = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Explore Voices", url: "/dashboard/voices", icon: LayoutGrid },
    {
      title: "Text to Speech",
      url: "/dashboard/text-to-speech",
      icon: AudioLines,
    },
    {
      title: "Voice Cloning",
      icon: Volume2,
      onClick: () => setVoiceDialogOpen(true),
    },
  ];

  const othersMenuItems: MenuItem[] = [
    {
      title: "Setting",
      icon: Settings,
      onClick: () => clerk.openOrganizationProfile(),
    },
    {
      title: "Help and support",
      url: "mailto:test@test.com",
      icon: Headphones,
    },
  ];

  return (
    <>
      <VoiceCreateDialog
        open={voiceDialogOpen}
        onOpenChange={setVoiceDialogOpen}
      />

      <Sidebar collapsible="icon">
        <SidebarHeader className="flex flex-col gap-5 pt-4">
          <div className="flex items-center gap-2.5 pl-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:pl-0">
            <Wordmark height={16} />
            <span className="font-semibold text-[15px] tracking-[-0.02em] text-foreground group-data-[collapsible=icon]:hidden">
              Resonance
            </span>
            <div className="ml-auto flex items-center gap-1 group-data-[collapsible=icon]:hidden">
              <ThemeToggle />
              <SidebarTrigger className="lg:hidden" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className={`${EYEBROW} px-1 group-data-[collapsible=icon]:hidden`}>
              Workspace
            </span>
            <SidebarMenu>
              <SidebarMenuItem>
                <OrganizationSwitcher
                  hidePersonal
                  fallback={
                    <Skeleton className="h-8.5 w-full group-data-[collapsible=icon]:size-8 rounded-md border bg-card" />
                  }
                  appearance={{
                    elements: {
                      rootBox:
                        "w-full! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:flex! group-data-[collapsible=icon]:justify-center!",
                      organizationSwitcherTrigger:
                        "w-full! justify-between! bg-card! border! border-border! rounded-lg! pl-1! pr-2! py-1! gap-3! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:p-1! shadow-none!",
                      organizationPreview: "gap-2!",
                      organizationPreviewAvatarBox: "size-6! rounded-sm!",
                      organizationPreviewTextContainer:
                        "text-xs! tracking-tight! font-medium! text-foreground! group-data-[collapsible=icon]:hidden!",
                      organizationPreviewMainIdentifier: "text-[13px]!",
                      organizationSwitcherTriggerIcon:
                        "size-4! text-muted-foreground! group-data-[collapsible=icon]:hidden!",
                    },
                  }}
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <NavSection items={mainMenuItem} pathname={pathname} />
          <NavSection
            label="Others"
            items={othersMenuItems}
            pathname={pathname}
          />
        </SidebarContent>

        <SidebarFooter className="gap-3 py-3">
          <UsageContainer />
          <SidebarMenu>
            <SidebarMenuItem>
              <UserButton
                showName
                fallback={
                  <Skeleton className="h-8.5 w-full group-data-[collapsible=icon]:size-8 rounded-md border border-border bg-card" />
                }
                appearance={{
                  elements: {
                    rootBox:
                      "w-full! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:flex! group-data-[collapsible=icon]:justify-center!",
                    userButtonTrigger:
                      "w-full! justify-between! bg-card! border! border-border! rounded-lg! pl-1! pr-2! py-1! shadow-none! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:p-1! group-data-[collapsible=icon]:after:hidden!",
                    userButtonBox: "flex-row-reverse! gap-2!",
                    userButtonOuterIdentifier:
                      "text-[13px]! tracking-tight! font-medium! text-foreground! pl-0! group-data-[collapsible=icon]:hidden!",
                    userButtonAvatarBox: "size-6!",
                  },
                }}
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  );
};

export default DashboardSidebar;
