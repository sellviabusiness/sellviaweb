"use client";

import { motion } from "framer-motion";
import { sectionReveal, viewport, ease } from "@/lib/motion";

interface SectionRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

/**
 * Renders a <section> that fades in with a 12px upward translate.
 * Designed for full-width page sections entering the viewport.
 * Use as the outermost wrapper of every page section component.
 * Duration: 0.65s by default.
 *
 * Usage:
 *   <SectionReveal id="how-it-works" aria-labelledby="how-it-works-heading">
 *     <div className="container-outer section-padding">...</div>
 *   </SectionReveal>
 */
export function SectionReveal({
  children,
  delay = 0,
  duration = 0.65,
  className,
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: SectionRevealProps) {
  return (
    <motion.section
      id={id}
      className={className}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      variants={{
        hidden: sectionReveal.hidden,
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
    </motion.section>
  );
}
