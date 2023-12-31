"use server";

import { Preference } from "mercadopago";
import { redirect } from "next/navigation";

import { mercadopago } from "~/server/mercadopago";
import { Gift } from "~/types/gift";

type Input = {
  gift: Gift;
  payer: {
    email?: string;
    name?: string;
  };
};

export async function checkout({ payer, gift }: Input) {
  const preference = new Preference(mercadopago);

  const preferenceData = await preference.create({
    body: {
      expires: false,
      items: [
        {
          id: gift.slug,
          quantity: 1,
          title: gift.name,
          unit_price: gift.priceInCents / 100,
          currency_id: "BRL",
          description: "Presente de Casamento",
          picture_url: `https:${gift.images[0]?.fields.file.url}`,
        },
      ],
      payer: payer,
      additional_info: undefined,
      // redirect_urls: {
      //   success: `${origin}/checkout/success`,
      //   failure: `${origin}/checkout/failure`,
      //   pending: `${origin}/checkout/pending`,
      // }
    },
  });

  redirect(`/checkout/${preferenceData.id}`);
}
