import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function SkeletonCard({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={twMerge(
        "group h-20 w-full min-w-[220px] flex-1 grow animate-pulse rounded-xl bg-gray-200",
        className,
      )}
      {...rest}
    />
  );
}
