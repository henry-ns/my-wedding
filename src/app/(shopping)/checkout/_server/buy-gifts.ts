"use server";

import { nanoid } from "nanoid";
import { db } from "~/server/db";
import { gifts } from "~/server/db/schema";
import type { CartItem } from "~/types/gift";

type BuyGiftsInput = {
  paymentId: string;
  userId: string;
  items: CartItem[];
};

export async function buyGifts({ items, userId, paymentId }: BuyGiftsInput) {
  if (items.length < 1) return;

  await db.insert(gifts).values(
    items.map((i) => ({
      id: nanoid(14),
      buyerId: userId,
      name: i.name,
      slug: i.slug,
      unitPrice: i.priceInCents,
      imageUrl: `https:${i.images[0]?.fields.file.url}`,
      quantity: i.selectedAmount,
      paymentId,
    })),
  );
}
