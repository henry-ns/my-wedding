"use server";

import { nanoid } from "nanoid";

import { contentful } from "~/server/contentful";
import { Gift } from "~/types/gift";

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
};

export async function getAvailableGifts({
  page,
  limit,
  name,
}: Input): Promise<Output> {
  try {
    const response = await contentful.getEntries({
      limit,
      skip: limit * (page - 1),
      content_type: "weddingGift",
      "fields.name[match]": name,
      "fields.available[exists]": true,
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
  // TUDO Make gifts unavailable
  // const space = await managementContentful.getSpace(env.CONTENTFUL_SPACE_ID);
  // const environment = await space.getEnvironment("master");
  // const entries = await environment.getEntries({
  //   content_type: "weddingGift",
  //   "fields.slug[in]": items.map((i) => i.slug).join(","),
  // });

  // console.log({ entries });
  // for (const i of entries.items) {
  //   i.fields.available = false;
  // }

  // await Promise.all(entries.items.map((i) => i.update()));

  // Create user gifts
  await db.insert(gifts).values(
    items.map((i) => ({
      buyerId: userId,
      id: nanoid(),
      name: i.name,
      slug: i.slug,
      unitPrice: i.priceInCents,
      imageUrl: `https:${i.images[0]?.fields.file.url}`,
    })),
  );
}
