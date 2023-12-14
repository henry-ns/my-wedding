"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Props = {
  src: string;
  alt: string;
};

const AnimatedImage = motion(Image);

export function Avatar({ src, alt }: Props) {
  return (
    <Link className="fixed left-2 top-2 z-50 cursor-pointer" href="/profile">
      <AnimatedImage
        src={src}
        alt={alt}
        width={80}
        height={80}
        priority={false}
        className="h-auto w-14 rounded-full border-4 border-secondary-400 transition-all"
        transition={{ duration: 0.1, type: "spring", stiffness: 1000 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      />
    </Link>
  );
}
