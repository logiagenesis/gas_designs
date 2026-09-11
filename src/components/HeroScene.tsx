/**
 * GAS DESIGNS — HERO SCENE
 *
 * An abstract quarter-turn valve manifold, drawn entirely as inline SVG. No
 * stock photography, no generated raster art, no video, no WebGL — the depth
 * comes from layering, a reflective floor plane and a single accent colour.
 *
 * The scene is defined once in <defs> and drawn twice: upright, and mirrored
 * through the floor line behind a gradient mask. That gives a real reflection
 * for the cost of one extra <use>.
 */

/** Floor line. The reflection is mirrored about this y value. */
const FLOOR_Y = 430;

export function HeroScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 760 620"
      className={className}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="hs-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="hs-reflection-mask">
          <rect x="0" y={FLOOR_Y} width="760" height="190" fill="url(#hs-fade)" />
        </mask>
        <linearGradient id="hs-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F2F0EA" stopOpacity="0.09" />
          <stop offset="1" stopColor="#F2F0EA" stopOpacity="0" />
        </linearGradient>

        {/* The manifold itself, referenced twice. */}
        <g id="hs-scene">
          {/* Depth rings, well behind everything else. */}
          <g fill="none" stroke="#F2F0EA" opacity="0.07">
            <circle cx="430" cy="260" r="232" strokeWidth="1.5" />
            <circle cx="430" cy="260" r="286" strokeWidth="1.5" />
          </g>

          {/* Supply pipe running in from the left, into the valve body. */}
          <g strokeLinecap="butt">
            <path d="M0 260H290" stroke="#2E333A" strokeWidth="32" />
            <path d="M0 250H290" stroke="#F2F0EA" strokeWidth="2" opacity="0.13" />
          </g>

          {/* Riser and elbow off the main run. */}
          <g fill="none" strokeLinecap="butt" strokeLinejoin="round">
            <path d="M140 260V150H214" stroke="#2E333A" strokeWidth="22" />
            <path d="M140 260V150H214" stroke="#F2F0EA" strokeWidth="1.5" opacity="0.26" />
          </g>

          {/* Inline isolation valve, lever closed (turned up). */}
          <g>
            <circle cx="140" cy="260" r="34" fill="none" stroke="#F2F0EA" strokeWidth="14" opacity="0.85" />
            <rect x="132" y="196" width="16" height="60" rx="8" fill="#FFC400" opacity="0.9" />
            <circle cx="140" cy="260" r="6" fill="#16181B" />
          </g>

          {/* Flow indicator along the supply run. */}
          <path
            d="M0 260H266"
            stroke="#FFC400"
            strokeWidth="3"
            strokeLinecap="round"
            className="gd-flow"
            style={{ ["--gd-dash" as string]: "300" }}
          />

          {/* The valve body — the brand mark at architectural scale. */}
          <path
            d="M463.87 124.16A140 140 0 1 0 569.23 274.63"
            fill="none"
            stroke="#F2F0EA"
            strokeWidth="48"
            strokeLinecap="butt"
          />

          {/* Lever handle, open. */}
          <path
            d="M407 237H637A23 23 0 0 1 637 283H407A23 23 0 0 1 407 237Z"
            fill="#FFC400"
          />
          <circle cx="430" cy="260" r="17" fill="#F2F0EA" />

          {/* Pressure tapping and gauge stub. */}
          <g fill="none" stroke="#9AA0A6" strokeWidth="6" opacity="0.55">
            <path d="M596 237V188" />
            <circle cx="596" cy="168" r="20" strokeWidth="6" />
          </g>
          <circle cx="596" cy="168" r="3.5" fill="#F2F0EA" opacity="0.7" />
          <path
            d="M596 168 607 159"
            stroke="#FFC400"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </defs>

      {/* Reflection, mirrored through the floor line. */}
      <g mask="url(#hs-reflection-mask)" opacity="0.4">
        <g transform={`translate(0 ${FLOOR_Y * 2}) scale(1 -1)`}>
          <use href="#hs-scene" />
        </g>
      </g>

      {/* Floor plane and its leading edge. */}
      <rect x="0" y={FLOOR_Y} width="760" height="190" fill="url(#hs-floor)" />
      <rect x="0" y={FLOOR_Y} width="760" height="1" fill="#F2F0EA" opacity="0.16" />

      {/* Measurement ticks along the floor — a technical, not decorative, detail. */}
      <g stroke="#F2F0EA" opacity="0.16" strokeWidth="1.5">
        {Array.from({ length: 19 }, (_, i) => 20 + i * 40).map((x) => (
          <path key={x} d={`M${x} ${FLOOR_Y + 10}v${x % 120 === 20 ? 14 : 7}`} />
        ))}
      </g>

      <use href="#hs-scene" />
    </svg>
  );
}
