"use client";

import { useState } from "react";
import { Gift } from "~/types/gift";
import { GiftCard } from "./gift-card";
import { PaymentModal } from "./payment-modal";

type Props = {
  gifts: Gift[];
};

export function GiftList({ gifts }: Props) {
  const [gift, selectGift] = useState<Gift>();

  return (
    <div className="flex justify-start items-start flex-wrap gap-6">
      <PaymentModal gift={gift} onClose={() => selectGift(undefined)} />
      {gifts.map((g) => (
        <GiftCard key={g.slug} gift={g} onSelect={selectGift} />
      ))}
    </div>
  );
}
