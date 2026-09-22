/**
 * WCAG contrast check for every text/background pair in the palette.
 * Run with `npm run check:contrast`.
 */
const lin = (c) => {
  c /= 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const L = (hex) => {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
const ratio = (a, b) => {
  const [x, y] = [L(a), L(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

const BG = { "--bg #121212": "#121212", "--bg-alt #1a1a1a": "#1a1a1a", "--surface #222222": "#222222" };
const FG = {
  "--text #f2f2f2": ["#f2f2f2", 17],
  "--text-secondary #c4c4c4": ["#c4c4c4", 17],
  "--accent #f5b400": ["#f5b400", 14],
  "--error #ff8a80": ["#ff8a80", 15],
};

let fails = 0;
console.log("\nText on background — WCAG AA needs 4.5:1 for body, 3:1 for large text\n");
console.log("pair".padEnd(52) + "size".padEnd(8) + "ratio".padEnd(9) + "verdict");
console.log("-".repeat(82));

for (const [fgName, [fg, size]] of Object.entries(FG)) {
  for (const [bgName, bg] of Object.entries(BG)) {
    const r = ratio(fg, bg);
    const need = size >= 24 ? 3 : 4.5;
    const pass = r >= need;
    if (!pass) fails += 1;
    console.log(
      `${fgName} on ${bgName}`.padEnd(52) +
        `${size}px`.padEnd(8) +
        `${r.toFixed(2)}:1`.padEnd(9) +
        (pass ? "PASS" : `FAIL (needs ${need}:1)`),
    );
  }
}

// Button: dark text on the accent fill.
const btn = ratio("#121212", "#f5b400");
console.log(
  "#121212 on --accent #f5b400 (button label)".padEnd(52) +
    "16px".padEnd(8) +
    `${btn.toFixed(2)}:1`.padEnd(9) +
    (btn >= 4.5 ? "PASS" : "FAIL"),
);
if (btn < 4.5) fails += 1;

console.log("-".repeat(82));
console.log(fails === 0 ? "\nAll pairs pass WCAG AA.\n" : `\n${fails} pair(s) FAIL.\n`);
process.exit(fails === 0 ? 0 : 1);
