"use client";

import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  src: string;
  alt: string;
};

const style = tv({
  base: "z-50 cursor-pointer",
});

export function Avatar({ src, alt, className, ...rest }: Props) {
  return (
    <Link className={style({ className })} href="/profile" {...rest}>
      <Image
        src={src}
        alt={alt}
        width={56}
        height={56}
        priority={false}
        className="h-auto w-14 rounded-full border-4 border-secondary-500 transition-transform duration-300 active:scale-95 hover:scale-110"
      />
    </Link>
  );
}
