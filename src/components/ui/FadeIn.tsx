"use client";

import { motion } from "framer-motion";
import { fadeIn, viewport, ease } from "@/lib/motion";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  id?: string;
}

/**
 * Pure opacity fade. No movement.
 * Use for: images, backgrounds, badges, decorative elements.
 * Duration: 0.4s by default.
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.4,
  className,
  id,
}: FadeInProps) {
  return (
    <motion.div
      id={id}
      className={className}
      variants={{
        hidden: fadeIn.hidden,
        visible: {
          opacity: 1,
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
