/**
 * GAS DESIGNS — STANDARDS VISUAL
 *
 * Stands in for the project gallery this site deliberately does not have. No
 * real project photography has been supplied, and inventing a gallery on a gas
 * safety site is not an option, so the section carries an abstract technical
 * illustration instead: a pressure gauge and a soundness-test trace that holds
 * flat, which is exactly what a passing test looks like.
 *
 * Purely decorative — every word a reader needs is in the HTML beside it.
 */

const CX = 150;
const CY = 176;
const R = 96;

/** Tick marks across a 260-degree sweep, gauge-style. */
function ticks() {
  const marks = [];
  const startDeg = 210;
  const sweepDeg = 260;
  const count = 27;

  for (let i = 0; i < count; i += 1) {
    const major = i % 4 === 0;
    const deg = startDeg - (sweepDeg * i) / (count - 1);
    const rad = (deg * Math.PI) / 180;
    const outer = R - 10;
    const inner = outer - (major ? 18 : 9);
    marks.push(
      <path
        key={i}
        d={`M${(CX + outer * Math.cos(rad)).toFixed(2)} ${(CY - outer * Math.sin(rad)).toFixed(2)}L${(CX + inner * Math.cos(rad)).toFixed(2)} ${(CY - inner * Math.sin(rad)).toFixed(2)}`}
        stroke="#F2F0EA"
        strokeWidth={major ? 3 : 1.5}
        opacity={major ? 0.75 : 0.4}
        strokeLinecap="round"
      />,
    );
  }
  return marks;
}

export function StandardsVisual({ className }: { className?: string }) {
  // Needle parked in the working band rather than at either stop.
  const needleDeg = 78;
  const needleRad = (needleDeg * Math.PI) / 180;
  const needleX = CX + (R - 32) * Math.cos(needleRad);
  const needleY = CY - (R - 32) * Math.sin(needleRad);

  return (
    <svg
      viewBox="0 0 640 360"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="sv-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F2F0EA" stopOpacity="0.08" />
          <stop offset="1" stopColor="#F2F0EA" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Gauge */}
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="#22262B" strokeWidth="20" />
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="#F2F0EA" strokeWidth="3" opacity="0.5" />
      {ticks()}
      <path
        d={`M${CX} ${CY}L${needleX.toFixed(2)} ${needleY.toFixed(2)}`}
        stroke="#FFC400"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx={CX} cy={CY} r="11" fill="#F2F0EA" />
      <circle cx={CX} cy={CY} r="4" fill="#16181B" />

      {/* Soundness trace: charge, then hold. A passing test is a flat line. */}
      <g transform="translate(300 78)">
        {/* Axes */}
        <path d="M0 0v196H296" stroke="#F2F0EA" strokeWidth="2" opacity="0.3" fill="none" />
        {/* Gridlines */}
        <g stroke="#F2F0EA" opacity="0.09" strokeWidth="1">
          {[40, 80, 120, 160].map((y) => (
            <path key={y} d={`M0 ${y}H296`} />
          ))}
        </g>
        {/* The trace itself */}
        <path
          d="M0 168C26 168 38 60 74 56H296"
          fill="none"
          stroke="#FFC400"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="gd-flow"
          style={{ ["--gd-dash" as string]: "420" }}
        />
        {/* Hold band, marking the part of the test that matters */}
        <rect
          x="74"
          y="44"
          width="222"
          height="24"
          fill="#FFC400"
          opacity="0.1"
          rx="4"
        />
        <circle cx="296" cy="56" r="6" fill="#FFC400" />
      </g>

      {/* Shared floor plane */}
      <rect x="0" y="300" width="640" height="60" fill="url(#sv-floor)" />
      <rect x="0" y="300" width="640" height="1" fill="#F2F0EA" opacity="0.14" />
    </svg>
  );
}
