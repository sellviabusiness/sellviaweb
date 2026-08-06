"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SITE_CONFIG, NAV_LINKS } from "@/constants";
import { ease, viewport } from "@/lib/motion";
import { ArrowLink } from "@/components/ui/ArrowLink";

/* ─── Footer ───────────────────────────────────────────────────
   The closing chapter, not a sitemap. A parting line, the honest
   project status, and the wordmark set at the largest type on the
   page — the last thing a visitor sees is the name itself.
──────────────────────────────────────────────────────────────── */

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="relative overflow-hidden">
      <div className="hairline" aria-hidden />

      <div className="container-outer pb-10 pt-20 sm:pt-28">
        {/* ── Parting line + links ─────────────────────────────── */}
        <div className="grid gap-12 sm:grid-cols-[1fr_auto] sm:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, ease: ease.out }}
            className="max-w-md"
          >
            <p className="font-heading text-heading-xl font-medium leading-snug tracking-tight text-white sm:text-display-sm">
              Nothing here is live yet.
              <br />
              <span className="text-gray-02">
                That&apos;s the honest version — and the reason to be early.
              </span>
            </p>

            <div className="mt-7">
              <ArrowLink href="#waitlist" size="md">
                Join the waitlist
              </ArrowLink>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, delay: 0.1, ease: ease.out }}
            className="flex gap-16"
          >
            <nav aria-label="Footer navigation">
              <p className="mb-5 font-mono text-label-sm uppercase tracking-widest text-gray-02">
                Page
              </p>
              <ul className="flex flex-col gap-3.5" role="list">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group relative font-body text-body-sm text-gray-01 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                      <span
                        aria-hidden
                        className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="mb-5 font-mono text-label-sm uppercase tracking-widest text-gray-02">
                Contact
              </p>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="group relative font-body text-body-sm text-gray-01 transition-colors duration-200 hover:text-white"
              >
                {SITE_CONFIG.email}
                <span
                  aria-hidden
                  className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />
              </a>
              <p className="mt-3 max-w-[13rem] font-body text-body-xs leading-relaxed text-gray-02">
                Tell us what this would need to do for you. We read everything.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Oversized wordmark ───────────────────────────────── */}

        {/* ── Bottom bar ───────────────────────────────────────── */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-label-sm uppercase tracking-widest text-gray-02">
            © {year} {SITE_CONFIG.name}
          </p>

          {/* Honest status chip — mirrors the roadmap */}
          <p className="flex items-center gap-2.5 font-mono text-label-sm uppercase tracking-widest text-gray-02">
            <span
              aria-hidden
              className="h-1.5 w-1.5 animate-cursor-blink bg-accent"
            />
            Status: validating the idea
          </p>
        </div>
      </div>
    </footer>
  );
}
