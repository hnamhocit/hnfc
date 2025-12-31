"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

import LegalFooter from "@/components/legal/Footer";
import LegalHeader from "@/components/legal/Header";
import { Button } from "@/components/ui/button";

type TermsSection = {
  title: string;
  body?: string;
  list?: string[];
  emailLabel?: string;
};

export default function TermsPage() {
  const tTerms = useTranslations("legal.terms");
  const tLegalCommon = useTranslations("legal.common");

  const sections = tTerms.raw("sections") as TermsSection[];
  const lastUpdated = tLegalCommon("lastUpdated", {
    date: new Date().toLocaleDateString(),
  });

  return (
    <main className="min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto p-4 md:p-8">
        <LegalHeader />

        {/* Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">
            {tTerms("title")}
          </h1>
          <p className="mt-2 text-muted-foreground">{tTerms("intro")}</p>
        </div>

        {/* Content */}
        <div className="rounded-2xl border border-border bg-card text-card-foreground shadow-sm p-8 space-y-10">
          {sections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h2 className="text-xl font-semibold text-primary">
                {section.title}
              </h2>
              {section.body ? (
                <p className="text-muted-foreground">{section.body}</p>
              ) : null}
              {section.list ? (
                <ul className="list-disc pl-6 text-muted-foreground">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {section.emailLabel ? (
                <div className="rounded-xl border border-border bg-background/40 p-4">
                  <div className="text-sm text-muted-foreground">
                    {section.emailLabel}
                  </div>
                  <div className="font-medium text-foreground">
                    hnamhocit@gmail.com
                  </div>
                </div>
              ) : null}
            </section>
          ))}

          <section className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button asChild>
                <Link href="/delete-account">
                  {tTerms("cta.deleteAccount")}
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/privacy">{tTerms("cta.viewPrivacy")}</Link>
              </Button>
            </div>
          </section>

          <div className="pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-xs text-muted-foreground">{lastUpdated}</div>
            <div className="flex gap-3 text-sm">
              <Link className="text-primary hover:underline" href="/privacy">
                {tTerms("cta.viewPrivacy")}
              </Link>
              <Link
                className="text-primary hover:underline"
                href="/delete-account"
              >
                {tTerms("cta.deletion")}
              </Link>
              <Link className="text-primary hover:underline" href="/dashboard">
                {tTerms("cta.home")}
              </Link>
            </div>
          </div>
        </div>

        <LegalFooter />
      </div>
    </main>
  );
}
