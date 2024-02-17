"use server";

import { eq } from "drizzle-orm";
import { contentful } from "~/server/contentful";
import { Gift } from "~/types/gift";
import { db } from "../db";
import { gifts } from "../db/schema";

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
  order?: string;
};

const orderFilters: Record<string, string> = {
  name: "fields.name",
  "price-asc": "fields.priceInCents",
  "price-desc": "-fields.priceInCents",
  "quantity-asc": "fields.amount",
  "quantity-desc": "-fields.amount",
};

export async function getAvailableGifts({
  page,
  limit,
  name,
  order = "name",
}: Input): Promise<Output> {
  try {
    const orderFilter = orderFilters[order];
    const response = await contentful.getEntries({
      limit,
      skip: limit * (page - 1),
      content_type: "weddingGift",
      "fields.name[match]": name,
      "fields.amount[gte]": 1,
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      order: orderFilter ? ([orderFilter] as any) : undefined,
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

export async function getUserGifts(userId: string) {
  return db.select().from(gifts).where(eq(gifts.buyerId, userId));
}
