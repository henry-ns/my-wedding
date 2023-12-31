import { SkeletonCard } from "~/components/ui/skeletons/skeleton-card";
import { SkeletonList } from "~/components/ui/skeletons/skeleton-list";

export default async function GiftsLoading() {
  return (
    <>
      <SkeletonCard className="h-14 mb-8" />
      <SkeletonList size={8} />
    </>
  );
}
