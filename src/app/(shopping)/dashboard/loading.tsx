import { SkeletonCard } from "~/components/ui/skeletons/skeleton-card";
import { SkeletonList } from "~/components/ui/skeletons/skeleton-list";

export default function DashboardLoading() {
  return (
    <main className="flex flex-col overflow-hidden">
      <SkeletonList size={2} className="mt-8" />

      <div className="mt-8 flex w-full flex-col gap-4">
        <SkeletonCard className="flex-auto" />
        <SkeletonCard className="flex-auto" />
        <SkeletonCard className="flex-auto" />
      </div>
    </main>
  );
}
