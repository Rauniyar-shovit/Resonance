import React from "react";
import type { Metadata } from "next";
import { SearchParams } from "nuqs/server";
import { voicesSearchParamsCache } from "@/features/voices/lib/params";
import { PrefetchPriority } from "next/dist/client/components/segment-cache/types";
import { prefetch, trpc, HydrateClient } from "@/trpc/server";
import { VoicesView } from "@/features/voices/views/voices-view";

export const metadata: Metadata = {
  title: "Voices",
};

const Voices = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const { query } = await voicesSearchParamsCache.parse(searchParams);

  prefetch(trpc.voices.getAll.queryOptions({ query }));

  return (
    <HydrateClient>
      <VoicesView />
    </HydrateClient>
  );
};

export default Voices;
