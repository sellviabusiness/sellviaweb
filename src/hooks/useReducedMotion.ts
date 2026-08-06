"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/**
 * Returns true when the user has requested reduced motion.
 * Use to skip or simplify animations in JS-driven components.
 *
 * Framer Motion's whileInView / variants already respect this,
 * but this hook is useful for conditional logic in component code.
 */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}
