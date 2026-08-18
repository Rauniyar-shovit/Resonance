import { prisma } from "@/lib/db";
import { deleteAudio } from "@/lib/r2";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, orgProcedure } from "../init";
import {
  VOICE_CATEGORIES,
  VOICE_CATEGORY_LABELS,
} from "@/features/voices/data/voice-categories";

/**
 * Everything the search box claims to cover: the name, the description, the
 * category as it is spelled on screen, and the locale behind the region code.
 *
 * Category is an enum, so a typed "customer" has to be resolved back to the enum
 * members whose labels contain it before it can go near the database.
 */
function buildSearchFilter(query: string) {
  const insensitive = { contains: query, mode: "insensitive" as const };

  const categories = VOICE_CATEGORIES.filter((category) =>
    VOICE_CATEGORY_LABELS[category].toLowerCase().includes(query.toLowerCase()),
  );

  return [
    { name: insensitive },
    { description: insensitive },
    { language: insensitive },
    ...(categories.length ? [{ category: { in: categories } }] : []),
  ];
}

export const voicesRouter = createTRPCRouter({
  getAll: orgProcedure
    .input(z.object({ query: z.string().trim().optional() }).optional())
    .query(async ({ ctx, input }) => {
      const searchFilter = input?.query
        ? { OR: buildSearchFilter(input.query) }
        : {};

      const [custom, system, customTotal, systemTotal] = await Promise.all([
        prisma.voice.findMany({
          where: {
            variant: "CUSTOM",
            orgId: ctx.orgId,
            ...searchFilter,
          },
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            name: true,
            description: true,
            category: true,
            language: true,
            variant: true,
          },
        }),
        prisma.voice.findMany({
          where: { variant: "SYSTEM", ...searchFilter },
          orderBy: { name: "asc" },
          select: {
            id: true,
            name: true,
            description: true,
            category: true,
            language: true,
            variant: true,
          },
        }),
        prisma.voice.count({ where: { variant: "CUSTOM", orgId: ctx.orgId } }),
        prisma.voice.count({ where: { variant: "SYSTEM" } }),
      ]);

      // Sizes of the whole library, not of what the search left behind — the header
      // count and the "8 of 20" tally both measure against everything on offer.
      return {
        custom,
        system,
        totals: { custom: customTotal, system: systemTotal },
      };
    }),

  delete: orgProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const voice = await prisma.voice.findUnique({
        where: { id: input.id, variant: "CUSTOM", orgId: ctx.orgId },
        select: { id: true, r2ObjectKey: true },
      });

      if (!voice) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Voice not found",
        });
      }

      await prisma.voice.delete({ where: { id: input.id } });

      if (voice.r2ObjectKey) {
        await deleteAudio(voice.r2ObjectKey).catch(() => {});
      }

      return { success: true };
    }),
});
