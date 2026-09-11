"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";
import { ServiceIcon } from "@/components/ServiceIcon";
import type { ServiceCardView } from "@/data/service-view";
import { track } from "@/lib/analytics";

/** Maximum tilt in degrees. The brief caps this at 6. */
const MAX_TILT = 6;

/**
 * An interactive service tile.
 *
 * The whole card is one link, so it is reachable and operable by keyboard with
 * a single tab stop and a visible focus ring. The tilt, fold and specular edge
 * are pointer-only decoration written straight to CSS custom properties — they
 * never gate access to the content, and they are disabled outright under
 * `prefers-reduced-motion`.
 */
export function ServiceCard({
  service,
  headingLevel = 3,
}: {
  service: ServiceCardView;
  /**
   * The card title's heading level. On the homepage the grid sits under a
   * section h2, so the cards are h3. On /services they sit directly under the
   * page h1, so they must be h2 — otherwise the document skips a level.
   */
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const ref = useRef<HTMLElement>(null);
  const frame = useRef(0);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (frame.current) return;

    const { clientX, clientY } = event;
    frame.current = window.requestAnimationFrame(() => {
      frame.current = 0;
      const rect = node.getBoundingClientRect();
      const px = (clientX - rect.left) / rect.width;
      const py = (clientY - rect.top) / rect.height;

      node.style.setProperty("--gd-mx", `${(px * 100).toFixed(2)}%`);
      node.style.setProperty("--gd-my", `${(py * 100).toFixed(2)}%`);
      // Tilt away from the cursor, so the card appears to be pushed.
      node.style.setProperty("--gd-ry", `${((px - 0.5) * 2 * MAX_TILT).toFixed(2)}deg`);
      node.style.setProperty("--gd-rx", `${((0.5 - py) * 2 * MAX_TILT).toFixed(2)}deg`);
      node.style.setProperty("--gd-lift", "-4px");
      node.style.setProperty("--gd-glow", "1");
    });
  }, []);

  const reset = useCallback(() => {
    const node = ref.current;
    if (!node) return;
    if (frame.current) {
      window.cancelAnimationFrame(frame.current);
      frame.current = 0;
    }
    node.style.setProperty("--gd-rx", "0deg");
    node.style.setProperty("--gd-ry", "0deg");
    node.style.setProperty("--gd-lift", "0px");
    node.style.setProperty("--gd-glow", "0");
  }, []);

  return (
    <article
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className="gd-tilt group relative h-full rounded-xl border border-white/10 bg-graphite/55 backdrop-blur-[10px]"
    >
      {/* Decorative layers, below the content and out of the a11y tree. */}
      <div
        aria-hidden="true"
        className="gd-tilt-fold pointer-events-none absolute inset-0 rounded-xl"
      />
      <div
        aria-hidden="true"
        className="gd-tilt-edge pointer-events-none absolute inset-0 rounded-xl"
      />

      <div className="relative flex h-full flex-col p-6 lg:p-7">
        <div className="gd-tilt-float mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-carbon/70 text-warm-white">
          <ServiceIcon name={service.iconKey} className="h-7 w-7" />
        </div>

        <Heading className="type-h3 text-warm-white">
          <Link
            href={`/services/${service.slug}`}
            onClick={() => track("service_card_click", { service: service.slug })}
            className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-signal-yellow"
          >
            {service.title}
          </Link>
        </Heading>

        <p className="type-body measure-tight mt-3 text-sm text-mist">
          {service.summary}
        </p>

        <ul className="mt-5 flex flex-col gap-2">
          {service.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2.5 text-sm text-valve-steel">
              <BulletMark />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 inline-flex items-center gap-2 pt-1 font-mono text-xs uppercase tracking-[0.14em] text-signal-yellow">
          <span className="transition-colors group-hover:text-signal-yellow-soft">
            View service
          </span>
          <svg viewBox="0 0 24 16" className="h-2.5 w-4" aria-hidden="true" focusable="false">
            <path d="M2 8h15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="19.5" cy="8" r="3" fill="currentColor" />
          </svg>
        </p>
      </div>
    </article>
  );
}

/** List mark drawn as a miniature lever, keeping the single motif. */
function BulletMark() {
  return (
    <svg
      viewBox="0 0 12 12"
      className="mt-[7px] h-2 w-2 shrink-0 text-valve-steel"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2 6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="9.5" cy="6" r="2" fill="currentColor" />
    </svg>
  );
}
