import { cn } from "@/lib/utils";
import { SidebarTrigger } from "./ui/sidebar";
import { Button } from "./ui/button";
import Link from "next/link";
import { Headphones, ThumbsUp } from "lucide-react";

const PageHeader = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b px-4 py-4",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm">
          <Link
            href="mailto:test@test.com"
            className="flex items-center justify-center gap-2 "
          >
            <ThumbsUp />
            <span className="hidden lg:block">Feedback</span>
          </Link>
        </Button>

        <Button variant="outline" size="sm">
          <Link
            href="mailto:test@test.com"
            className="flex items-center justify-center gap-2 "
          >
            <Headphones />
            <span className="hidden lg:block">Need Help?</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PageHeader;
