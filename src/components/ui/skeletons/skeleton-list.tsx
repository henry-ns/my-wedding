import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

import { SkeletonCard } from "./skeleton-card";

type Props = HTMLAttributes<HTMLDivElement> & {
  size?: number;
};

export function SkeletonList({ className, size = 3, ...rest }: Props) {
  return (
    <div
      className={twMerge([
        "w-full flex justify-start items-start flex-wrap gap-6",
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
