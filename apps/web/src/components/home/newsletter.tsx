"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Mail } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/i18n-provider";

const Schema = z.object({
  email: z.email("Enter a valid email address."),
});
type FormValues = z.infer<typeof Schema>;

export function Newsletter() {
  const { t } = useI18n();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(Schema) });

  function onSubmit(values: FormValues) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        toast.success(t("home.newsletter.success"), {
          description: values.email,
        });
        reset();
        resolve();
      }, 600);
    });
  }

  return (
    <section className="bg-brand-steel-950 py-16 text-white lg:py-20">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p
              className="text-eyebrow uppercase text-white/60"
              suppressHydrationWarning
            >
              {t("home.newsletter.eyebrow")}
            </p>
            <h2
              className="mt-2 font-display text-display-sm md:text-display-md"
              suppressHydrationWarning
            >
              {t("home.newsletter.title")}
            </h2>
            <p
              className="mt-3 max-w-md text-sm text-white/70"
              suppressHydrationWarning
            >
              {t("home.newsletter.subtitle")}
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3 lg:justify-self-end"
            noValidate
          >
            <div className="flex w-full max-w-lg items-center gap-2 rounded-lg border border-white/15 bg-white/5 p-1.5 backdrop-blur transition-colors focus-within:border-white/30">
              <span className="ml-2 grid size-9 place-items-center rounded-md bg-white/10 text-white/80">
                <Mail className="size-4" />
              </span>
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder={t("home.newsletter.placeholder")}
                aria-invalid={!!errors.email}
                {...register("email")}
                suppressHydrationWarning
                className="h-11 flex-1 bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "inline-flex h-11 items-center gap-2 rounded-md bg-brand-orange-500 px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-brand-orange-600 disabled:opacity-60"
                )}
                suppressHydrationWarning
              >
                {isSubmitting
                  ? t("home.newsletter.sending")
                  : t("home.newsletter.subscribe")}
                <ArrowRight className="size-4" />
              </button>
            </div>
            {errors.email && (
              <p className="text-xs text-destructive" role="alert">
                {errors.email.message}
              </p>
            )}
            <p
              className="max-w-md text-xs text-white/50"
              suppressHydrationWarning
            >
              {t("home.newsletter.legal")}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
