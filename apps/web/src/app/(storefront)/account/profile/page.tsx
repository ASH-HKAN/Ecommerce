"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BadgeCheck, Save } from "lucide-react";
import { toast } from "sonner";
import { currentCustomer } from "@/data/account-mocks";
import { AccountPageHeader } from "@/components/account/account-page-header";

const Schema = z.object({
  firstName: z.string().min(1, "Enter your first name."),
  lastName:  z.string().min(1, "Enter your last name."),
  email:     z.email("Enter a valid email address."),
  phone:     z.string().min(6, "Enter your phone number."),
  workshop:  z.string().optional(),
  locale:    z.string().min(2),
  marketingOptIn: z.boolean(),
});

type FormValues = z.infer<typeof Schema>;

export default function ProfilePage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: {
      firstName: currentCustomer.firstName,
      lastName:  currentCustomer.lastName,
      email:     currentCustomer.email,
      phone:     currentCustomer.phone,
      workshop:  currentCustomer.workshop ?? "",
      locale:    currentCustomer.locale,
      marketingOptIn: currentCustomer.marketingOptIn,
    },
  });

  async function onSubmit(values: FormValues) {
    await new Promise((r) => setTimeout(r, 600));
    reset(values);
    toast.success("Changes saved.");
  }

  return (
    <div>
      <AccountPageHeader
        title="Profile"
        description="Update your contact details and preferences."
      />

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="rounded-2xl border bg-card p-6">
          <h2 className="font-display text-base font-semibold">Personal info</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Field label="First name" {...register("firstName")} error={errors.firstName?.message} />
            <Field label="Last name" {...register("lastName")} error={errors.lastName?.message} />
            <div className="md:col-span-2">
              <Field
                label="Email"
                type="email"
                trailing={
                  currentCustomer.emailVerified ? (
                    <span className="inline-flex items-center gap-1 text-xs text-success">
                      <BadgeCheck className="size-3.5" />
                      Verified
                    </span>
                  ) : null
                }
                {...register("email")}
                error={errors.email?.message}
              />
            </div>
            <Field label="Phone" type="tel" {...register("phone")} error={errors.phone?.message} />
            <Field label="Workshop (optional)" {...register("workshop")} />
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6">
          <h2 className="font-display text-base font-semibold">Preferences</h2>
          <div className="mt-5 space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="locale" className="text-xs font-medium">
                Language
              </label>
              <select
                id="locale"
                {...register("locale")}
                className="h-11 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
              >
                <option value="en-US">English (US)</option>
                <option value="en-GB">English (UK)</option>
                <option value="es-ES">Español</option>
                <option value="fr-FR">Français</option>
                <option value="de-DE">Deutsch</option>
                <option value="ar-AE">العربية</option>
              </select>
            </div>
            <label className="flex items-start gap-3 rounded-md border bg-muted/30 p-4">
              <input
                type="checkbox"
                {...register("marketingOptIn")}
                className="mt-1 size-4"
              />
              <span className="text-sm">
                <span className="font-medium">Marketing emails</span>
                <span className="ml-2 text-muted-foreground">
                  New arrivals, restocks, and deals — about one email a week.
                  Unsubscribe anytime.
                </span>
              </span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => reset()}
            disabled={!isDirty || isSubmitting}
            className="inline-flex h-11 items-center rounded-md text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-40"
          >
            Discard
          </button>
          <button
            type="submit"
            disabled={!isDirty || isSubmitting}
            className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            <Save className="size-4" />
            {isSubmitting ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

const Field = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
    trailing?: React.ReactNode;
  }
>(function Field({ label, error, trailing, ...props }, ref) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={props.name} className="text-xs font-medium">
          {label}
        </label>
        {trailing}
      </div>
      <input
        id={props.name}
        ref={ref}
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
