import { Breadcrumb, type BreadcrumbItem } from "../breadcrumb";
import { SkeletonCard } from "./skeleton-card";

type Props = {
  breadcrumb?: BreadcrumbItem[];
  children?: React.ReactNode;
};

export function SkeletonPageHeader({ breadcrumb, children }: Props) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 mb-8">
      <div>
        <Breadcrumb items={breadcrumb} />
        <SkeletonCard className="w-full max-w-60 h-8 rounded-md mt-1" />
      </div>

      <div className="flex items-center justify-between space-x-4">
        {children}
      </div>
    </header>
  );
}
