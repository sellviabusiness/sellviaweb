import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import OldWay from "@/components/sections/OldWay";
import Vision from "@/components/sections/Vision";
import Story from "@/components/sections/story/Story";
import Compare from "@/components/sections/Compare";
import FounderNote from "@/components/sections/FounderNote";
import Roadmap from "@/components/sections/Roadmap";
import Faq from "@/components/sections/Faq";
import CTA from "@/components/sections/CTA";

/*
  Validation-first narrative — one belief per section:
  Hero         the promise
  OldWay       "this problem is real" (+ honesty: product doesn't exist yet)
  Vision       "the idea makes sense" — one sentence, oversized
  Story        "here's exactly what we'd build" — the blueprint, labeled concept
  Compare      "it beats today's workflow"
  FounderNote  "real person, real motivation"
  Roadmap      "here's where it stands — your signup moves the line"
  Faq          honest objections, starting with 'does it exist yet?'
  CTA          the ask, framed as a vote + founding membership
*/
export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <Marquee />
      <OldWay />
      <Vision />
      <Story />
      <Compare />
      <FounderNote />
      <Roadmap />
      <Faq />
      <CTA />
    </main>
  );
}
