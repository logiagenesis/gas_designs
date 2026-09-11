"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HeroScene } from "@/components/HeroScene";
import { track } from "@/lib/analytics";

/**
 * Cinematic hero.
 *
 * Motion budget: one entrance, played once, plus a pointer parallax that only
 * runs on devices with a fine pointer. Both are switched off entirely under
 * `prefers-reduced-motion`. The parallax writes CSS custom properties rather
 * than React state, so pointer movement never triggers a re-render.
 */
export function Hero() {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const finePointer = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reduced.matches) return;

    let frame = 0;

    const onMove = (event: PointerEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const rect = stage.getBoundingClientRect();
        // -1 .. 1 across the stage, from its centre.
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        stage.style.setProperty("--gd-px", `${(x * 2).toFixed(3)}`);
        stage.style.setProperty("--gd-py", `${(y * 2).toFixed(3)}`);
      });
    };

    const onLeave = () => {
      stage.style.setProperty("--gd-px", "0");
      stage.style.setProperty("--gd-py", "0");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const rise = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <section
      ref={stageRef}
      className="relative isolate overflow-hidden bg-carbon [--gd-px:0] [--gd-py:0]"
    >
      {/* Ambient wash behind everything. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_55%_at_72%_38%,rgba(242,240,234,0.09),transparent_70%)]"
      />

      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="lg:col-span-6 lg:pt-6">
          <motion.p
            {...rise}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="type-label text-signal-yellow"
          >
            Gas installation &amp; compliance
          </motion.p>

          <motion.h1
            {...rise}
            transition={{ duration: 0.6, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="type-h1 mt-5 text-warm-white"
          >
            Precision Gas Systems.
            <br />
            <span className="text-signal-yellow">Built for Safety.</span>
          </motion.h1>

          <motion.p
            {...rise}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="type-body measure mt-6 text-mist"
          >
            Gas installations, maintenance, leak detection and compliance support
            for residential, commercial and industrial sites.
          </motion.p>

          {/* Glass CTA panel */}
          <motion.div
            {...rise}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel mt-9 rounded-xl p-5 sm:p-6"
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                onClick={() => track("cta_primary_click", { location: "hero" })}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-signal-yellow px-6 py-3.5 text-base font-semibold text-carbon transition-colors hover:bg-signal-yellow-soft"
              >
                Request a Quote
                <LeverArrow />
              </Link>
              <Link
                href="/services"
                onClick={() => track("cta_secondary_click", { location: "hero" })}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-6 py-3.5 text-base font-semibold text-warm-white transition-colors hover:border-white/30 hover:bg-white/5"
              >
                View Services
              </Link>
            </div>

            <p className="type-label mt-5 text-valve-steel">
              Residential &middot; Commercial &middot; Industrial &middot; Developments
            </p>
          </motion.div>
        </div>

        {/* Scene. Two parallax layers moving at different rates. */}
        <div className="relative lg:col-span-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 translate-x-[calc(var(--gd-px)*-10px)] translate-y-[calc(var(--gd-py)*-6px)] transition-transform duration-500 ease-out motion-reduce:translate-x-0 motion-reduce:translate-y-0"
          />
          <div className="translate-x-[calc(var(--gd-px)*14px)] translate-y-[calc(var(--gd-py)*9px)] transition-transform duration-500 ease-out motion-reduce:translate-x-0 motion-reduce:translate-y-0">
            <HeroScene className="h-auto w-full max-w-[680px] lg:max-w-none" />
          </div>
        </div>
      </div>
    </section>
  );
}

/** CTA arrow drawn as a miniature lever, keeping the single motif. */
function LeverArrow() {
  return (
    <svg viewBox="0 0 24 16" className="h-3 w-5" aria-hidden="true" focusable="false">
      <path d="M2 8h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="19" cy="8" r="3.5" fill="currentColor" />
    </svg>
  );
}
