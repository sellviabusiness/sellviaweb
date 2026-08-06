"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { ease, viewport } from "@/lib/motion";
import ActShell from "./ActShell";

/* ─── Act 05 — SCALE ───────────────────────────────────────────
   One sale becomes a sales force: odometer counters + a grid of
   sales "ticks" filling in like receipts stacking up.
──────────────────────────────────────────────────────────────── */

function CountUp({
  to,
  prefix = "",
  className,
}: {
  to: number;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const mv = useMotionValue(0);
  const text = useTransform(
    mv,
    (v) => `${prefix}${Math.round(v).toLocaleString("en-US")}`
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 1.8, ease: ease.expo });
    return () => controls.stop();
  }, [inView, to, mv]);

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
}

const STATS = [
  { label: "Creators approved", value: 31, prefix: "" },
  { label: "Sales this month", value: 127, prefix: "" },
  { label: "Tracked revenue", value: 8636, prefix: "$" },
] as const;

const GRID_CELLS = 96;

export default function ActScale() {
  const [lit, setLit] = useState(false);

  return (
    <ActShell
      id="act-scale"
      headline={
        <>
          Now run it
          <br />
          thirty-one times.
        </>
      }
      body={
        <p>
          One approved creator is a partnership. Thirty-one is a sales force
          that costs nothing until it sells. These numbers are a model, not
          metrics — we don&apos;t have users yet.{" "}
          <span className="text-white">
            Making them real is what the waitlist is for.
          </span>
        </p>
      }
    >
      <div className="flex flex-col gap-10">
        {/* Counters — explicitly a model, not metrics */}
        <div className="panel rounded-card grid grid-cols-3 divide-x divide-white/[0.07] overflow-hidden">
          {STATS.map((s) => (
            <div key={s.label} className="px-4 py-7 sm:px-6">
              <CountUp
                to={s.value}
                prefix={s.prefix}
                className="font-mono text-display-sm font-medium text-white tabular-nums"
              />
              <p className="mt-2.5 font-mono text-label-sm uppercase leading-relaxed tracking-widest text-gray-02">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Sales ticks filling in */}
        <div>
          {/* 96 cells, one motion component. Animating each cell with its own
              motion.span meant 96 JS-driven animations subscribing to the
              frame loop; the stagger is identical done as a CSS animation with
              a per-cell delay, and costs the main thread nothing. */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewport}
            transition={{ duration: 0.01 }}
            onViewportEnter={() => setLit(true)}
            className="grid grid-cols-[repeat(24,1fr)] gap-1.5"
            aria-hidden
          >
            {Array.from({ length: GRID_CELLS }).map((_, i) => (
              <span
                key={i}
                className="aspect-square w-full bg-accent/70"
                style={{
                  opacity: lit ? 1 : 0.08,
                  transition: "opacity 200ms linear",
                  transitionDelay: `${400 + i * 14}ms`,
                }}
              />
            ))}
          </motion.div>
          <p className="mt-4 font-mono text-label-sm uppercase leading-relaxed tracking-widest text-gray-02">
            In this model, every cell is a verified, attributed, paid-out sale
          </p>
        </div>
      </div>
    </ActShell>
  );
}
