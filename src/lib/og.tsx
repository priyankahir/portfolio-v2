import { ImageResponse } from "next/og";
import { BRAND, LOGO_PATHS, LOGO_RADIUS, LOGO_STROKE, LOGO_VIEWBOX } from "@/lib/brand";
import { profile } from "@/data/profile";
import { siteConfig } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const BG = "#07090c";
const FG = "#e8edf2";
const MUTED = "#98a3b0";
const PRIMARY = "#35e08f";

interface OgOptions {
  /** Small monospace line above the title, e.g. "CASE STUDY". */
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Optional chips along the bottom, e.g. a tech stack. */
  chips?: string[];
}

/**
 * Shared renderer for every `opengraph-image` route so all social cards look
 * like the same site. Satori supports a CSS subset — flexbox only, no gap
 * shorthand quirks, explicit `display: flex` on every container.
 */
export function renderOgImage({ eyebrow, title, subtitle, chips = [] }: OgOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          backgroundImage: `radial-gradient(circle at 78% 8%, rgba(53,224,143,0.18), transparent 55%), radial-gradient(circle at 8% 92%, rgba(76,201,240,0.12), transparent 50%)`,
          padding: "68px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                width: 10,
                height: 10,
                borderRadius: 999,
                background: PRIMARY,
                marginRight: 14,
              }}
            />
            <div
              style={{
                display: "flex",
                fontSize: 22,
                letterSpacing: 4,
                color: PRIMARY,
                textTransform: "uppercase",
              }}
            >
              {eyebrow}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 34,
              fontSize: title.length > 58 ? 62 : 76,
              lineHeight: 1.08,
              fontWeight: 700,
              color: FG,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>

          {subtitle && (
            <div
              style={{
                display: "flex",
                marginTop: 26,
                fontSize: 28,
                lineHeight: 1.45,
                color: MUTED,
                maxWidth: 900,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 30,
          }}
        >
          {chips.length > 0 && (
            <div style={{ display: "flex", marginBottom: 26 }}>
              {chips.slice(0, 5).map((chip) => (
                <div
                  key={chip}
                  style={{
                    display: "flex",
                    marginRight: 12,
                    padding: "9px 18px",
                    borderRadius: 8,
                    border: "1px solid rgba(53,224,143,0.32)",
                    background: "rgba(53,224,143,0.09)",
                    color: PRIMARY,
                    fontSize: 20,
                  }}
                >
                  {chip}
                </div>
              ))}
            </div>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", marginRight: 18 }}>
                <LogoMark size={46} />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", fontSize: 26, color: FG }}>
                  {siteConfig.name}
                </div>
                <div style={{ display: "flex", fontSize: 20, color: MUTED }}>
                  {profile.role} · React · Node.js · MongoDB
                </div>
              </div>
            </div>

            <div style={{ display: "flex", fontSize: 21, color: MUTED }}>
              {siteConfig.url.replace(/^https?:\/\//, "")}
            </div>
          </div>
        </div>
      </div>
    ),
    OG_SIZE
  );
}

/**
 * The PB monogram for Satori-rendered images (OG cards, favicon, app icons).
 * Same geometry as the site's <Logo>, with fixed colours because there are no
 * CSS variables inside an ImageResponse.
 */
function LogoMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox={LOGO_VIEWBOX}>
      <defs>
        <linearGradient id="pb-tile" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={BRAND.from} />
          <stop offset="1" stopColor={BRAND.to} />
        </linearGradient>
        <linearGradient id="pb-shine" x1="0" y1="0" x2="0" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx={LOGO_RADIUS} fill="url(#pb-tile)" />
      <rect width="32" height="32" rx={LOGO_RADIUS} fill="url(#pb-shine)" />
      {LOGO_PATHS.map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke={BRAND.ink}
          strokeWidth={LOGO_STROKE}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

/** Square brand mark used for the favicon, Apple touch icon and PWA icons. */
export function renderIcon(size: number) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        <LogoMark size={size} />
      </div>
    ),
    { width: size, height: size }
  );
}
