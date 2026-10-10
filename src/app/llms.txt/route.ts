import { buildLlmsTxt, textResponse } from "@/lib/llms";

export const dynamic = "force-static";
// Daily, so the computed experience figure in the key facts stays current.
export const revalidate = 86400;

export function GET() {
  return textResponse(buildLlmsTxt());
}
