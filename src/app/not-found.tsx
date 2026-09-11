import Link from "next/link";
import { Section } from "@/components/Section";
import { SERVICES } from "@/data/services";

/** Custom 404, using the valve motif rather than a generic error graphic. */
export default function NotFound() {
  return (
    <Section className="border-t-0 pt-16 lg:pt-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <svg
          viewBox="0 0 216 192"
          className="h-24 w-auto text-warm-white"
          role="img"
          aria-label="Page not found"
        >
          <g transform="translate(-32 -32)">
            <path
              d="M145.9 56.2A74 74 0 1 0 201.59 135.74"
              fill="none"
              stroke="currentColor"
              strokeWidth="40"
              strokeLinecap="butt"
              opacity="0.35"
            />
            {/* Lever closed — the page is shut off. */}
            <g transform="rotate(-90 128 128)">
              <path
                d="M113 113H231A15 15 0 0 1 231 143H113A15 15 0 0 1 113 113Z"
                fill="#FFC400"
              />
            </g>
            <circle cx="128" cy="128" r="11" fill="currentColor" />
          </g>
        </svg>

        <p className="type-label mt-8 text-signal-yellow">Error 404</p>
        <h1 className="type-h1 mt-4 text-warm-white">This line is closed.</h1>
        <p className="type-body mt-6 max-w-[42ch] text-mist">
          The page you asked for is not here. It may have moved, or the address may
          have a typo in it.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-signal-yellow px-6 py-3.5 text-base font-semibold text-carbon transition-colors hover:bg-signal-yellow-soft"
          >
            Back to home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md border border-white/15 px-6 py-3.5 text-base font-semibold text-warm-white transition-colors hover:border-white/30 hover:bg-white/5"
          >
            Contact us
          </Link>
        </div>

        <div className="mt-14 w-full border-t border-t-white/10 pt-10 text-left">
          <h2 className="type-label text-valve-steel">Services</h2>
          <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-sm text-mist transition-colors hover:text-warm-white"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
