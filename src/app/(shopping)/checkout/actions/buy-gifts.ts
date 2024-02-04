"use server";

import { nanoid } from "nanoid";
import { env } from "~/env";
import { managementContentful } from "~/server/contentful";
import { db } from "~/server/db";
import { gifts } from "~/server/db/schema";
import { CartItem } from "~/types/gift";
import { sleep } from "~/utils/sleep";

type BuyGiftsInput = {
  paymentId: string;
  userId: string;
  items: CartItem[];
};

export async function buyGifts({ items, userId, paymentId }: BuyGiftsInput) {
  if (items.length < 1) return;

  const space = await managementContentful.getSpace(env.CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment("master");
  const entries = await environment.getEntries({
    content_type: "weddingGift",
    "fields.slug[in]": items.map((i) => i.slug).join(","),
  });

  for (const i of entries.items) {
    const quantity =
      items.find((x) => x.slug === i.fields.slug)?.selectedAmount || 1;

    i.fields.amount = { "en-US": i.fields.amount - quantity };
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
