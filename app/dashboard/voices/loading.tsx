import { Skeleton } from "@/components/ui/skeleton";

/**
 * The header counts what the library holds, so it waits on the same query the rows
 * do — which means the whole page needs a shell to stand in until that lands.
 */
export default function Loading() {
  return (
    <>
      <div className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border px-[clamp(16px,3vw,32px)]">
        <div className="flex items-baseline gap-3.5">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="hidden h-3 w-40 sm:block" />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Skeleton className="hidden h-8 w-24 sm:block" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-[clamp(20px,4vw,40px)] pb-24 pt-[clamp(28px,4vw,48px)]">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-[clamp(40px,5vw,64px)]">
          <section className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-12 w-full max-w-2xl" />
              <Skeleton className="h-10 w-full max-w-lg" />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Skeleton className="h-10 min-w-55 flex-1 basis-70 rounded-xl lg:max-w-md" />
              <Skeleton className="h-10 w-36 rounded-xl" />
            </div>

            <div className="flex flex-wrap gap-2">
              {["one", "two", "three", "four", "five", "six"].map((chip) => (
                <Skeleton key={chip} className="h-8 w-28 rounded-xl" />
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-5">
            <div className="flex items-baseline justify-between gap-4 border-t border-foreground pt-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-50 w-full rounded-2xl" />
          </section>

          <section className="flex flex-col gap-5">
            <div className="flex items-baseline justify-between gap-4 border-t border-border pt-4">
              <Skeleton className="h-6 w-44" />
              <Skeleton className="h-3 w-16" />
            </div>
            <div className="flex flex-col">
              {["a", "b", "c", "d", "e", "f"].map((row) => (
                <div
                  key={row}
                  className="flex items-center gap-5 border-t border-border px-2 py-[18px]"
                >
                  <Skeleton className="h-8 w-10 shrink-0" />
                  <div className="flex shrink-0 basis-38 flex-col gap-1.5">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-4 min-w-0 flex-1 basis-75" />
                  <Skeleton className="ml-auto size-10 shrink-0 rounded-xl" />
                  <Skeleton className="size-10 shrink-0 rounded-xl" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
