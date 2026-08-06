"use client";

import { motion } from "framer-motion";
import { fadeUp, viewport, ease } from "@/lib/motion";

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  id?: string;
}

/**
 * Opacity + 8px upward translate.
 * Everyday workhorse — use for cards, feature items, body copy, headings.
 * Duration: 0.5s by default.
 */
export function FadeUp({
  children,
  delay = 0,
  duration = 0.5,
  className,
  id,
}: FadeUpProps) {
  return (
    <motion.div
      id={id}
      className={className}
      variants={{
        hidden: fadeUp.hidden,
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration, ease: ease.out, delay },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </motion.div>
  );
}
