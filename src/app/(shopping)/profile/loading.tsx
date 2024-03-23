import { SkeletonCard } from "~/components/ui/skeletons/skeleton-card";
import { SkeletonList } from "~/components/ui/skeletons/skeleton-list";

export default function ProfileLoading() {
  return (
    <main className="flex flex-col overflow-hidden">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-bold font-sans text-3xl">Meu Perfil</h2>
      </header>

      <SkeletonList size={2} className="mt-8" />

      <div className="mt-8 flex w-full flex-col gap-4">
        <SkeletonCard className="flex-auto" />
        <SkeletonCard className="flex-auto" />
        <SkeletonCard className="flex-auto" />
      </div>
    </main>
  );
}
