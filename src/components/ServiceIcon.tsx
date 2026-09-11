import type { ServiceIconKey } from "@/data/services";

/**
 * GAS DESIGNS — SERVICE ICONS
 *
 * Hand-drawn, and deliberately not from an icon library: Lucide and Heroicons
 * are banned on these cards because a generic icon set undoes the one thing
 * the brand is built on.
 *
 * Shared grammar, so the nine read as one family:
 *  - 32 x 32 box, 2px stroke, round caps and joins
 *  - the base drawn in `currentColor`
 *  - exactly one signal-yellow accent per icon, and it is always the part
 *    that controls or measures the gas — the same idea as the logo's lever
 */

const ACCENT = "#FFC400";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </g>
  );
}

const ICONS: Record<ServiceIconKey, React.ReactNode> = {
  // Home, with an isolation valve on the supply.
  "home-valve": (
    <>
      <Frame>
        <path d="M4 13.5 15 5l11 8.5" />
        <path d="M6.5 15.5V27h17V15.5" />
      </Frame>
      <circle cx="15" cy="21" r="4.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="19.6" width="10" height="2.8" rx="1.4" fill={ACCENT} />
    </>
  ),

  // Burner ring seen from above: ports around a rim, no flames.
  "burner-ring": (
    <>
      <Frame>
        <circle cx="16" cy="16" r="10.5" />
        <circle cx="16" cy="16" r="4" />
        <path d="M16 5.5v3M16 23.5v3M5.5 16h3M23.5 16h3M8.6 8.6l2.1 2.1M21.3 21.3l2.1 2.1M23.4 8.6l-2.1 2.1M10.7 21.3l-2.1 2.1" />
      </Frame>
      <circle cx="16" cy="16" r="2" fill={ACCENT} />
    </>
  ),

  // Distribution manifold: a header with branch legs.
  manifold: (
    <>
      <Frame>
        <path d="M3 11h26" />
        <path d="M8 11v7M16 11v7M24 11v7" />
        <circle cx="8" cy="21" r="3" />
        <circle cx="16" cy="21" r="3" />
        <circle cx="24" cy="21" r="3" />
      </Frame>
      <rect x="10.6" y="6" width="2.8" height="7" rx="1.4" fill={ACCENT} />
    </>
  ),

  // Horizontal bulk tank on saddles, with a contents gauge.
  "bulk-tank": (
    <>
      <Frame>
        <rect x="3.5" y="10" width="25" height="12" rx="6" />
        <path d="M8 22v4M24 22v4" />
        <path d="M5.5 26h5M21.5 26h5" />
      </Frame>
      <circle cx="16" cy="16" r="3.6" fill="none" stroke="currentColor" strokeWidth="2" />
      <path
        d="M16 16 18.2 13.8"
        stroke={ACCENT}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </>
  ),

  // Drawing sheet with a valve symbol set out on it.
  blueprint: (
    <>
      <Frame>
        {/* Sheet with a folded corner. */}
        <path d="M5 4.5h13.5L27 13v14.5H5Z" />
        <path d="M18.5 4.5V13H27" />
        {/* Dimension line with end ticks — a drawing, not a browser window. */}
        <path d="M9 23h14M9 21v4M23 21v4" />
      </Frame>
      <circle cx="12.5" cy="16.5" r="2.6" fill="none" stroke={ACCENT} strokeWidth="2" />
      <path d="M12.5 16.5h4.6" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" fill="none" />
    </>
  ),

  // Certificate with a seal.
  certificate: (
    <>
      <Frame>
        <path d="M25 15V6a1.5 1.5 0 0 0-1.5-1.5h-15A1.5 1.5 0 0 0 7 6v20a1.5 1.5 0 0 0 1.5 1.5H16" />
        <path d="M11.5 10h10M11.5 15h7M11.5 20h4" />
      </Frame>
      <circle cx="22.5" cy="22.5" r="5" fill="none" stroke={ACCENT} strokeWidth="2" />
      <path
        d="m20.4 22.6 1.5 1.5 2.7-2.9"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),

  // Spanner across a valve body.
  maintenance: (
    <>
      <Frame>
        {/* Open-ended jaw. */}
        <path d="M25.52 7.04A4.6 4.6 0 1 0 25.52 12.96" strokeWidth="2.6" />
        {/* Handle. */}
        <path d="M18.6 13.3 13.4 18.5" strokeWidth="3.2" />
      </Frame>
      {/* Grip. */}
      <path
        d="M13.4 18.5 8.6 23.3"
        stroke={ACCENT}
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
    </>
  ),

  // Detection: a leak point with signal rings around it.
  "leak-detect": (
    <>
      <Frame>
        <path d="M11 26.5h10" />
        <path d="M16 26.5V21" />
        <path d="M8.6 13.4a10.5 10.5 0 0 1 14.8 0" />
        <path d="M12.1 17a5.5 5.5 0 0 1 7.8 0" />
      </Frame>
      <circle cx="16" cy="20.5" r="2.6" fill={ACCENT} />
    </>
  ),

  // Control circuit feeding a solenoid.
  circuit: (
    <>
      <Frame>
        {/* Terminals. */}
        <path d="M3 20h4.6" />
        <circle cx="9.5" cy="20" r="1.9" />
        <circle cx="18.5" cy="20" r="1.9" />
        <path d="M20.4 20H22" />
        {/* Solenoid coil — what the circuit actually drives. */}
        <rect x="22" y="15.5" width="7" height="9" rx="1.5" />
        <path d="M24.3 15.5v9M26.6 15.5v9" />
      </Frame>
      {/* Switch arm, open. */}
      <path
        d="M10.2 18.6 16.8 13.6"
        stroke={ACCENT}
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
    </>
  ),
};

export function ServiceIcon({
  name,
  className,
}: {
  name: ServiceIconKey;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      {ICONS[name]}
    </svg>
  );
}
