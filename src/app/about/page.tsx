import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import { CtaBand } from "@/components/CtaBand";
import { StandardsVisual } from "@/components/StandardsVisual";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Gas Designs designs, installs and maintains gas systems for residential, commercial and industrial sites, with compliance treated as part of the work rather than an afterthought.",
  path: "/about",
});

/**
 * ABOUT
 *
 * No founder biography, no years-in-business, no team photographs, no client
 * list, no credentials. None of those has been supplied. The page states how
 * the work is approached, which is honest and useful, rather than inventing a
 * history to fill the space.
 */
export default function AboutPage() {
  return (
    <>
      <Section className="border-t-0 pt-12 lg:pt-16">
        <SectionHeading
          as="h1"
          label="About"
          title="Gas work, done so the next person can follow it."
          intro="Gas Designs designs, installs and maintains gas systems for homes, commercial kitchens, industrial plant and developments. The work is judged on what happens after everyone has left the site."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <h2 className="type-h3 text-warm-white">How we work</h2>
            <p className="type-body measure text-mist">
              Most gas problems are design problems that only show up later. A
              supply sized for the average rather than the peak. An isolation valve
              behind an appliance nobody can move. A flexible hose run where heat
              will find it. None of those fail on the day they are installed.
            </p>
            <p className="type-body measure text-mist">
              So the emphasis sits early: work out the real connected load, decide
              where the gas can stand and how it gets to each appliance, and put
              isolation where a person under pressure can actually reach it. The
              installation then follows the decision rather than the other way round.
            </p>
            <p className="type-body measure text-mist">
              Every installation is pressure tested before it is handed over, and
              what was tested is written down. That record is what makes the next
              service visit, the next appliance change and the next certificate
              straightforward instead of archaeological.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="type-h3 text-warm-white">What we will not do</h2>
            <ul className="flex flex-col gap-4">
              {[
                "Quote a price for work nobody has looked at, beyond a like-for-like appliance swap.",
                "Sign off an installation that has not held a pressure test.",
                "Leave a site without telling you how to isolate the gas.",
                "Take on work that belongs to another trade without saying so.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-mist">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-6 shrink-0 rounded-full bg-signal-yellow"
                  />
                  <span className="type-body">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-2 rounded-2xl border border-white/10 bg-carbon-2/60 p-6">
              <StandardsVisual className="h-auto w-full" />
              <p className="type-label mt-4 text-valve-steel">
                Charge, hold, record
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 rounded-xl border border-white/10 bg-carbon-2/60 p-6 lg:p-8">
          <h2 className="type-h3 text-warm-white">Standards</h2>
          <p className="type-body measure mt-4 text-mist">
            Gas installation work in South Africa falls under the Pressure Equipment
            Regulations made under the Occupational Health and Safety Act, together
            with the SANS standards that apply to the installation type. If you need
            to know which ones govern your installation, ask and we will tell you
            before any work starts.
          </p>
        </div>
      </Section>

      <CtaBand
        title="Start with the site."
        body="Send what you want running and what is already installed, and we will tell you what the work involves."
      />
    </>
  );
}
