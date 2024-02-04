"use server";

import { Preference } from "mercadopago";
import { getSession } from "next-auth/react";
import { headers } from "next/headers";

import { mercadopago } from "~/server/mercadopago";
import { CartItem } from "~/types/gift";

type Input = {
  items: CartItem[];
};

export async function getPreferenceId({
  items,
}: Input): Promise<string | undefined> {
  const origin = headers().get("origin");
  const preference = new Preference(mercadopago);
  const session = await getSession();

  const response = await preference.create({
    body: {
      items: items.map((gift) => ({
        id: gift.slug,
        quantity: gift.selectedAmount,
        title: gift.name,
        unit_price: gift.priceInCents / 100,
        currency_id: "BRL",
        description: "Presente de Casamento",
        picture_url: `https:${gift.images[0]?.fields.file.url}`,
      })),
      redirect_urls: {
        success: `${origin}/checkout/success`,
        failure: `${origin}/checkout/failure`,
      },
      back_urls: {
        success: `${origin}/checkout/success`,
        failure: `${origin}/checkout/failure`,
      },
      auto_return: "approved",
      payer: {
        name: session?.user.name || undefined,
        email: session?.user.email || undefined,
      },
    },
  });

  return response.id;
}
