import { renderIcon } from "@/lib/og";

// 512px doubles as the large PWA icon in the manifest; browsers downscale it.
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return renderIcon(size.width);
}
