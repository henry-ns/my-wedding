import { SkeletonCard } from "~/components/ui/skeletons/skeleton-card";
import { SkeletonList } from "~/components/ui/skeletons/skeleton-list";

export default function ProfileLoading() {
  return (
    <main className="flex flex-col overflow-hidden">
      <header className="flex flex-wrap gap-4 items-end justify-between">
        <h2 className="font-sans text-3xl font-bold">Meu Perfil</h2>
      </header>

      <SkeletonList size={2} className="mt-8" />

      <div className="flex flex-col gap-4 w-full mt-8">
        <SkeletonCard className="flex-auto" />
        <SkeletonCard className="flex-auto" />
        <SkeletonCard className="flex-auto" />
      </div>
    </main>
  );
}
