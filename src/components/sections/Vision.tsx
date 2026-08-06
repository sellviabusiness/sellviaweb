import { ArrowLink } from "@/components/ui/ArrowLink";

/* ─── The Vision ───────────────────────────────────────────────
   One sentence, delivered at maximum size. The one section on
   the page that inverts to white — a deliberate beat of contrast
   in an otherwise all-black page, reserved for the single
   sentence the rest of the page argues for.
──────────────────────────────────────────────────────────────── */

const WORDS: { text: string; accent?: boolean }[] = [
  { text: "Every" },
  { text: "product" },
  { text: "should" },
  { text: "have" },
  { text: "a" },
  { text: "thousand" },
  { text: "salespeople" },
  { text: "who" },
  { text: "only" },
  { text: "get" },
  { text: "paid" },
  { text: "when", accent: true },
  { text: "it", accent: true },
  { text: "sells.", accent: true },
];

export default function Vision() {
  return (
    <section
      id="vision"
      aria-labelledby="vision-heading"
      className="relative overflow-hidden bg-white"
    >
      <div className="container-outer section-padding-loose relative z-20">
        <h2
          id="vision-heading"
          className="mx-auto max-w-5xl text-center font-heading text-display-md font-semibold leading-[1.08] sm:text-display-lg lg:text-display-xl"
        >
          {WORDS.map((w, i) => (
            <span key={i}>
              <span
                className={
                  w.accent
                    ? "inline-block bg-accent px-2 text-black"
                    : "inline-block text-black"
                }
              >
                {w.text}
              </span>{" "}
            </span>
          ))}
        </h2>

        <p className="mx-auto mt-10 max-w-xl text-center font-body text-body-lg leading-[1.7] text-neutral-600">
          That&apos;s SellVia — a marketplace we&apos;re building where brands
          list products with a commission, creators pick what fits their
          audience, and every sale pays out on its own.
        </p>

        <div className="mt-9 flex justify-center">
          <ArrowLink href="#waitlist" size="md" tone="light">
            Join the waitlist
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
