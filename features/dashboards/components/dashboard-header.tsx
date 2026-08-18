"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const SUPPORT_EMAIL = "mailto:test@test.com";

/** Holds the heading's line open until Clerk resolves, so the page doesn't jump. */
const NON_BREAKING_SPACE = " ";

const DashboardHeader = () => {
  const { isLoaded, user } = useUser();

  return (
    <header className="flex flex-wrap items-end justify-between gap-6">
      <div className="flex flex-col gap-2.5">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          Nice to see you
        </p>
        <h1 className="max-w-[16ch] text-[clamp(2.25rem,4.4vw,3.25rem)] font-semibold leading-[0.96] tracking-[-0.045em]">
          {isLoaded
            ? (user?.fullName ?? user?.firstName ?? "there")
            : NON_BREAKING_SPACE}
        </h1>
      </div>

      <div className="hidden gap-2 lg:flex">
        <Link
          href={SUPPORT_EMAIL}
          className={cn(buttonVariants({ variant: "outline" }), "px-3.5")}
        >
          Feedback
        </Link>
        <Link
          href={SUPPORT_EMAIL}
          className={cn(buttonVariants({ variant: "outline" }), "px-3.5")}
        >
          Need help?
        </Link>
      </div>
    </header>
  );
};

export default DashboardHeader;
