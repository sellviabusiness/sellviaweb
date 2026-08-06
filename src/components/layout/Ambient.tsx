/* ─── Ambient background ───────────────────────────────────────
   Two stacked layers so the page is never a flat canvas:
   vignette → grain. No colour washes — the page is neutral black.

   The whole stack is fixed and promoted to its own compositor
   layer, so it is rasterised once and never repainted while the
   page scrolls. Only the grain moves, and it moves by transform,
   which the compositor handles without touching the main thread.
──────────────────────────────────────────────────────────────── */

// feTurbulence grain, inlined so it costs no request.
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const PROMOTE = {
  transform: "translateZ(0)",
  backfaceVisibility: "hidden" as const,
};

export default function Ambient() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ ...PROMOTE, contain: "strict" }}
    >
      {/* 1 — Vignette: pulls the eye to the centre column */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 78% 62% at 50% 45%, transparent 42%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* 2 — Grain. Oversized and slowly drifting: the movement is a
             compositor-only transform, and the extra size means the
             tile edges never enter the viewport. */}
      <div
        className="absolute -inset-[10%] animate-grain-drift opacity-[0.05]"
        style={{
          ...PROMOTE,
          backgroundImage: NOISE,
          backgroundRepeat: "repeat",
        }}
      />
    </div>
  );
}
