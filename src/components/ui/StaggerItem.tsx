"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article" | "span";
}

/**
 * Child of StaggerContainer.
 * Inherits animation state from parent — do NOT add initial/animate/whileInView here.
 * Uses fadeUp variant (8px, 0.5s) by default.
 *
 * Usage:
 *   <StaggerContainer>
 *     <StaggerItem as="li">...</StaggerItem>
 *     <StaggerItem as="li">...</StaggerItem>
 *   </StaggerContainer>
 */
export function StaggerItem({
  children,
  className,
  as: Tag = "div",
}: StaggerItemProps) {
  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={className}
      variants={fadeUp}
    >
      {children}
    </MotionTag>
  );
}
