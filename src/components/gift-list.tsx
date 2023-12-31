"use client";

import { initMercadoPago } from "@mercadopago/sdk-react";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

import { env } from "~/env";
import { Gift } from "~/types/gift";
import { GiftCard } from "./gift-card";
import { PaymentModal } from "./payment-modal";

type Props = {
  gifts: Gift[];
};

initMercadoPago(env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY);

export function GiftList({ gifts }: Props) {
  const [gift, selectGift] = useState<Gift>();

  return (
    <SessionProvider>
      <div className="flex justify-start items-start flex-wrap gap-6">
        <PaymentModal gift={gift} onClose={() => selectGift(undefined)} />

        {gifts.map((g) => (
          <GiftCard key={g.slug} gift={g} onSelect={selectGift} />
        ))}
      </div>
    </SessionProvider>
  );
}
