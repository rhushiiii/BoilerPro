import type { Metadata } from "next";

import "@/app/globals.css";
import { SiteNavbar } from "@/components/site-navbar";
import { createClient } from "@/lib/supabase/server";
import { AuthProvider } from "@/providers/auth-provider";

export const metadata: Metadata = {
  title: {
    default: "BoilerPro",
    template: "%s | BoilerPro",
  },
  description: "Production-ready Next.js 14 SaaS starter.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body>
        <AuthProvider initialSession={session} initialUser={session?.user ?? null}>
          <div className="min-h-screen bg-background">
            <SiteNavbar />
            <main>{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
