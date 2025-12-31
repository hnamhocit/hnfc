"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

import LegalFooter from "@/components/legal/Footer";
import LegalHeader from "@/components/legal/Header";
import { Button } from "@/components/ui/button";

type PrivacySection = {
  title: string;
  body?: string;
  list?: string[];
};

export default function PrivacyPage() {
  const tPrivacy = useTranslations("legal.privacy");
  const tLegalCommon = useTranslations("legal.common");

  const sections = tPrivacy.raw("sections") as PrivacySection[];
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
            {tPrivacy("title")}
          </h1>
          <p className="mt-2 text-muted-foreground">{tPrivacy("intro")}</p>
        </div>

        {/* Content Card */}
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
            </section>
          ))}

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-primary">
              {tPrivacy("contact.title")}
            </h2>
            <p className="text-muted-foreground">{tPrivacy("contact.intro")}</p>
            <div className="rounded-xl border border-border bg-background/40 p-4">
              <div className="text-sm text-muted-foreground">
                {tPrivacy("contact.emailLabel")}
              </div>
              <div className="font-medium text-foreground">
                hnamhocit@gmail.com
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button asChild>
                <Link href="/delete-account">
                  {tPrivacy("cta.requestDeletion")}
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/me/settings">{tPrivacy("cta.goSettings")}</Link>
              </Button>
            </div>
          </section>

          <div className="pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-xs text-muted-foreground">{lastUpdated}</div>
            <div className="flex gap-3 text-sm">
              <Link className="text-primary hover:underline" href="/dashboard">
                {tPrivacy("links.home")}
              </Link>
              <Link
                className="text-primary hover:underline"
                href="/delete-account"
              >
                {tPrivacy("links.deletion")}
              </Link>
            </div>
          </div>
        </div>

        <LegalFooter />
      </div>
    </main>
  );
}
