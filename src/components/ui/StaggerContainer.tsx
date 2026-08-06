"use client";

import { motion } from "framer-motion";
import { stagger, viewport } from "@/lib/motion";

type StaggerSpeed = "default" | "tight" | "loose";

interface StaggerContainerProps {
  children: React.ReactNode;
  speed?: StaggerSpeed;
  delay?: number;
  className?: string;
  id?: string;
  as?: "div" | "ul" | "ol" | "section" | "nav";
}

/**
 * Orchestrates staggered entrance of child animations.
 * Children must be StaggerItem (or any motion.* element with variants).
 *
 * speed:
 *   "default" — 70ms stagger, for feature grids, card lists
 *   "tight"   — 40ms stagger, for dense nav or tag lists
 *   "loose"   — 120ms stagger, for hero sections with few key elements
 *
 * Usage:
 *   <StaggerContainer as="ul" speed="default" className="grid grid-cols-3 gap-6">
 *     <StaggerItem as="li"><FeatureCard /></StaggerItem>
 *     <StaggerItem as="li"><FeatureCard /></StaggerItem>
 *   </StaggerContainer>
 */
export function StaggerContainer({
  children,
  speed = "default",
  delay,
  className,
  id,
  as: Tag = "div",
}: StaggerContainerProps) {
  const MotionTag = motion[Tag];

  const variants = (() => {
    const base = stagger[speed === "default" ? "container" : speed];
    if (delay === undefined) return base;
    return {
      hidden: base.hidden,
      visible: {
        transition: {
          ...base.visible.transition,
          delayChildren: delay,
        },
      },
    };
  })();

  return (
    <MotionTag
      id={id}
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </MotionTag>
  );
}
