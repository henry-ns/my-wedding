"use server";

import { nanoid } from "nanoid";

import { contentful, managementContentful } from "~/server/contentful";
import { Gift } from "~/types/gift";

import { eq } from "drizzle-orm";
import { env } from "~/env";
import { sleep } from "~/utils/sleep";
import { db } from "../db";
import { gifts } from "../db/schema";

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

type Output = {
  items: Gift[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
};

type Input = {
  page: number;
  limit: number;
  price?: number;
  name?: string;
  available?: boolean[];
};

export async function getAvailableGifts({
  page,
  limit,
  name,
  available = [true],
}: Input): Promise<Output> {
  try {
    const response = await contentful.getEntries({
      limit,
      skip: limit * (page - 1),
      content_type: "weddingGift",
      "fields.name[match]": name,
      "fields.available[in]": available,
    });

    const { skip, total, items } = response;

    return {
      items: items.map((t) => t.fields) as Gift[],
      meta: {
        itemsPerPage: response.limit,
        totalItems: total,
        itemCount: items.length,
        currentPage: skip / response.limit + 1,
        totalPages: Math.ceil(Math.max(1, total / response.limit)),
      },
    };
  } catch {
    return {
      items: [],
      meta: {
        itemsPerPage: limit,
        totalItems: 0,
        itemCount: 0,
        currentPage: page,
        totalPages: 1,
      },
    };
  }
}

type BuyGiftsInput = {
  userId: string;
  items: Gift[];
};

export async function buyGifts({ items, userId }: BuyGiftsInput) {
  if (items.length < 1) return;

  // TUDO Make gifts unavailable
  const space = await managementContentful.getSpace(env.CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment("master");
  const entries = await environment.getEntries({
    content_type: "weddingGift",
    "fields.slug[in]": items.map((i) => i.slug).join(","),
  });

  for (const i of entries.items) {
    console.log("ITEM", i.fields);
    i.fields.available = { "en-US": false };
  }

  await Promise.all(
    entries.items.map(async (i) => {
      const entry = await i.update();
      sleep(10);
      entry.publish();
    }),
  );

  // Create user gifts
  await db.insert(gifts).values(
    items.map((i) => ({
      id: nanoid(),
      buyerId: userId,
      name: i.name,
      slug: i.slug,
      unitPrice: i.priceInCents,
      imageUrl: `https:${i.images[0]?.fields.file.url}`,
    })),
  );
}

export async function getUserGifts(userId: string) {
  return db.select().from(gifts).where(eq(gifts.buyerId, userId));
}
