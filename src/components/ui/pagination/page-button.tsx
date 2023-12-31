"use client";

import Link from "next/link";
import { tv } from "tailwind-variants";

import { Button } from "../button";

type Props = {
  page: number;
  isActive?: boolean;
};

const styles = tv({
  base: "w-10 overflow-hidden",
  variants: {
    isActive: {
      true: "border-primary-500 text-primary-500",
    },
  },
});

export function PageButton({ isActive, page }: Props) {
  return (
    <Link
      href={{ query: { page } }}
      className="hover:scale-110 active:scale-95 transition-transform"
    >
      <Button variant="outline" className={styles({ isActive })}>
        {page}
      </Button>
    </Link>
  );
}
