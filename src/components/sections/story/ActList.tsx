"use client";

import { useState } from "react";
import ActShell from "./ActShell";

/* ─── Act 01 — LIST ────────────────────────────────────────────
   The interactive moment: a working commission calculator.
   The slider IS the product demo — "this is the entire
   negotiation."
──────────────────────────────────────────────────────────────── */

const PRICE = 68;

export default function ActList() {
  const [pct, setPct] = useState(20);

  const creatorCut = (PRICE * pct) / 100;
  const businessCut = PRICE - creatorCut;

  return (
    <ActShell
      id="act-list"
      headline={
        <>
          A brand will list
          <br />a product.
        </>
      }
      body={
        <p>
          Name the product, set the commission, go live — no contracts, no ad
          budget, no sales team, and nothing owed until something sells.
          The slider below already works. Try it:{" "}
          <span className="text-white">
            that&apos;s the entire negotiation we&apos;re designing.
          </span>
        </p>
      }
    >
      {/* Campaign card */}
      <div className="panel rounded-card overflow-hidden">
        {/* Product row */}
        <div className="flex items-baseline justify-between gap-4 border-b border-white/[0.07] p-6 sm:p-7">
          <div>
            <p className="font-heading text-heading-lg font-semibold tracking-tight text-white">
              Glow Serum
            </p>
            <p className="mt-1.5 font-mono text-label-sm uppercase tracking-widest text-gray-02">
              Lumen Skincare · physical
            </p>
          </div>
          <p className="font-mono text-heading-lg text-white tabular-nums">
            ${PRICE.toFixed(2)}
          </p>
        </div>

        {/* Commission slider */}
        <div className="border-b border-white/[0.07] p-6 sm:p-7">
          <div className="mb-5 flex items-baseline justify-between">
            <label
              htmlFor="commission"
              className="font-mono text-label-sm uppercase tracking-widest text-gray-02"
            >
              Commission per sale
            </label>
            <span className="font-mono text-display-sm font-medium text-accent tabular-nums">
              {pct}%
            </span>
          </div>

          <div className="relative h-[2px]">
            {/* Filled portion of the track, painted under the native input.
                The wrapper's box is exactly 2px, with no padding — both
                this overlay (inset-y-0) and the input below (inset-0) are
                pinned to that same 2px band with no transform/centering
                math, so they occupy identical pixels regardless of font
                metrics. (Padding here would expand the containing block
                the `inset-*` children measure against, reopening the
                same misalignment.) */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 bg-accent"
              style={{ width: `${((pct - 10) / 30) * 100}%` }}
            />
            <input
              id="commission"
              type="range"
              min={10}
              max={40}
              step={1}
              value={pct}
              onChange={(e) => setPct(Number(e.target.value))}
              className="absolute inset-0 w-full"
              aria-valuetext={`${pct} percent commission`}
            />
          </div>

          <div className="mt-3 flex justify-between font-mono text-label-sm text-gray-02">
            <span>10%</span>
            <span>40%</span>
          </div>
        </div>

        {/* Live split readout */}
        <div className="grid grid-cols-2 divide-x divide-white/[0.07]">
          <div className="p-6 sm:p-7">
            <p className="font-mono text-label-sm uppercase tracking-widest text-gray-02">
              Creator earns
            </p>
            <p className="mt-3 font-mono text-display-sm font-medium text-accent tabular-nums">
              ${creatorCut.toFixed(2)}
            </p>
            <p className="mt-1.5 font-body text-body-xs text-gray-02">
              per sale
            </p>
          </div>
          <div className="p-6 sm:p-7">
            <p className="font-mono text-label-sm uppercase tracking-widest text-gray-02">
              Brand keeps
            </p>
            <p className="mt-3 font-mono text-display-sm font-medium text-white tabular-nums">
              ${businessCut.toFixed(2)}
            </p>
            <p className="mt-1.5 font-body text-body-xs text-gray-02">
              $0 until it sells
            </p>
          </div>
        </div>
      </div>
    </ActShell>
  );
}
