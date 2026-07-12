import React, { Suspense } from "react";
import HealthCheck from "./health-check";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
const page = () => {
  prefetch(trpc.health.queryOptions());

  return (
    <HydrateClient>
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <h1>trpc test page </h1>
        <ErrorBoundary fallback={<div> Something went wrong</div>}>
          <Suspense fallback={<div> Loading...</div>}>
            <HealthCheck />
          </Suspense>
        </ErrorBoundary>
      </div>
    </HydrateClient>
  );
};

export default page;
