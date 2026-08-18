import { EYEBROW } from "@/lib/typography";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";

const SUPPORT_EMAIL = "mailto:test@test.com";

const PageHeader = ({
  title,
  /** Mono note set beside the title — the model or mode the page runs on. */
  eyebrow,
  className,
}: {
  title: string;
  eyebrow?: string;
  className?: string;
}) => {
  return (
    <header
      className={cn(
        "flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border px-[clamp(16px,3vw,32px)]",
        className,
      )}
    >
      <div className="flex min-w-0 items-baseline gap-3.5">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <h1 className="truncate text-xl font-semibold tracking-[-0.03em]">
            {title}
          </h1>
        </div>
        {eyebrow && (
          <span className={cn(EYEBROW, "hidden sm:block")}>{eyebrow}</span>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Link
          href={SUPPORT_EMAIL}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "hidden px-3.5 sm:inline-flex",
          )}
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

export default PageHeader;
