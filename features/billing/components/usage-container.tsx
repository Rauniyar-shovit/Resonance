import { useCallback } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Waveform } from "@/components/waveform";
import { useCheckout } from "@/features/billing/hooks/use-checkout";
import { COST_PER_UNIT } from "@/features/text-to-speech/data/constants";
import { formatCents, formatDollars } from "@/lib/currency";
import { EYEBROW } from "@/lib/typography";
import { useTRPC } from "@/trpc/client";

/** Quoted from the same constant the estimate uses, so the two can't disagree. */
const SPEECH_RATE = formatDollars(COST_PER_UNIT * 1000);

function UpgradeCard() {
  const { checkout, isPending: isCheckoutPending } = useCheckout();

  return (
    <div className="flex flex-col gap-2.5">
      <p className={EYEBROW}>Pay as you go</p>
      <p className="text-[13px] leading-[1.6] text-muted-foreground">
        Add a payment method to start generating. Speech is {SPEECH_RATE} per
        1,000 characters.
      </p>
      <Button
        className="w-full"
        disabled={isCheckoutPending}
        onClick={checkout}
      >
        {isCheckoutPending ? (
          <>
            <Spinner className="size-3" />
            Redirecting...
          </>
        ) : (
          "Upgrade"
        )}
      </Button>
    </div>
  );
}

function UsageCard({ estimatedCostCents }: { estimatedCostCents: number }) {
  const trpc = useTRPC();
  const portalMutation = useMutation(
    trpc.billing.createPortalSession.mutationOptions({}),
  );

  const openPortal = useCallback(() => {
    portalMutation.mutate(undefined, {
      onSuccess: (data) => {
        window.open(data.portalUrl, "_blank");
      },
    });
  }, [portalMutation]);

  return (
    <div className="flex flex-col gap-2.5">
      <p className={EYEBROW}>Current usage</p>
      <p className="font-mono text-[26px] font-medium tracking-[-0.02em] text-foreground">
        {formatCents(estimatedCostCents)}
      </p>
      <Waveform
        count={16}
        seed={1.1}
        className="h-6"
        barClassName="bg-foreground/20"
      />
      <p className="text-[13px] leading-[1.6] text-muted-foreground">
        Estimated this period. Speech is {SPEECH_RATE} per 1,000 characters.
      </p>
      <Button
        className="w-full"
        disabled={portalMutation.isPending}
        onClick={openPortal}
      >
        {portalMutation.isPending ? (
          <>
            <Spinner className="size-3" />
            Redirecting...
          </>
        ) : (
          "Manage subscription"
        )}
      </Button>
    </div>
  );
}

export function UsageContainer() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.billing.getStatus.queryOptions());

  return (
    <div className="rounded-xl border border-foreground/10 bg-card p-4 group-data-[collapsible=icon]:hidden">
      {data?.hasActiveSubscription ? (
        <UsageCard estimatedCostCents={data.estimatedCostCents} />
      ) : (
        <UpgradeCard />
      )}
    </div>
  );
}
