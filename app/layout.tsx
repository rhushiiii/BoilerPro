import type { Metadata } from "next";

import "@/app/globals.css";
import { SiteNavbar } from "@/components/site-navbar";

export const metadata: Metadata = {
  title: {
    default: "BoilerPro",
    template: "%s | BoilerPro",
  },
  description: "Production-ready Next.js 14 SaaS starter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-background">
          <SiteNavbar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
