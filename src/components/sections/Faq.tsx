"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ease, viewport } from "@/lib/motion";
import { ArrowLink } from "@/components/ui/ArrowLink";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Does SellVia exist yet?",
    answer:
      "Not yet — and this page won't pretend otherwise. Everything above is the blueprint we're validating. If enough people join the waitlist, we build it, and the people who joined use it first.",
  },
  {
    question: "When would it launch?",
    answer:
      "Private beta first, invited from the waitlist in join order. Honest answer on timing: it depends on this validation stage — that's why your signup actually matters.",
  },
  {
    question: "What will it cost?",
    answer:
      "Joining the waitlist costs nothing. The plan for the platform is performance-based: brands pay commission only on verified sales, creators keep their share. No subscriptions, no listing fees.",
  },
  {
    question: "Will creators need a big following?",
    answer:
      "No. We're designing for zero follower minimums. What matters is whether your audience buys — a small audience that trusts you beats a large one that scrolls past.",
  },
  {
    question: "What could be sold on it?",
    answer:
      "Physical and digital products. If it can be sold online and tracked to a link, it fits the model.",
  },
  {
    question: "What do early members actually get?",
    answer:
      "Three things: a real say in what gets built (we'll ask, and we'll read replies), first access when the beta opens, and founding commission terms we won't offer after launch.",
  },
];

/* ─── Toggle glyph ─────────────────────────────────────────────
   A plus that becomes a minus: the vertical stroke retracts and the
   whole mark rotates a quarter turn. One motion, not two icons.
──────────────────────────────────────────────────────────────── */

function ToggleGlyph({ open }: { open: boolean }) {
  return (
    <motion.span
      aria-hidden
      // A half-turn: the mark spins, but the surviving stroke lands
      // horizontal again, so a plus resolves into a minus.
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.45, ease: ease.expo }}
      className="relative mt-2.5 block h-3.5 w-3.5 shrink-0"
    >
      <span
        className={cn(
          "absolute left-0 top-1/2 h-px w-full -translate-y-1/2 transition-colors duration-300",
          open ? "bg-accent" : "bg-gray-02 group-hover:bg-white"
        )}
      />
      <motion.span
        animate={{ scaleY: open ? 0 : 1 }}
        transition={{ duration: 0.4, ease: ease.expo }}
        className={cn(
          "absolute left-1/2 top-0 h-full w-px -translate-x-1/2 transition-colors duration-300",
          open ? "bg-accent" : "bg-gray-02 group-hover:bg-white"
        )}
      />
    </motion.span>
  );
}

/* ─── Section ──────────────────────────────────────────────────── */

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-heading">
      <div className="container-outer section-padding">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-24">

          {/* Sticky editorial column */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <motion.h2
              id="faq-heading"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.7, ease: ease.expo }}
              className="font-heading text-display-md font-semibold leading-[1.05] text-white sm:text-display-lg"
            >
              Questions we&apos;d ask too.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewport}
              transition={{ duration: 0.55, delay: 0.15, ease: ease.out }}
              className="mt-6 max-w-sm font-body text-body-md leading-relaxed text-gray-01"
            >
              Every receipt has fine print. Ours is short, and none of it is
              written to make the product sound further along than it is.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewport}
              transition={{ duration: 0.55, delay: 0.25, ease: ease.out }}
              className="mt-8"
            >
              <ArrowLink href="#waitlist" size="md">
                Still in? Join the waitlist
              </ArrowLink>
            </motion.div>
          </div>

          {/* Questions */}
          <div>
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                    ease: ease.out,
                  }}
                  className="border-b border-white/[0.09] first:border-t"
                >
                  <h3>
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      className="group flex w-full items-start gap-6 py-7 text-left sm:gap-10 sm:py-8"
                    >
                      <span
                        className={cn(
                          "mt-2.5 shrink-0 font-mono text-label-sm tabular-nums transition-colors duration-300",
                          isOpen ? "text-accent" : "text-gray-02 group-hover:text-gray-01"
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span
                        className={cn(
                          "flex-1 font-heading text-heading-xl font-medium leading-snug tracking-tight sm:text-display-sm",
                          "transition-[color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                          isOpen
                            ? "text-white"
                            : "text-white/70 group-hover:translate-x-1 group-hover:text-white"
                        )}
                      >
                        {item.question}
                      </span>

                      <ToggleGlyph open={isOpen} />
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.45, ease: ease.expo },
                          opacity: { duration: 0.3, ease: ease.out },
                        }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-9 pl-[2.6rem] font-body text-body-md leading-relaxed text-gray-01 sm:pl-[4.1rem]">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
