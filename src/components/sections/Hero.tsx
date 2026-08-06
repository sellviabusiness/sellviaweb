import Image from "next/image";
import { WaitlistForm } from "@/components/ui/WaitlistForm";

/* ============================================================
   HERO SECTION
============================================================ */

export default function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative isolate flex min-h-svh flex-col items-center overflow-hidden bg-[#060606] pt-28 pb-28 lg:pt-16 lg:pb-0"
    >
      <Image
        src="/hero-bg.png"
        alt=""
        fill
        priority
        className="-z-20 object-cover opacity-[0.07]"
        style={{
          maskImage:
            "radial-gradient(ellipse 95% 85% at 50% 45%, transparent 45%, #000 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 95% 85% at 50% 45%, transparent 45%, #000 100%)",
        }}
      />

      {/* Extremely subtle grid — depth without noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.45]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 80% 65% at 50% 42%, #000 15%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 65% at 50% 42%, #000 15%, transparent 75%)",
        }}
      />

      {/* Grain — single static layer, no per-frame cost */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 container-outer grid min-h-[calc(100svh-4rem)] w-full min-w-0 grid-cols-1 items-center gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* Left — message */}
        <div className="flex min-w-0 flex-col items-center gap-6 text-center lg:items-start lg:pr-6 lg:text-left">
          <h1
            className={
              "font-heading font-bold tracking-tighter leading-tight text-white " +
              "max-w-[720px] " +
              "text-display-lg sm:text-display-xl lg:text-display-2xl"
            }
          >
            One Arrow <br /> Two Wins
          </h1>

          <p className="max-w-[500px] font-body text-body-lg sm:text-display-sm leading-snug text-gray-01">
            Where business owners <br className="hidden sm:inline" /> and creators grow together
          </p>
        </div>

        {/* Right — waitlist form */}
        <div className="panel rounded-card flex w-full min-w-0 max-w-md self-center justify-center p-6 sm:p-8">
          <WaitlistForm idPrefix="hero" ctaLabel="Reserve your spot" showReason />
        </div>
      </div>
    </section>
  );
}
