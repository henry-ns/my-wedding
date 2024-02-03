"use client";

import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

const variants = {
  hidden: { opacity: 0, x: 0, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
};

export default function RootTemplate({ children }: Props) {
  return (
    <div className="overflow-x-hidden">
      <motion.div
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="hidden"
        transition={{
          type: "linear",
          duration: 0.5,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
