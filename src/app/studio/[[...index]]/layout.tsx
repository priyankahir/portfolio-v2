import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sanity Studio",
  description: "Portfolio Backend CMS",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
