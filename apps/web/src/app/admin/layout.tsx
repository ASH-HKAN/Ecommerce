import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";

export const metadata = {
  title: { default: "Admin", template: "%s · Auto Tools Admin" },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[260px,1fr]">
      <aside className="hidden bg-brand-steel-950 text-white lg:block">
        <div className="sticky top-0 h-screen">
          <AdminSidebar />
        </div>
      </aside>
      <div className="flex min-h-screen flex-col bg-muted/40">
        <AdminTopbar />
        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
