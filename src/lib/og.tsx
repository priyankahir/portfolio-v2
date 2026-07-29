import { ImageResponse } from "next/og";
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 46,
                  height: 46,
                  borderRadius: 10,
                  background: PRIMARY,
                  color: "#04140c",
                  fontSize: 26,
                  fontWeight: 700,
                  marginRight: 18,
                }}
              >
                P
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", fontSize: 26, color: FG }}>
                  {siteConfig.name}
                </div>
                <div style={{ display: "flex", fontSize: 20, color: MUTED }}>
                  MERN Stack Developer · React · Node.js
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
