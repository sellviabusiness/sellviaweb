"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

interface MagneticProps {
  children: React.ReactNode;
  /** How far the element may drift toward the cursor, in px. */
  strength?: number;
  className?: string;
}

/**
 * Pulls its child a few pixels toward the cursor while hovered, then
 * springs home on exit. Wraps rather than replaces the child, so any
 * button or link can become magnetic without changing its markup.
 *
 * Motion is skipped entirely when the user prefers reduced motion —
 * the wrapper still renders, it simply never moves.
 */
export function Magnetic({ children, strength = 6, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 260, damping: 22, mass: 0.4 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  function handleMove(e: React.MouseEvent<HTMLSpanElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    // Normalise to the element's own size so big and small targets
    // drift by the same visual amount.
    x.set((relX / (rect.width / 2)) * strength);
    y.set((relY / (rect.height / 2)) * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className={className ?? "inline-block"}
    >
      {children}
    </motion.span>
  );
}
