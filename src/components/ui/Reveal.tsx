"use client";

import { motion } from "framer-motion";
import { reveal, viewport, ease } from "@/lib/motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  id?: string;
}

/**
 * Opacity + 20px upward translate with expo-out easing.
 * Use for: hero headings, key statements, primary callouts.
 * The expo curve gives a premium "snap into place" feel.
 * Duration: 0.7s by default.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.7,
  className,
  id,
}: RevealProps) {
  return (
    <motion.div
      id={id}
      className={className}
      variants={{
        hidden: reveal.hidden,
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration, ease: ease.expo, delay },
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
