import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { SkeletonCard } from "./skeleton-card";

type Props = HTMLAttributes<HTMLDivElement> & {
  size?: number;
};

export function SkeletonList({ className, size = 3, ...rest }: Props) {
  return (
    <div
      className={twMerge([
        "flex w-full flex-wrap items-start justify-start gap-6",
        className,
      ])}
      {...rest}
    >
      {[...Array(size).keys()].map((i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
