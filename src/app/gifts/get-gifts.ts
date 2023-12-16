"use server";

import { contentful } from "~/server/contentful";
import { Gift } from "~/types/gift";

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
  page?: number;
  limit?: number;
  price?: number;
  name?: string;
};

export async function getGifts({
  page = 1,
  limit = 10,
}: Input): Promise<Output> {
  try {
    const response = await contentful.getEntries({
      content_type: "weddingGift",
      limit,
      skip: limit * (page - 1),
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
