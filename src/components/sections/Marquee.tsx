const PHRASES = [
  "For business owners",
  "For creators",
  "For growth",
  "One arrow, two wins",
];

function Lane() {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {PHRASES.map((phrase) => (
        <span key={phrase} className="flex items-center gap-8">
          <span className="font-heading text-heading-lg font-medium uppercase tracking-tight text-white/70">
            {phrase}
          </span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section
      aria-label="Highlights"
      className="overflow-hidden border-y border-white/[0.07] bg-[#060606] py-6"
    >
      <div className="flex w-max animate-marquee-left motion-reduce:animate-none">
        <Lane />
        <Lane />
      </div>
    </section>
  );
}
