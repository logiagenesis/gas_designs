"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * Confirmation state, drawn with the same valve motif as everything else: the
 * lever has completed its quarter turn. One rotation, played once, and skipped
 * entirely under `prefers-reduced-motion`, in which case the lever simply
 * starts in its finished position.
 */
export function SentConfirmation() {
  useEffect(() => {
    track("thank_you_view", { location: "contact-sent" });
  }, []);

  return (
    <div className="relative">
      <svg
        viewBox="0 0 216 192"
        className="h-28 w-auto text-warm-white"
        role="img"
        aria-label="Enquiry received"
      >
        <g transform="translate(-32 -32)">
          <path
            d="M145.9 56.2A74 74 0 1 0 201.59 135.74"
            fill="none"
            stroke="currentColor"
            strokeWidth="40"
            strokeLinecap="butt"
          />
          {/*
            The lever swings from horizontal to its quarter-turn position.
            `motion-reduce` removes the animation and leaves it at the end state.
          */}
          <g className="origin-[128px_128px] motion-safe:animate-[gd-quarter-turn_0.9s_cubic-bezier(0.22,1,0.36,1)_0.15s_both] motion-reduce:rotate-[-38deg]">
            <path
              d="M113 113H231A15 15 0 0 1 231 143H113A15 15 0 0 1 113 113Z"
              fill="#FFC400"
            />
          </g>
          <circle cx="128" cy="128" r="11" fill="currentColor" />
        </g>
      </svg>
    </div>
  );
}
