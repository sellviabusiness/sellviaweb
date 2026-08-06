"use client";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { FadeUp } from "@/components/ui/FadeUp";
import { WaitlistForm } from "@/components/ui/WaitlistForm";

export default function CTA() {
  return (
    <section
      id="waitlist"
      aria-labelledby="cta-heading"
      className="relative overflow-hidden"
    >
      <div className="hairline" aria-hidden />

      {/* Grid field, fading out toward the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 45%, #000 20%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 45%, #000 20%, transparent 78%)",
        }}
      />

      <div className="container-outer section-padding-loose relative">
        <div className="flex flex-col items-center gap-7 text-center">

          <Reveal>
            <h2
              id="cta-heading"
              className={cn(
                "font-heading font-semibold text-white leading-[1.02]",
                "text-display-lg sm:text-display-xl lg:text-display-2xl"
              )}
            >
              It doesn&apos;t exist yet.
              <br />
              <span className="text-accent">You could be why it does.</span>
            </h2>
          </Reveal>

          <FadeUp delay={0.12}>
            <p className="container-description font-body text-body-lg leading-[1.7] text-gray-01">
              Every signup is a vote to build this — and a place in line when
              we do.
            </p>
          </FadeUp>

          <FadeUp delay={0.2} className="mt-2 flex w-full justify-center">
            <div className="panel rounded-card flex w-full max-w-md justify-center p-6 sm:p-8">
              <WaitlistForm idPrefix="cta" ctaLabel="Reserve your spot" showReason />
            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
