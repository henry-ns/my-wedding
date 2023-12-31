import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function SkeletonCard({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={twMerge(
        "h-20 animate-pulse bg-gray-200 grow flex-1 group rounded-xl min-w-[220px] max-w-l w-ful",
        className,
      )}
      {...rest}
    />
  );
}
