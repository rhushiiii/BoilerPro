import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { ensureUserProfile } from "@/lib/db";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    await ensureUserProfile();
  } catch (error) {
    console.error("Dashboard profile bootstrap failed:", error);
  }

  return (
    <div className="container py-6">
      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
        <DashboardSidebar />
        <section>{children}</section>
      </div>
    </div>
  );
}
