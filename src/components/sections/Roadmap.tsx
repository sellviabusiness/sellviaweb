"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ease, viewport } from "@/lib/motion";
import { ArrowLink } from "@/components/ui/ArrowLink";

/* ─── Roadmap ──────────────────────────────────────────────────
   Radical honesty as a conversion device: the page itself is
   step 02, and the visitor's signup is what moves the line.
──────────────────────────────────────────────────────────────── */

type Status = "done" | "active" | "next";

const STEPS: { num: string; label: string; desc: string; status: Status }[] = [
  {
    num: "01",
    label: "Research",
    desc: "Months of conversations with brands and creators about why partnerships die.",
    status: "done",
  },
  {
    num: "02",
    label: "Validation",
    desc: "This page. If enough people join, we build it. You are literally here.",
    status: "active",
  },
  {
    num: "03",
    label: "Private beta",
    desc: "First cohort invited from the waitlist, in join order, on founding terms.",
    status: "next",
  },
  {
    num: "04",
    label: "Public launch",
    desc: "The open marketplace.",
    status: "next",
  },
];

export default function Roadmap() {
  return (
    <section id="roadmap" aria-labelledby="roadmap-heading">
      <div className="container-outer section-padding">
        <motion.h2
          id="roadmap-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.75, ease: ease.expo }}
          className={cn(
            "font-heading font-semibold text-white leading-[1.05]",
            "text-display-md sm:text-display-lg",
            "mb-5 max-w-3xl"
          )}
        >
          Where this actually stands.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 0.5, delay: 0.12, ease: ease.out }}
          className="mb-16 max-w-xl font-body text-body-lg leading-[1.7] text-gray-01 sm:mb-20"
        >
          No fake momentum. This is the whole plan, and your signup is what
          moves the line from 02 to 03.
        </motion.p>

        <div className="grid gap-0 lg:grid-cols-4">
          {STEPS.map((step, i) => {
            const done = step.status === "done";
            const active = step.status === "active";
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.12, ease: ease.out }}
                className="relative flex gap-5 pb-10 lg:block lg:pb-0 lg:pr-8"
              >
                {/* Connector line */}
                <div
                  aria-hidden
                  className={cn(
                    // mobile: vertical, desktop: horizontal
                    "absolute left-[5px] top-4 bottom-0 w-px lg:bottom-auto lg:left-4 lg:right-0 lg:top-[5px] lg:h-px lg:w-auto",
                    i === STEPS.length - 1 && "hidden",
                    done || active ? "bg-accent/50" : "bg-border"
                  )}
                />

                {/* Node */}
                <span
                  aria-hidden
                  className={cn(
                    "relative z-10 mt-0.5 block h-[11px] w-[11px] shrink-0 lg:mt-0",
                    done && "bg-accent/55",
                    active &&
                      "bg-accent shadow-[0_0_0_5px_rgba(191,255,19,0.14),0_0_18px_rgba(191,255,19,0.55)]",
                    step.status === "next" &&
                      "border border-white/20 bg-background"
                  )}
                />

                <div className="lg:mt-6">
                  <div className="flex items-baseline gap-3">
                    <span
                      className={cn(
                        "font-mono text-label-sm tracking-widest",
                        active ? "text-accent" : "text-gray-02"
                      )}
                    >
                      {step.num}
                    </span>
                    <h3
                      className={cn(
                        "font-heading text-heading-lg font-medium tracking-tight",
                        active ? "text-white" : done ? "text-white/70" : "text-gray-01"
                      )}
                    >
                      {step.label}
                    </h3>
                    {active && (
                      <span className="border border-accent/40 bg-accent/[0.07] px-2 py-0.5 font-mono text-label-sm uppercase tracking-widest text-accent">
                        You are here
                      </span>
                    )}
                  </div>
                  <p className="mt-2.5 max-w-xs font-body text-body-sm leading-relaxed text-gray-02">
                    {step.desc}
                  </p>
                  {active && (
                    <div className="mt-4">
                      <ArrowLink href="#waitlist">Move the line</ArrowLink>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
