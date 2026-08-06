"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ease, viewport } from "@/lib/motion";

/* ─── Today vs. what we're building ────────────────────────────
   No feature cards. One ledger, two columns: how partnerships
   run today (struck through, like the prologue) against the
   future workflow. The strike-through motif from OldWay returns
   — the page opens and closes its argument the same way.
──────────────────────────────────────────────────────────────── */

const ROWS = [
  {
    today: "Cold DMs with a media kit and a prayer",
    future: "Campaigns creators discover themselves",
  },
  {
    today: "Campaign tracking across five spreadsheets",
    future: "One dashboard both sides can read",
  },
  {
    today: "“Exposure” offered as payment",
    future: "Commission agreed before anyone posts",
  },
  {
    today: "Net-60 invoices, chased by hand",
    future: "Payout fired by the sale itself",
  },
  {
    today: "Screenshots as proof the post worked",
    future: "Every click attributed to its creator",
  },
];

export default function Compare() {
  return (
    <section id="compare" aria-labelledby="compare-heading">
      <div className="container-outer section-padding">
        <motion.h2
          id="compare-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.75, ease: ease.expo }}
          className={cn(
            "font-heading font-semibold text-white leading-[1.05]",
            "text-display-md sm:text-display-lg",
            "mb-14 max-w-3xl sm:mb-16"
          )}
        >
          What we&apos;re replacing.
        </motion.h2>

        {/* Column labels */}
        <div className="hidden grid-cols-2 gap-10 border-b border-white/[0.12] pb-4 sm:grid">
          <p className="flex items-center gap-2.5 font-body text-label-sm font-medium uppercase tracking-widest text-gray-02">
            <X className="h-3.5 w-3.5 text-white/25" aria-hidden strokeWidth={2.5} />
            Today
          </p>
          <p className="flex items-center gap-2.5 font-body text-label-sm font-medium uppercase tracking-widest text-accent">
            <Check className="h-3.5 w-3.5" aria-hidden strokeWidth={2.5} />
            What we&apos;re building
          </p>
        </div>

        <div>
          {ROWS.map((row, i) => (
            <motion.div
              key={row.today}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5, delay: i * 0.08, ease: ease.out }}
              className="group grid gap-4 border-b border-white/[0.08] py-7 transition-colors duration-300 hover:border-white/[0.18] sm:grid-cols-2 sm:gap-10"
            >
              {/* Today — struck through as it enters */}
              <p className="flex items-baseline gap-3.5 font-body text-body-md leading-snug text-white/55">
                <X
                  aria-hidden
                  strokeWidth={2.5}
                  className="h-4 w-4 shrink-0 translate-y-[0.1em] text-white/25"
                />
                {row.today}
              </p>

              {/* Future */}
              <p className="flex items-baseline gap-3.5 font-body text-body-md leading-snug text-white">
                <span
                  aria-hidden
                  className="flex h-4 w-4 shrink-0 translate-y-[0.1em] items-center justify-center border border-accent/40 bg-accent/[0.08] text-accent transition-colors duration-300 group-hover:border-accent/70 group-hover:bg-accent/[0.14]"
                >
                  <Check strokeWidth={2.75} className="h-2.5 w-2.5" />
                </span>
                {row.future}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
