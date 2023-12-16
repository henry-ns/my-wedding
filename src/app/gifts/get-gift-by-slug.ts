"use server";

import { contentful } from "~/server/contentful";
import { Gift } from "~/types/gift";

export async function getGiftBySlug(slug: string): Promise<Gift | undefined> {
  try {
    const response = await contentful.getEntries({
      content_type: "weddingGift",
      limit: 1,
      "fields.slug": slug,
    });

    return response.items.find((i) => i.fields.slug === slug)?.fields as
      | Gift
      | undefined;
  } catch {
    return undefined;
  }
}
