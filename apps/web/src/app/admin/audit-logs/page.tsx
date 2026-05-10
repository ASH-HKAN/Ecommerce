import { Search, Shield } from "lucide-react";
import { auditLog } from "@/data/admin-mocks";
import { AdminPageHeader } from "@/components/admin/admin-page-header";

export const metadata = { title: "Audit logs" };

export default function AdminAuditLogsPage() {
  return (
    <div>
      <AdminPageHeader
        eyebrowKey="admin.dashboard.eyebrow"
        titleKey="admin.auditLogs.title"
        descriptionKey="admin.auditLogs.description"
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Actor, action, or entity"
            className="h-10 w-full rounded-md border bg-background pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>
        <select className="h-10 rounded-md border bg-background px-3 text-sm">
          <option>All actions</option>
          <option>order.*</option>
          <option>product.*</option>
          <option>inventory.*</option>
          <option>user.*</option>
          <option>settings.*</option>
        </select>
        <select className="h-10 rounded-md border bg-background px-3 text-sm">
          <option>All actors</option>
          <option>admin@autotools.io</option>
          <option>manager@autotools.io</option>
          <option>staff@autotools.io</option>
        </select>
      </div>

      <div className="rounded-2xl border bg-card">
        <div className="hidden grid-cols-12 gap-3 border-b bg-muted/40 px-5 py-3 text-eyebrow uppercase text-muted-foreground md:grid">
          <div className="col-span-2">Time</div>
          <div className="col-span-3">Actor</div>
          <div className="col-span-3">Action</div>
          <div className="col-span-3">Entity</div>
          <div className="col-span-1 text-right">IP</div>
        </div>
        <ul className="divide-y">
          {auditLog.map((e) => (
            <li
              key={e.id}
              className="grid grid-cols-1 gap-3 px-5 py-4 hover:bg-muted/40 md:grid-cols-12 md:items-center"
            >
              <div className="col-span-2 text-xs text-muted-foreground">
                {new Date(e.ts).toLocaleString()}
              </div>
              <div className="col-span-3 flex items-center gap-2 text-sm">
                <span className="grid size-7 place-items-center rounded-full bg-muted text-[10px] font-semibold uppercase">
                  {e.actor.split("@")[0].slice(0, 2)}
                </span>
                <span className="truncate font-medium">{e.actor}</span>
              </div>
              <div className="col-span-3">
                <span className="rounded-md border bg-info/5 px-2 py-0.5 font-mono text-xs text-info">
                  {e.action}
                </span>
              </div>
              <div className="col-span-3 text-sm">
                <span className="text-muted-foreground">{e.entityType}</span>
                <span className="mx-1 text-muted-foreground">·</span>
                <span className="font-medium">{e.entity}</span>
              </div>
              <div className="col-span-1 text-right font-mono text-xs text-muted-foreground">
                {e.ip}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
        <Shield className="size-3.5" />
        Audit log entries are immutable. Export is permission-gated.
      </p>
    </div>
  );
}
