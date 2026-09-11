/**
 * GAS DESIGNS — LOGO
 *
 * The mark is a heavy capital G drawn as the body of a front-facing
 * quarter-turn gas valve, opened at the upper right, with the valve's lever
 * handle doubling as the G's crossbar.
 *
 * The geometry is inlined from `public/brand/gas-designs-logo-full.svg`. Both
 * come from `scripts/build-brand.mjs` — re-run `node scripts/build-brand.mjs`
 * and regenerate this file's paths if the mark ever changes.
 *
 * The ring, pivot and wordmark are drawn in `currentColor`, so the logo takes
 * the colour of whatever it sits inside. The lever stays signal yellow unless
 * `mono` is set, which is what makes the one-colour version work.
 */

const SIGNAL_YELLOW = "#FFC400";

export interface LogoProps {
  /** "full" is the mark plus the wordmark; "mark" is the symbol alone. */
  variant?: "full" | "mark";
  /** Draw the lever in currentColor too, for one-colour contexts. */
  mono?: boolean;
  className?: string;
  /**
   * Accessible name. Omit when the logo sits next to a text label that already
   * names the link — the SVG is then hidden from assistive technology.
   */
  title?: string;
}

export function Logo({ variant = "full", mono = false, className, title }: LogoProps) {
  const leverFill = mono ? "currentColor" : SIGNAL_YELLOW;
  const isFull = variant === "full";

  return (
    <svg
      viewBox={isFull ? "0 0 1021.85 192" : "0 0 216 192"}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <g transform="translate(-32 -32)"><path d="M145.9 56.2A74 74 0 1 0 201.59 135.74" fill="none" stroke="currentColor" strokeWidth="40" strokeLinecap="butt"/><path d="M113 113H231A15 15 0 0 1 231 143H113A15 15 0 0 1 113 113Z" fill={leverFill}/><circle cx="128" cy="128" r="11" fill="currentColor"/></g>
      {isFull ? (
        <g transform="translate(270 48) scale(0.96)"><g fill="none" stroke="currentColor" strokeWidth="26" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="2.2"><path d="M63 34A21 21 0 0 0 42 13H34A21 21 0 0 0 13 34V66A21 21 0 0 0 34 87H42A21 21 0 0 0 63 66V50H36"/><path d="M99 87L126.68 13H135L162.68 87"/><path d="M104.24 73H157.44"/><path d="M246.18 29.28A16.28 16.28 0 0 0 229.9 13H212.46A16.28 16.28 0 0 0 196.18 29.28V33.72A16.28 16.28 0 0 0 212.46 50H229.9A16.28 16.28 0 0 1 246.18 66.28V70.72A16.28 16.28 0 0 1 229.9 87H212.46A16.28 16.28 0 0 1 196.18 70.72"/></g><g fill="none" stroke="currentColor" strokeWidth="18" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="2.2"><path d="M279.18 91V9H310.5A22.68 22.68 0 0 1 333.18 31.68V68.32A22.68 22.68 0 0 1 310.5 91Z"/><path d="M417.18 9H385.86A22.68 22.68 0 0 0 363.18 31.68V68.32A22.68 22.68 0 0 0 385.86 91H417.18"/><path d="M363.18 50H408.54"/><path d="M494.58 27.04A18.04 18.04 0 0 0 476.54 9H458.62A18.04 18.04 0 0 0 440.58 27.04V31.96A18.04 18.04 0 0 0 458.62 50H476.54A18.04 18.04 0 0 1 494.58 68.04V72.96A18.04 18.04 0 0 1 476.54 91H458.62A18.04 18.04 0 0 1 440.58 72.96"/><path d="M522.18 9V91"/><path d="M606.18 31.68A22.68 22.68 0 0 0 583.5 9H574.86A22.68 22.68 0 0 0 552.18 31.68V68.32A22.68 22.68 0 0 0 574.86 91H583.5A22.68 22.68 0 0 0 606.18 68.32V50H577.02"/><path d="M636.18 91V9L690.18 91V9"/><path d="M774.18 27.04A18.04 18.04 0 0 0 756.14 9H738.22A18.04 18.04 0 0 0 720.18 27.04V31.96A18.04 18.04 0 0 0 738.22 50H756.14A18.04 18.04 0 0 1 774.18 68.04V72.96A18.04 18.04 0 0 1 756.14 91H738.22A18.04 18.04 0 0 1 720.18 72.96"/></g></g>
      ) : null}
    </svg>
  );
}
