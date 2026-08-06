import Image from "next/image";
import { cn } from "@/lib/utils";

/* ─── Prologue ─────────────────────────────────────────────────
   Sets up the page's conceit: everything below is one sale,
   followed end to end. Opens with the sale that dies today —
   each failure struck through in accent — against the glass
   arrow, the one object on the page that points up.
──────────────────────────────────────────────────────────────── */

const FAILURES = [
  "The DM goes unread.",
  "The spreadsheet goes stale.",
  "The invoice goes unpaid for sixty days.",
];

function Struck({ text }: { text: string }) {
  return (
    <p className="flex items-baseline gap-3 font-heading text-heading-xl font-normal leading-snug tracking-tight text-white/70 sm:text-display-sm">
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className="h-[0.55em] w-[0.55em] shrink-0 self-center text-accent/70"
      >
        <path
          d="M2 2L14 14M14 2L2 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      {text}
    </p>
  );
}

/* ─── Glass arrow ──────────────────────────────────────────────
   Decorative. Sits on its own accent bloom so the glass has
   something to refract against instead of flat black.
──────────────────────────────────────────────────────────────── */

function GlassArrow() {
  return (
    <div className="pointer-events-none relative mx-auto w-full max-w-[26rem] lg:max-w-none">
      {/* Bloom behind the glass. */}
      <div
        className="absolute left-1/2 top-1/2 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(circle, rgba(191,255,19,0.17) 0%, rgba(191,255,19,0.05) 40%, transparent 68%)",
        }}
      />

      <Image
        src="/arrow.svg"
        alt=""
        width={2112}
        height={1570}
        sizes="(max-width: 1024px) 60vw, 34vw"
        className="relative h-auto w-full"
      />
    </div>
  );
}

export default function OldWay() {
  return (
    <section id="old-way" aria-labelledby="old-way-heading">
      <div className="container-outer section-padding">
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-14">

          {/* Copy */}
          <div>
            <h2
              id="old-way-heading"
              className={cn(
                "font-heading font-semibold text-white leading-[1.05]",
                "text-display-md sm:text-display-lg",
                "mb-12 max-w-2xl"
              )}
            >
              A sale is failing to happen.
            </h2>

            <div className="flex flex-col gap-5">
              {FAILURES.map((f) => (
                <Struck key={f} text={f} />
              ))}
            </div>

            <div className="mt-16 border-l border-accent/30 pl-5">
              <p className="max-w-xl font-body text-body-lg leading-[1.7] text-gray-01">
                SellVia doesn&apos;t exist yet. This page is us deciding — with
                you — whether it should.
              </p>
            </div>
          </div>

          {/* Artwork — hidden on phones, where it would only push the
              argument below the fold */}
          <div className="hidden sm:block">
            <GlassArrow />
          </div>

        </div>
      </div>
    </section>
  );
}
