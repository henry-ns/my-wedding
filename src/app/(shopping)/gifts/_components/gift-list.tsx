"use client";

import { SkeletonList } from "~/components/ui/skeletons/skeleton-list";
import { useNavigation } from "~/hooks/navigation";
import type { Gift } from "~/types/gift";
import { GiftCard } from "./gift-card";

type Props = {
  gifts: Gift[];
};

export function GiftList({ gifts }: Props) {
  const { isLoading } = useNavigation();

  if (isLoading) {
    return <SkeletonList size={12} />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
      {gifts.map((g) => (
        <GiftCard key={g.slug} gift={g} />
      ))}
    </div>
  );
}
