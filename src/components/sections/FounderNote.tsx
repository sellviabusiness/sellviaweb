"use client";

import { motion } from "framer-motion";
import { ease, viewport } from "@/lib/motion";

/* ─── Why we're building this ──────────────────────────────────
   One honest letter. No stock portrait, no title inflation —
   a bordered note that reads like it was typed, not designed.
──────────────────────────────────────────────────────────────── */

export default function FounderNote() {
  return (
    <section id="founder" aria-labelledby="founder-heading">
      <div className="container-outer section-padding">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.65, ease: ease.out }}
          className="panel rounded-card relative mx-auto max-w-2xl p-8 sm:p-14"
        >
          <p
            id="founder-heading"
            className="flex items-center gap-3 font-mono text-label-sm uppercase tracking-widest text-gray-02"
          >
            <span aria-hidden className="h-px w-7 bg-white/20" />
            Why we&apos;re building this
          </p>

          <div className="mt-8 flex flex-col gap-5 font-body text-body-md leading-[1.75] text-gray-01">
            <p>
              I&apos;ve watched both sides of this fail. Brands DM&apos;ing
              strangers with a media kit and a prayer. Creators promoting
              products for &ldquo;exposure,&rdquo; then chasing invoices for
              months. The tools that exist are built for enterprises with
              affiliate managers — not for a small brand and a 9k-follower
              creator who&apos;d be perfect together.
            </p>
            <p>
              SellVia is my bet that performance partnerships shouldn&apos;t
              require a middleman, a lawyer, or a spreadsheet.{" "}
              <span className="text-white">
                Before I spend months building it, I want to know it&apos;s
                what you want too. That&apos;s what this page is.
              </span>
            </p>
            <p>
              If it resonates, join the list — and when the first email
              arrives, reply with what you&apos;d need it to do. I read
              everything.
            </p>
          </div>

          <div className="mt-10 border-t border-white/[0.07] pt-6">
            <p className="font-heading text-heading-md font-medium text-white">
              Hamza
              <span className="ml-2 font-body text-body-sm font-normal text-gray-02">
                founder, SellVia
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
