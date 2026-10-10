/**
 * The "PB" monogram, as geometry shared by every place the logo is drawn:
 * the React <Logo>, the generated favicon/app icons and the OG cards.
 * Keeping it as data means the mark can't drift between those renderers.
 *
 * A bright brand-gradient tile with bold, dark round-capped letters. The two
 * letters share a baseline and cap height and sit optically centred, with a
 * clear gap between them so they stay legible down to a 16px favicon.
 */
export const LOGO_VIEWBOX = "0 0 32 32";

/** Stroke paths, drawn with `stroke-width: LOGO_STROKE`, round caps/joins. */
export const LOGO_PATHS = [
  // P — stem and bowl
  "M7 23.5V8.5h3a3.5 3.5 0 0 1 0 7H7",
  // B — stem, upper bowl, slightly larger lower bowl
  "M17 23.5V8.5h3a3.5 3.5 0 0 1 0 7h-3h3.5a4 4 0 0 1 0 8H17",
] as const;

export const LOGO_STROKE = 2.6;

/** Corner radius of the tile. */
export const LOGO_RADIUS = 8;

/**
 * Fixed brand colours, identical in both themes: the gradient tile reads on
 * light and dark backgrounds alike, and `ink` keeps the letters crisp on it.
 */
export const BRAND = {
  from: "#35e08f",
  to: "#22b8cf",
  ink: "#04140d",
} as const;
