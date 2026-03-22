import { DashboardSidebar } from "@/components/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container py-6">
      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
        <DashboardSidebar />
        <section>{children}</section>
      </div>
    </div>
  );
}
