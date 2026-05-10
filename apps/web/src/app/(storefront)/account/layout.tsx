import {
  AccountSidebar,
  AccountSegmentedNav,
} from "@/components/account/account-sidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="py-8 lg:py-12">
      <div className="container">
        <AccountSegmentedNav />
        <div className="mt-4 grid gap-8 lg:mt-0 lg:grid-cols-[260px,1fr]">
          <AccountSidebar />
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </section>
  );
}
