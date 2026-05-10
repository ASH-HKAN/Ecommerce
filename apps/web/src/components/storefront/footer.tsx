"use client";

import Link from "next/link";
import { Wrench, Globe, AtSign, Share2, Mail } from "lucide-react";
import { categories, brands } from "@/data/mocks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { useI18n } from "@/i18n/i18n-provider";

const supportLinks = [
  { href: "/contact", label: "Contact" },
  { href: "/shipping", label: "Shipping" },
  { href: "/returns", label: "Returns" },
  { href: "/warranty", label: "Warranty" },
  { href: "/help", label: "Help center" },
];

const aboutLinks = [
  { href: "/about", label: "About us" },
  { href: "/careers", label: "Careers" },
  { href: "/press", label: "Press" },
  { href: "/sustainability", label: "Sustainability" },
];

const legalLinks = [
  { href: "/legal/terms", label: "Terms" },
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/cookies", label: "Cookies" },
];

const social = [
  { Icon: Globe,  label: "Website" },
  { Icon: AtSign, label: "Newsletter" },
  { Icon: Share2, label: "Share" },
  { Icon: Mail,   label: "Email" },
];

export function Footer() {
  const { t, locale } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-card">
      <div className="container py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-md bg-foreground text-background">
                <Wrench className="size-4" />
              </span>
              <span className="font-display text-base font-bold tracking-tight">
                AUTO<span className="text-primary">TOOLS</span>
              </span>
            </Link>
            <p
              className="max-w-sm text-sm text-muted-foreground"
              suppressHydrationWarning
            >
              {t("footer.newsletter.description")}
            </p>
            <div className="flex items-center gap-2 pt-2">
              {social.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
              <div className="ml-1">
                <LanguageSwitcher variant="compact" />
              </div>
            </div>
          </div>

          <div className="hidden gap-8 md:grid md:grid-cols-3 lg:col-span-8">
            <FooterColumn title={t("footer.shop")}>
              {categories.map((c) => (
                <li key={c.id}>
                  <FooterLink href={`/categories/${c.slug}`}>{c.name}</FooterLink>
                </li>
              ))}
            </FooterColumn>
            <FooterColumn title={t("footer.support")}>
              {supportLinks.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </FooterColumn>
            <FooterColumn title={t("footer.company")}>
              {aboutLinks.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </FooterColumn>
          </div>

          <div className="md:hidden">
            <Accordion multiple className="w-full">
              <AccordionItem value="shop">
                <AccordionTrigger>{t("footer.shop")}</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {categories.map((c) => (
                      <li key={c.id}>
                        <FooterLink href={`/categories/${c.slug}`}>{c.name}</FooterLink>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="support">
                <AccordionTrigger>{t("footer.support")}</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {supportLinks.map((l) => (
                      <li key={l.href}>
                        <FooterLink href={l.href}>{l.label}</FooterLink>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="company">
                <AccordionTrigger>{t("footer.company")}</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {aboutLinks.map((l) => (
                      <li key={l.href}>
                        <FooterLink href={l.href}>{l.label}</FooterLink>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <p
            className="mb-4 text-eyebrow uppercase text-muted-foreground"
            suppressHydrationWarning
          >
            {t("nav.brands")}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {brands.map((b) => (
              <li
                key={b.id}
                className="font-display text-sm font-bold tracking-wider text-muted-foreground"
              >
                {b.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p suppressHydrationWarning>
            {t("footer.copyright", { year })}
          </p>
          <ul className="flex flex-wrap items-center gap-4">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-2" lang="en" dir="ltr" key={locale}>
              <span className="rounded border bg-muted px-2 py-0.5 font-mono text-[10px] tracking-wider">VISA</span>
              <span className="rounded border bg-muted px-2 py-0.5 font-mono text-[10px] tracking-wider">MC</span>
              <span className="rounded border bg-muted px-2 py-0.5 font-mono text-[10px] tracking-wider">AMEX</span>
              <span className="rounded border bg-muted px-2 py-0.5 font-mono text-[10px] tracking-wider">APPLE PAY</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p
        className="mb-4 text-eyebrow uppercase text-muted-foreground"
        suppressHydrationWarning
      >
        {title}
      </p>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
    </Link>
  );
}
