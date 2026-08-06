"use client";

import { motion } from "framer-motion";
import ActList from "./ActList";
import ActMatch from "./ActMatch";
import ActSell from "./ActSell";
import ActSplit from "./ActSplit";
import ActScale from "./ActScale";

/* ─── "Follow one sale" ────────────────────────────────────────
   The whole pitch delivered as a single tracked transaction:
   a real product, a real creator, one sale followed end to end.
──────────────────────────────────────────────────────────────── */

export default function Story() {
  return (
    <section id="story" aria-label="One sale, followed end to end">
      <div className="container-outer">
        {/* Blueprint framing — set expectations before the acts */}
        <div className="pb-6 pt-24 sm:pt-32">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-display-md font-semibold leading-[1.05] text-white sm:text-display-lg"
          >
            One sale, the way
            <br />
            we&apos;re designing it.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-xl font-body text-body-lg leading-relaxed text-gray-01"
          >
            Nothing below is live. It&apos;s the exact product we&apos;re
            validating — follow one imaginary sale through it and decide if
            you&apos;d want it real.
          </motion.p>
        </div>

        <ActList />
        <ActMatch />
        <ActSell />
        <ActSplit />
        <ActScale />
      </div>
    </section>
  );
}
