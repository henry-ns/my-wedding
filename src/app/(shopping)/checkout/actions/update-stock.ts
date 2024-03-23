"use server";

import { env } from "~/env";
import { managementContentful } from "~/server/contentful";

type Item = {
  slug: string;
  quantity: number;
};

export async function updateStock(items: Item[]) {
  if (items.length < 1) return;

  const space = await managementContentful.getSpace(env.CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment("master");
  const entries = await environment.getEntries({
    content_type: "weddingGift",
    "fields.slug[in]": items.map((i) => i.slug).join(","),
  });

  for (const i of entries.items) {
    const amount = i.fields.amount["en-US"];
    const quantity = items.find((x) => x.slug === i.fields.slug)?.quantity || 1;

    i.fields.amount = { "en-US": Math.max(+amount - quantity, 0) || 0 };
  }

  console.log(entries.items);

  // await Promise.all(
  //   entries.items.map(async (i) => {
  //     const entry = await i.update();
  //     sleep(10);
  //     entry.publish();
  //   }),
  // );
}
