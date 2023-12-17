"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";
import { tv } from "tailwind-variants";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  src: string;
  alt: string;
};

const AnimatedImage = motion(Image);

const style = tv({
  base: "z-50 cursor-pointer",
});

export function Avatar({ src, alt, className, ...rest }: Props) {
  return (
    <Link className={style({ className })} href="/profile" {...rest}>
      <AnimatedImage
        src={src}
        alt={alt}
        width={80}
        height={80}
        priority={false}
        className="h-auto w-14 rounded-full border-4 border-secondary-500 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      />
    </Link>
  );
}
