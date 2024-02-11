"use client";

import { Gift } from "~/types/gift";
import { GiftCard } from "./gift-card";

type Props = {
  gifts: Gift[];
};

export function GiftList({ gifts }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {gifts.map((g) => (
        <GiftCard key={g.slug} gift={g} />
      ))}
    </div>
  );
}
