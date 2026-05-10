"use client";

import * as React from "react";
import { Pencil, Plus, Star, Trash2, MapPin } from "lucide-react";
import { toast } from "sonner";
import { addresses as initialAddresses } from "@/data/account-mocks";
import { AccountPageHeader } from "@/components/account/account-page-header";

export default function AddressesPage() {
  const [list, setList] = React.useState(initialAddresses);

  function setDefault(id: string) {
    setList((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
    toast.success("Default address updated.");
  }
  function remove(id: string) {
    const a = list.find((x) => x.id === id);
    setList((prev) => prev.filter((x) => x.id !== id));
    toast.success(`${a?.label ?? "Address"} removed.`);
  }

  return (
    <div>
      <AccountPageHeader
        title="Addresses"
        description="Manage where your tools get delivered."
        actions={
          <button
            type="button"
            onClick={() =>
              toast.info("Address dialog placeholder.", {
                description: "The full add/edit form lives in the dialog.",
              })
            }
            className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="size-4" />
            Add address
          </button>
        }
      />

      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border bg-card p-12 text-center">
          <MapPin className="size-7 text-muted-foreground" />
          <h2 className="mt-3 font-display text-lg">No addresses saved.</h2>
        </div>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {list.map((a) => (
            <li
              key={a.id}
              className="rounded-2xl border bg-card p-5 transition-shadow hover:shadow-elev-2"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-display font-semibold">{a.label}</p>
                    {a.isDefault && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        <Star className="size-3" />
                        Default
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm font-medium">{a.recipient}</p>
                  <p className="text-sm text-muted-foreground">
                    {a.line1}{a.line2 ? `, ${a.line2}` : ""}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {a.city}, {a.region} {a.postal}
                  </p>
                  <p className="text-sm text-muted-foreground">{a.country}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {a.phone}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toast.info("Edit dialog placeholder.")}
                  aria-label={`Edit ${a.label}`}
                  className="grid size-9 place-items-center rounded-md border hover:bg-muted"
                >
                  <Pencil className="size-4" />
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 border-t pt-4">
                {!a.isDefault && (
                  <button
                    type="button"
                    onClick={() => setDefault(a.id)}
                    className="inline-flex h-9 items-center gap-1.5 rounded-md border bg-background px-3 text-xs font-medium hover:bg-muted"
                  >
                    <Star className="size-3.5" />
                    Set as default
                  </button>
                )}
                {!a.isDefault && (
                  <button
                    type="button"
                    onClick={() => remove(a.id)}
                    className="inline-flex h-9 items-center gap-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-3.5" />
                    Delete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
