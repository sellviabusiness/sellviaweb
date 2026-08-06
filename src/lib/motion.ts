import type { MotionProps, Transition, Variants } from "framer-motion";

/* ============================================================
   EASING CURVES
   All curves are deceleration-only (ease-out family).
   No bounce, no spring physics, no elastic.
============================================================ */
export const ease = {
  // Standard ease-out — general UI transitions
  out: [0.25, 0.1, 0.25, 1] as const,
  // Expo ease-out — fast in, slow deceleration; premium entrance feel
  // Used on Reveal / hero-level content. Linear, Vercel, Layer9 use this.
  expo: [0.16, 1, 0.3, 1] as const,
  // Ease in — for elements leaving the screen
  in: [0.55, 0, 1, 0.45] as const,
  // Ease in-out — for elements that enter and exit
  inOut: [0.45, 0, 0.55, 1] as const,
} satisfies Record<string, readonly [number, number, number, number]>;

/* ============================================================
   TRANSITIONS
   Named presets — all durations within 0.4–0.8s range per spec.
   transition.ui is kept outside the range for micro-interactions.
============================================================ */
export const transition = {
  ui: { duration: 0.15, ease: ease.out } satisfies Transition,
  fast: { duration: 0.4, ease: ease.out } satisfies Transition,
  base: { duration: 0.5, ease: ease.out } satisfies Transition,
  slow: { duration: 0.65, ease: ease.out } satisfies Transition,
  reveal: { duration: 0.7, ease: ease.expo } satisfies Transition,
} as const;

/* ============================================================
   VIEWPORT CONFIG
   Trigger once as element enters. Margin fires slightly before edge.
============================================================ */
export const viewport: MotionProps["viewport"] = {
  once: true,
  margin: "-8% 0px",
};

/* ============================================================
   VARIANTS
   Used by both raw motion.* elements and the animation components.

   Naming convention:
     fadeIn     — opacity only
     fadeUp     — opacity + upward y (subtle, everyday)
     fadeDown   — opacity + downward y
     reveal     — opacity + larger y + expo curve (hero / key content)
     stagger*   — container orchestrators (no own animation)

   All variants use "hidden" / "visible" keys so containers can
   propagate state to children automatically via staggerChildren.
============================================================ */

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transition.fast,
  },
};

// 8px — for cards, features, body copy, secondary content
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transition.base,
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transition.base,
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transition.base,
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transition.base,
  },
};

// 20px + expo curve — for hero headings, key statements, opening lines
export const reveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transition.reveal,
  },
};

// 12px — for section-level reveals (larger area, less movement needed)
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transition.slow,
  },
};

/* ============================================================
   STAGGER CONTAINERS
   No own animation — just orchestrate children timing.
   Children must use matching variants (hidden/visible keys).

   Usage:
     <motion.ul variants={stagger.container} initial="hidden" whileInView="visible" viewport={viewport}>
       <motion.li variants={fadeUp}>...</motion.li>
     </motion.ul>
============================================================ */
export const stagger = {
  // Default — cards, feature grids (7ms gap)
  container: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.05,
      },
    },
  } satisfies Variants,

  // Tight — dense lists, nav items (4ms gap)
  tight: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.05,
      },
    },
  } satisfies Variants,

  // Loose — hero sections with few key elements (12ms gap)
  loose: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  } satisfies Variants,
} as const;

/* ============================================================
   INTERACTIVE — hover / tap
   Apply via whileHover / whileTap.
   No scale above 1.01, no bounce.
============================================================ */
export const hover = {
  lift: { y: -2, transition: transition.ui },
  border: { borderColor: "#3f3f46", transition: transition.ui },
  dim: { opacity: 0.8, transition: transition.ui },
} as const;

export const tap = {
  press: { scale: 0.98, transition: { duration: 0.1, ease: ease.out } },
} as const;

/* ============================================================
   HELPER PROP BUNDLES
   Spread onto motion.* elements to skip repeating props.

   Usage:
     <motion.div {...motionFadeUp}>
     <motion.div {...motionReveal}>
     <motion.div {...motionStagger}>
       <motion.p variants={fadeUp}>...</motion.p>
     </motion.div>
============================================================ */
const base = (variants: Variants): MotionProps => ({
  variants,
  initial: "hidden",
  whileInView: "visible",
  viewport,
});

export const motionFadeIn = base(fadeIn);
export const motionFadeUp = base(fadeUp);
export const motionFadeDown = base(fadeDown);
export const motionReveal = base(reveal);
export const motionSectionReveal = base(sectionReveal);
export const motionStagger = base(stagger.container);
export const motionStaggerTight = base(stagger.tight);
export const motionStaggerLoose = base(stagger.loose);
