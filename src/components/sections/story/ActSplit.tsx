"use client";

import { motion } from "framer-motion";
import { ease, viewport } from "@/lib/motion";
import ActShell from "./ActShell";

/* ─── Act 04 — SPLIT ───────────────────────────────────────────
   The signature moment: a paper receipt — the only white element
   on the entire site — prints itself as it scrolls into view.
   Both sides of the deal read the same piece of paper.
──────────────────────────────────────────────────────────────── */

function Row({
  left,
  right,
  bold = false,
}: {
  left: string;
  right: string;
  bold?: boolean;
}) {
  return (
    <div
      className={`flex justify-between gap-4 ${
        bold ? "font-bold text-neutral-900" : "text-neutral-600"
      }`}
    >
      <span>{left}</span>
      <span className="tabular-nums">{right}</span>
    </div>
  );
}

export default function ActSplit() {
  return (
    <ActShell
      id="act-split"
      flip
      headline={
        <>
          The money
          <br />
          splits itself.
        </>
      }
      body={
        <p>
          A verified sale will trigger the payout on its own. Mia doesn&apos;t
          invoice. Lumen doesn&apos;t process. Nobody waits sixty days —{" "}
          <span className="text-white">
            and both sides read the same receipt.
          </span>
        </p>
      }
    >
      <div className="mx-auto w-full max-w-sm">
        {/* Printer slot */}
        <div aria-hidden className="mx-auto h-1.5 w-[90%] rounded-full bg-border" />

        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)", y: -14 }}
          whileInView={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
          viewport={viewport}
          transition={{ duration: 1.3, delay: 0.25, ease: ease.expo }}
          className="origin-top"
        >
          {/* overflow-hidden keeps the rotated watermark inside the paper */}
          <div className="relative mt-1 overflow-hidden bg-[#FAFAF5] px-7 pb-8 pt-7 font-mono text-body-sm shadow-[0_24px_60px_rgba(191,255,19,0.07)]">
            {/* Honesty watermark — this receipt is a design specimen */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 flex items-center justify-center -rotate-[18deg] select-none font-mono text-[2.6rem] font-bold tracking-[0.28em] text-neutral-900/[0.05]"
            >
              SPECIMEN
            </span>
            <p className="text-center font-bold tracking-widest text-neutral-900">
              SELLVIA
            </p>
            <p className="mt-1 text-center text-body-xs text-neutral-500">
              sale record · order #4128 · 14:07:23
            </p>

            <div className="my-5 border-t border-dashed border-neutral-300" />

            <div className="flex flex-col gap-2">
              <Row left="Glow Serum" right="$68.00" />
              <Row left="Creator commission (20%)" right="−$13.60" />
            </div>

            <div className="my-5 border-t border-dashed border-neutral-300" />

            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between gap-4">
                <span className="font-bold text-neutral-900">@mia.dscvr</span>
                <span className="flex items-center gap-2">
                  <span className="bg-accent px-1.5 py-0.5 text-body-xs font-bold text-neutral-900">
                    PAID ✓
                  </span>
                  <span className="font-bold tabular-nums text-neutral-900">
                    $13.60
                  </span>
                </span>
              </div>
              <Row left="Lumen Skincare" right="$54.40" bold />
            </div>

            <div className="my-5 border-t border-dashed border-neutral-300" />

            <div className="flex flex-col gap-1.5 text-neutral-500">
              <Row left="Invoices sent" right="0" />
              <Row left="Emails chased" right="0" />
              <Row left="Days waited" right="0" />
            </div>

            <p className="mt-6 text-center text-body-xs text-neutral-400">
              * both sides see this exact receipt
            </p>
          </div>

          {/* Torn zigzag edge */}
          <div
            aria-hidden
            className="h-3 w-full"
            style={{
              background:
                "linear-gradient(-45deg, transparent 8px, #FAFAF5 0) 0 0 / 16px 100%, linear-gradient(45deg, transparent 8px, #FAFAF5 0) 8px 0 / 16px 100%",
              backgroundRepeat: "repeat-x",
            }}
          />
        </motion.div>
      </div>
    </ActShell>
  );
}
