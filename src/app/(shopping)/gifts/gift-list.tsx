"use client";

import { Gift } from "~/types/gift";
import { GiftCard } from "./gift-card";

type Props = {
  gifts: Gift[];
};

export function GiftList({ gifts }: Props) {
  console.log({ gifts });
  return (
    <div className="flex justify-start items-start flex-wrap gap-6">
      {gifts.map((g) => (
        <GiftCard key={g.slug} gift={g} />
      ))}
    </div>
  );
}
