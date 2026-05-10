"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ShieldCheck,
  Smartphone,
  Laptop,
  Monitor,
  KeyRound,
} from "lucide-react";
import { toast } from "sonner";
import { sessions as initialSessions } from "@/data/account-mocks";
import { AccountPageHeader } from "@/components/account/account-page-header";

const PasswordSchema = z
  .object({
    current: z.string().min(1, "Enter your current password."),
    next:    z.string().min(8, "At least 8 characters."),
    confirm: z.string(),
  })
  .refine((d) => d.next === d.confirm, {
    message: "Passwords don't match.",
    path: ["confirm"],
  });
type PasswordValues = z.infer<typeof PasswordSchema>;

export default function SecurityPage() {
  const [sessions, setSessions] = React.useState(initialSessions);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordValues>({ resolver: zodResolver(PasswordSchema) });

  async function onSubmit(_v: PasswordValues) {
    await new Promise((r) => setTimeout(r, 600));
    reset();
    toast.success("Password updated.");
  }

  function endSession(id: string) {
    const s = sessions.find((x) => x.id === id);
    setSessions((prev) => prev.filter((x) => x.id !== id));
    toast.success(`Signed out ${s?.device}.`);
  }

  return (
    <div className="space-y-6">
      <AccountPageHeader
        title="Security"
        description="Update your password and review where you're signed in."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="rounded-2xl border bg-card p-6"
      >
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-md bg-muted">
            <KeyRound className="size-5" />
          </span>
          <div>
            <h2 className="font-display text-base font-semibold">Password</h2>
            <p className="text-xs text-muted-foreground">
              Use at least 8 characters. Don't reuse passwords across services.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Pwd label="Current password" {...register("current")} error={errors.current?.message} />
          <Pwd label="New password" {...register("next")} error={errors.next?.message} />
          <Pwd label="Confirm new password" {...register("confirm")} error={errors.confirm?.message} />
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {isSubmitting ? "Updating…" : "Update password"}
          </button>
        </div>
      </form>

      <section className="rounded-2xl border bg-card">
        <header className="border-b p-6">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-md bg-muted">
              <ShieldCheck className="size-5" />
            </span>
            <div>
              <h2 className="font-display text-base font-semibold">Active sessions</h2>
              <p className="text-xs text-muted-foreground">
                Sign out of devices you don't recognize.
              </p>
            </div>
          </div>
        </header>
        <ul className="divide-y">
          {sessions.map((s) => {
            const Icon = s.device.toLowerCase().includes("phone")
              ? Smartphone
              : s.device.toLowerCase().includes("desktop")
              ? Monitor
              : Laptop;
            return (
              <li
                key={s.id}
                className="flex items-center gap-4 p-5"
              >
                <span className="grid size-10 place-items-center rounded-md bg-muted">
                  <Icon className="size-5" />
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{s.device}</p>
                    {s.current && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                        This device
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {s.browser} · {s.location} · {s.lastActive}
                  </p>
                </div>
                {!s.current && (
                  <button
                    type="button"
                    onClick={() => endSession(s.id)}
                    className="inline-flex h-9 items-center rounded-md border bg-background px-3 text-xs font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    Sign out
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="rounded-2xl border border-dashed bg-card p-6">
        <p className="text-eyebrow uppercase text-muted-foreground">
          Two-factor authentication
        </p>
        <p className="mt-2 text-sm">
          Add an extra layer of security to your account. <span className="font-medium">Coming soon.</span>
        </p>
      </section>
    </div>
  );
}

const Pwd = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }
>(function Pwd({ label, error, ...props }, ref) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium" htmlFor={props.name}>
        {label}
      </label>
      <input
        id={props.name}
        ref={ref}
        type="password"
        autoComplete="off"
        {...props}
        aria-invalid={!!error}
        className={
          "h-11 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30 " +
          (error ? "border-destructive" : "")
        }
      />
      {error && (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});
