/**
 * The "PB." monogram, as geometry shared by every place the logo is drawn:
 * the React <Logo>, the generated favicon/app icons and the OG cards.
 * Keeping it as data means the mark can't drift between those renderers.
 *
 * Drawn on a 32×32 grid as round-capped strokes. The P's round bowl kisses the
 * B's stem, joining the letters into one ligature while both stay legible; the
 * accent dot is a full stop — a quiet nod to code.
 */
export const LOGO_VIEWBOX = "0 0 32 32";

/** Stroke paths, drawn with `stroke-width: LOGO_STROKE`, round caps/joins. */
export const LOGO_PATHS = [
  // P — stem and round bowl, whose outer edge meets the B's stem
  "M8 24V8h4a4.25 4.25 0 0 1 0 8.5H8",
  // B — stem, upper bowl, lower bowl
  "M16.25 24V8h3a3.6 3.6 0 0 1 0 7.2h-3h3.6a4.4 4.4 0 0 1 0 8.8h-3.6",
] as const;

export const LOGO_STROKE = 2.6;

/** The full-stop accent. */
export const LOGO_DOT = { cx: 26.2, cy: 24, r: 1.5 } as const;

/**
 * Fixed brand colours. The tile is dark in both themes on purpose: a logo
 * should look the same everywhere, and the dark tile carries the gradient
 * letters on light and dark backgrounds alike.
 */
export const BRAND = {
  tile: "#0b1015",
  from: "#35e08f",
  to: "#22b8cf",
} as const;
