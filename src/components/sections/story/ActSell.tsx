"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ease, viewport } from "@/lib/motion";
import ActShell from "./ActShell";

/* ─── Act 03 — SELL ────────────────────────────────────────────
   The tracked moment: a terminal-style event log fills in line
   by line as the follower clicks, carts, and buys.
──────────────────────────────────────────────────────────────── */

const LOG_LINES = [
  { time: "13:58", event: "post published", meta: "@mia.dscvr", accent: false },
  { time: "14:02", event: "click", meta: "sellvia.link/mia-glow", accent: false },
  { time: "14:06", event: "add to cart", meta: "$68.00", accent: false },
  { time: "14:07", event: "purchase verified ✓", meta: "order #4128", accent: true },
];

export default function ActSell() {
  return (
    <ActShell
      id="act-sell"
      headline={
        <>
          A follower clicks.
          <br />
          The sale is traced.
        </>
      }
      body={
        <p>
          Mia posts. Her link carries her fingerprint — every click, cart, and
          purchase attributed to the exact creator and the exact post, landing
          in{" "}
          <span className="text-white">
            both dashboards at the same second.
          </span>{" "}
          Nobody should ever wonder whether a post &ldquo;worked.&rdquo;
        </p>
      }
    >
      <div className="panel rounded-card overflow-hidden">
        {/* Link pill header */}
        <div className="flex items-center gap-3 border-b border-white/[0.07] px-5 py-4">
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(191,255,19,0.8)]"
          />
          <span className="font-mono text-body-sm text-gray-01">
            sellvia.link/<span className="text-white">mia-glow</span>
          </span>
          <span className="ml-auto hidden font-mono text-label-sm uppercase tracking-widest text-gray-02 sm:block">
            unique per creator
          </span>
        </div>

        {/* Event log */}
        <div className="flex flex-col gap-3.5 p-6 font-mono text-body-sm sm:p-7">
          {LOG_LINES.map((line, i) => (
            <motion.div
              key={line.time}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewport}
              transition={{ duration: 0.3, delay: 0.35 + i * 0.4, ease: ease.out }}
              className="grid grid-cols-[3.25rem_1fr_auto] items-baseline gap-4"
            >
              <span className="text-gray-02 tabular-nums">{line.time}</span>
              <span className={cn(line.accent ? "text-accent" : "text-white/80")}>
                {line.event}
              </span>
              <span className="text-right text-label-sm text-gray-02">
                {line.meta}
              </span>
            </motion.div>
          ))}

          {/* Blinking cursor — the log is still live */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewport}
            transition={{ duration: 0.3, delay: 0.35 + LOG_LINES.length * 0.4 }}
            className="grid grid-cols-[3.5rem_1fr] gap-4"
            aria-hidden
          >
            <span />
            <span className="animate-cursor-blink text-accent">▍</span>
          </motion.div>
        </div>
      </div>
    </ActShell>
  );
}
