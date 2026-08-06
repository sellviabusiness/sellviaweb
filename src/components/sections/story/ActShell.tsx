"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ease, viewport } from "@/lib/motion";

interface ActShellProps {
  id: string;
  headline: React.ReactNode;
  body: React.ReactNode;
  children: React.ReactNode;
  /** Swap text/visual column order on desktop */
  flip?: boolean;
}

/** Shared act layout: headline + body, visual column. */
export default function ActShell({
  id,
  headline,
  body,
  children,
  flip = false,
}: ActShellProps) {
  return (
    <div id={id} className="relative py-24 sm:py-32">
      <div
        className={cn(
          "grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:items-center lg:gap-20",
          flip && "lg:[&>*:first-child]:order-2"
        )}
      >
        <div className={cn(flip && "lg:pl-2")}>
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.75, ease: ease.expo }}
            className="font-heading text-display-sm font-semibold leading-[1.08] text-white sm:text-display-md"
          >
            {headline}
          </motion.h3>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewport}
            transition={{ duration: 0.6, delay: 0.15, ease: ease.out }}
            className="mt-6 max-w-md font-body text-body-md leading-[1.7] text-gray-01"
          >
            {body}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, delay: 0.1, ease: ease.expo }}
        >
          {/* Honesty label — nothing in the blueprint is live */}
          <span className="mb-3.5 inline-flex items-center gap-2 font-mono text-label-sm uppercase tracking-widest text-gray-02">
            <span aria-hidden className="h-1 w-1 rounded-full bg-gray-02" />
            Concept preview
          </span>
          {children}
        </motion.div>
      </div>
    </div>
  );
}
