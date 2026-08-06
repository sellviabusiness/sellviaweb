"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface ArrowLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Larger treatment for standalone calls to action. */
  size?: "sm" | "md";
  /** "light" is for the rare section that inverts to a white background. */
  tone?: "dark" | "light";
}

/**
 * Inline call-to-action link. The underline wipes in from the left and
 * the arrow steps forward on hover — one gesture, two elements moving
 * together, which reads as intentional rather than decorative.
 */
export function ArrowLink({
  href,
  children,
  className,
  size = "sm",
  tone = "dark",
}: ArrowLinkProps) {
  const light = tone === "light";
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex w-fit items-baseline gap-2",
        "font-body transition-colors duration-200",
        light
          ? "text-black hover:opacity-70"
          : "text-gray-01 hover:text-white",
        size === "sm" ? "text-body-sm" : "text-body-md",
        className
      )}
    >
      <span className={cn("relative", light ? "text-black" : "text-inherit")}>
        {children}
        <span
          aria-hidden
          className={cn(
            "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0",
            light ? "bg-black" : "bg-accent",
            "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "group-hover:scale-x-100"
          )}
        />
      </span>
      <span
        aria-hidden
        className={cn(
          "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1",
          light ? "text-black" : "text-accent"
        )}
      >
        →
      </span>
    </Link>
  );
}
