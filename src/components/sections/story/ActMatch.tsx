"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ease, viewport } from "@/lib/motion";
import ActShell from "./ActShell";

/* ─── Act 02 — MATCH ───────────────────────────────────────────
   The application feed, made operable: the visitor approves a
   creator themselves. Putting the decision in their hands is the
   cheapest way to make them picture running a campaign — and it
   is the one screen where the product's judgement call lives.
──────────────────────────────────────────────────────────────── */

const APPLICATIONS = [
  {
    handle: "@mia.dscvr",
    niche: "skincare & routines",
    audience: "18k",
    rate: "4.8%",
    note: "“My audience asks about serums weekly.”",
  },
  {
    handle: "@theglowedit",
    niche: "beauty reviews",
    audience: "31k",
    rate: "2.1%",
    note: "“I only review what I'd repurchase.”",
  },
  {
    handle: "@skinwithsofi",
    niche: "derm student",
    audience: "9k",
    rate: "6.3%",
    note: "“Ingredient breakdowns are my thing.”",
  },
];

export default function ActMatch() {
  const [approved, setApproved] = useState(0);

  return (
    <ActShell
      id="act-match"
      flip
      headline={
        <>
          Creators apply —<br />
          not the other way around.
        </>
      }
      body={
        <p>
          Campaigns will be discoverable to every creator on SellVia.
          They&apos;ll apply with their audience attached; the brand approves
          who fits. No cold outreach, no purchased lists —{" "}
          <span className="text-white">
            everyone in the deal chose to be there.
          </span>
        </p>
      }
    >
      <div
        role="radiogroup"
        aria-label="Approve a creator for this campaign"
        className="flex flex-col gap-3"
      >
        {APPLICATIONS.map((app, i) => {
          const isApproved = approved === i;
          return (
            <motion.button
              key={app.handle}
              type="button"
              role="radio"
              aria-checked={isApproved}
              onClick={() => setApproved(i)}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{
                duration: 0.5,
                delay: 0.2 + i * 0.16,
                ease: ease.out,
              }}
              whileHover={{ y: -3 }}
              whileTap={{ y: -1 }}
              className={cn(
                "panel rounded-card group relative p-5 text-left sm:p-6",
                "transition-[border-color,box-shadow,background-color] duration-300",
                isApproved
                  ? "!border-accent/40 shadow-[0_18px_44px_-26px_rgba(191,255,19,0.55)]"
                  : "hover:!border-white/[0.18]"
              )}
            >
              {/* Selected edge — the trace motif at component scale */}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-y-0 left-0 w-px origin-top bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  isApproved ? "scale-y-100" : "scale-y-0"
                )}
              />

              <div className="flex items-baseline justify-between gap-4">
                <p className="font-mono text-body-sm text-white">{app.handle}</p>
                <p className="font-mono text-label-sm tabular-nums text-gray-02">
                  {app.audience} audience
                </p>
              </div>

              <p className="mt-1.5 font-mono text-label-sm uppercase tracking-widest text-gray-02">
                {app.niche} · {app.rate} conversion
              </p>

              <p className="mt-3.5 font-body text-body-sm leading-relaxed text-gray-01">
                {app.note}
              </p>

              {/* Status chip — the stamp lands only on the approved card */}
              <span className="absolute -top-2.5 right-4">
                <AnimatePresence mode="wait" initial={false}>
                  {isApproved ? (
                    <motion.span
                      key="approved"
                      initial={{ opacity: 0, scale: 1.5, rotate: -14 }}
                      animate={{ opacity: 1, scale: 1, rotate: -8 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, ease: ease.expo }}
                      className="block border-2 border-accent bg-background px-2.5 py-0.5 font-mono text-label-sm font-semibold uppercase tracking-widest text-accent"
                    >
                      Approved
                    </motion.span>
                  ) : (
                    <motion.span
                      key="pending"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="block border border-white/[0.14] bg-background px-2.5 py-0.5 font-mono text-label-sm uppercase tracking-widest text-gray-02 transition-colors duration-300 group-hover:border-white/25 group-hover:text-gray-01"
                    >
                      Approve
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </motion.button>
          );
        })}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 0.5, delay: 0.9, ease: ease.out }}
          className="mt-1 font-mono text-label-sm uppercase tracking-widest text-gray-02"
        >
          Pick a different creator — the call would be yours
        </motion.p>
      </div>
    </ActShell>
  );
}
