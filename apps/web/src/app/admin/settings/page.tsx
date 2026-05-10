import {
  Building2,
  Truck,
  Receipt,
  CreditCard,
  Mail,
  Boxes,
  Users,
  Plug,
  Save,
} from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export const metadata = { title: "Settings" };

const TABS = [
  { value: "general",    label: "General",     icon: Building2 },
  { value: "shipping",   label: "Shipping",    icon: Truck },
  { value: "tax",        label: "Tax",         icon: Receipt },
  { value: "payments",   label: "Payments",    icon: CreditCard },
  { value: "email",      label: "Email",       icon: Mail },
  { value: "inventory",  label: "Inventory",   icon: Boxes },
  { value: "roles",      label: "Roles",       icon: Users },
  { value: "integrations", label: "Integrations", icon: Plug },
];

export default function AdminSettingsPage() {
  return (
    <div>
      <AdminPageHeader
        eyebrowKey="admin.dashboard.eyebrow"
        titleKey="admin.settings.title"
        descriptionKey="admin.settings.description"
      />

      <Tabs defaultValue="general">
        <TabsList className="overflow-x-auto border-b">
          {TABS.map((t) => (
            <TabsTrigger key={t.value} value={t.value} className="gap-2">
              <t.icon className="size-4" />
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="general" className="py-6">
          <Section title="Store">
            <Field label="Store name" defaultValue="Auto Tools" />
            <Field label="Support email" type="email" defaultValue="support@autotools.io" />
            <Selector label="Currency" options={["USD", "EUR", "GBP", "AED"]} />
            <Selector label="Timezone" options={["America/Los_Angeles", "America/New_York", "Europe/London", "Asia/Dubai"]} />
            <Selector label="Locale" options={["en-US", "en-GB", "fr-FR", "ar-AE"]} />
          </Section>
          <SaveBar />
        </TabsContent>

        <TabsContent value="shipping" className="py-6">
          <Section title="Methods">
            <p className="text-sm text-muted-foreground">
              Configure standard, express, and pickup methods. The full editor lives in this tab.
            </p>
            <ul className="mt-4 space-y-3">
              {[
                { name: "Standard", price: "$15.00", eta: "1–2 business days" },
                { name: "Express",  price: "$35.00", eta: "Next business day" },
                { name: "Pickup",   price: "Free",   eta: "Same day, 8–17" },
              ].map((m) => (
                <li
                  key={m.name}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-md border bg-background p-4"
                >
                  <div>
                    <p className="font-medium">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.eta}</p>
                  </div>
                  <span className="text-sm font-medium">{m.price}</span>
                </li>
              ))}
            </ul>
          </Section>
          <SaveBar />
        </TabsContent>

        <TabsContent value="tax" className="py-6">
          <Section title="Tax classes">
            <Field label="Default rate" defaultValue="8.0%" />
            <p className="text-sm text-muted-foreground">
              Region-specific rates and tax-inclusive pricing options live here.
            </p>
          </Section>
          <SaveBar />
        </TabsContent>

        <TabsContent value="payments" className="py-6">
          <Section title="Stripe">
            <FieldMasked label="Publishable key" value="pk_live_•••••••••••••••••••••••••••••••••••" />
            <FieldMasked label="Secret key"      value="sk_live_•••••••••••••••••••••••••••••••••••" />
            <FieldMasked label="Webhook secret"  value="whsec_••••••••••••••••••••••••" />
            <p className="text-sm text-muted-foreground">
              Sensitive keys are write-only. We display the last few characters
              for verification.
            </p>
          </Section>
          <Section title="Methods enabled">
            <ul className="grid gap-2 md:grid-cols-3">
              {["Card", "Apple Pay", "Google Pay", "Klarna", "Bank transfer", "PO (Net-30)"].map((m) => (
                <li
                  key={m}
                  className="flex items-center justify-between rounded-md border bg-background px-3 py-2 text-sm"
                >
                  <span>{m}</span>
                  <input type="checkbox" defaultChecked={["Card", "Apple Pay", "Google Pay"].includes(m)} className="size-4" />
                </li>
              ))}
            </ul>
          </Section>
          <SaveBar />
        </TabsContent>

        <TabsContent value="email" className="py-6">
          <Section title="Provider">
            <Field label="Provider" defaultValue="Postmark" />
            <Field label="From address" type="email" defaultValue="orders@autotools.io" />
          </Section>
          <Section title="Templates">
            <ul className="space-y-2">
              {["Order confirmation", "Shipping notification", "Reservation reminder", "Refund issued"].map((t) => (
                <li key={t} className="flex items-center justify-between rounded-md border bg-background px-3 py-2 text-sm">
                  <span>{t}</span>
                  <button className="text-xs font-medium text-primary hover:underline">Preview</button>
                </li>
              ))}
            </ul>
          </Section>
          <SaveBar />
        </TabsContent>

        <TabsContent value="inventory" className="py-6">
          <Section title="Defaults">
            <Field label="Low-stock threshold" defaultValue="3" />
            <Field label="Reservation duration (hours)" defaultValue="24" />
          </Section>
          <SaveBar />
        </TabsContent>

        <TabsContent value="roles" className="py-6">
          <Section title="Roles">
            <ul className="space-y-2">
              {[
                "SUPER_ADMIN",
                "ADMIN",
                "MANAGER",
                "STAFF",
                "CUSTOMER",
              ].map((r) => (
                <li key={r} className="flex items-center justify-between rounded-md border bg-background px-3 py-2 text-sm">
                  <span className="font-mono">{r}</span>
                  <button className="text-xs font-medium text-primary hover:underline">
                    Manage permissions
                  </button>
                </li>
              ))}
            </ul>
          </Section>
        </TabsContent>

        <TabsContent value="integrations" className="py-6">
          <Section title="Connected">
            <ul className="grid gap-3 md:grid-cols-2">
              {[
                { name: "Stripe",    status: "connected" },
                { name: "Postmark",  status: "connected" },
                { name: "Sentry",    status: "disconnected" },
                { name: "Posthog",   status: "disconnected" },
              ].map((i) => (
                <li
                  key={i.name}
                  className="flex items-center justify-between rounded-md border bg-background p-4"
                >
                  <p className="font-medium">{i.name}</p>
                  <span
                    className={
                      "rounded-md border px-2 py-0.5 text-xs font-medium " +
                      (i.status === "connected"
                        ? "border-success/30 bg-success/10 text-success"
                        : "border-border bg-muted text-muted-foreground")
                    }
                  >
                    {i.status}
                  </span>
                </li>
              ))}
            </ul>
          </Section>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6 rounded-2xl border bg-card p-6">
      <h2 className="font-display text-base font-semibold">{title}</h2>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  defaultValue,
  type = "text",
}: {
  label: string;
  defaultValue?: string;
  type?: string;
}) {
  return (
    <div className="grid gap-1.5 sm:grid-cols-[200px,1fr] sm:items-center sm:gap-4">
      <label className="text-sm text-muted-foreground">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="h-10 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
      />
    </div>
  );
}

function FieldMasked({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1.5 sm:grid-cols-[200px,1fr] sm:items-center sm:gap-4">
      <label className="text-sm text-muted-foreground">{label}</label>
      <div className="flex items-center gap-2">
        <input
          readOnly
          value={value}
          className="h-10 w-full rounded-md border bg-muted/50 px-3 font-mono text-sm"
        />
        <button className="inline-flex h-10 items-center rounded-md border bg-background px-3 text-xs font-medium hover:bg-muted">
          Rotate
        </button>
      </div>
    </div>
  );
}

function Selector({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <div className="grid gap-1.5 sm:grid-cols-[200px,1fr] sm:items-center sm:gap-4">
      <label className="text-sm text-muted-foreground">{label}</label>
      <select className="h-10 rounded-md border bg-background px-3 text-sm">
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function SaveBar() {
  return (
    <div className="sticky bottom-4 mt-6 flex items-center justify-end gap-2 rounded-xl border bg-card p-3 shadow-elev-3">
      <button className="inline-flex h-10 items-center rounded-md text-sm font-medium text-muted-foreground hover:text-foreground">
        Discard
      </button>
      <button className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        <Save className="size-4" />
        Save changes
      </button>
    </div>
  );
}
