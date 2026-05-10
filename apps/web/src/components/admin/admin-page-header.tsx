"use client";

import { useI18n } from "@/i18n/i18n-provider";
import type { TKey } from "@/i18n/dictionaries/en";

type Props = {
  /** Optional translation key. Takes precedence over `eyebrow`. */
  eyebrowKey?: TKey;
  eyebrow?: string;
  /** Optional translation key. Takes precedence over `title`. */
  titleKey?: TKey;
  title?: string;
  /** Optional translation key. Takes precedence over `description`. */
  descriptionKey?: TKey;
  description?: string;
  /** Params interpolated into the keyed translations. */
  params?: Record<string, string | number>;
  actions?: React.ReactNode;
};

export function AdminPageHeader({
  eyebrowKey,
  eyebrow,
  titleKey,
  title,
  descriptionKey,
  description,
  params,
  actions,
}: Props) {
  const { t } = useI18n();
  const resolvedEyebrow = eyebrowKey ? t(eyebrowKey, params) : eyebrow;
  const resolvedTitle = titleKey ? t(titleKey, params) : title;
  const resolvedDescription = descriptionKey
    ? t(descriptionKey, params)
    : description;

  return (
    <header className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        {resolvedEyebrow && (
          <p
            className="text-eyebrow uppercase text-muted-foreground"
            suppressHydrationWarning
          >
            {resolvedEyebrow}
          </p>
        )}
        {resolvedTitle && (
          <h1
            className="mt-1 font-display text-display-sm md:text-display-md"
            suppressHydrationWarning
          >
            {resolvedTitle}
          </h1>
        )}
        {resolvedDescription && (
          <p
            className="mt-2 max-w-2xl text-sm text-muted-foreground"
            suppressHydrationWarning
          >
            {resolvedDescription}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
}
