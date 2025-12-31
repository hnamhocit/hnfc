"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

import LegalFooter from "@/components/legal/Footer";
import LegalHeader from "@/components/legal/Header";
import { Button } from "@/components/ui/button";

export default function DeleteAccountPage() {
  const tDeletion = useTranslations("legal.deletion");

  const dataItems = tDeletion.raw("data.items") as string[];
  const emailSubject = encodeURIComponent(
    tDeletion("options.email.subjectText"),
  );

  return (
    <main className="min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto p-4 md:p-8">
        <LegalHeader />

        {/* Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">
            {tDeletion("title")}
          </h1>

          <p className="mt-2 text-muted-foreground">{tDeletion("intro")}</p>
        </div>

        {/* Content Card */}
        <div className="rounded-2xl border border-border bg-card text-card-foreground shadow-sm p-8 space-y-10">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-primary">
              {tDeletion("options.title")}
            </h2>

            <p className="text-muted-foreground">
              {tDeletion("options.description")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-background/40 p-5 space-y-2">
                <div className="font-semibold text-foreground">
                  {tDeletion("options.email.title")}
                </div>

                <p className="text-sm text-muted-foreground">
                  {tDeletion("options.email.description")}
                </p>

                <div className="text-sm">
                  <div className="text-muted-foreground">
                    {tDeletion("options.email.to")}
                  </div>

                  <div className="font-medium text-foreground">
                    hnamhocit@gmail.com
                  </div>
                </div>

                <div className="text-sm">
                  <div className="text-muted-foreground">
                    {tDeletion("options.email.subject")}
                  </div>

                  <div className="font-medium text-foreground">
                    {tDeletion("options.email.subjectText")}
                  </div>
                </div>

                <Button asChild className="w-full mt-2">
                  <a
                    href={`mailto:hnamhocit@gmail.com?subject=${emailSubject}`}
                  >
                    {tDeletion("options.email.cta")}
                  </a>
                </Button>
              </div>

              <div className="rounded-xl border border-border bg-background/40 p-5 space-y-2">
                <div className="font-semibold text-foreground">
                  {tDeletion("options.inApp.title")}
                </div>

                <p className="text-sm text-muted-foreground">
                  {tDeletion("options.inApp.description")}
                </p>

                <Button asChild variant="secondary" className="w-full mt-2">
                  <Link href="/me/settings">
                    {tDeletion("options.inApp.cta")}
                  </Link>
                </Button>

                <p className="text-xs text-muted-foreground">
                  {tDeletion("options.inApp.note")}
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-primary">
              {tDeletion("data.title")}
            </h2>

            <ul className="list-disc pl-6 text-muted-foreground">
              {dataItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-primary">
              {tDeletion("verification.title")}
            </h2>

            <p className="text-muted-foreground">
              {tDeletion.rich("verification.body", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-primary">
              {tDeletion("links.title")}
            </h2>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="secondary" asChild>
                <Link href="/privacy">{tDeletion("links.privacy")}</Link>
              </Button>

              <Button asChild>
                <Link href="/dashboard">{tDeletion("links.home")}</Link>
              </Button>
            </div>
          </section>

          <div className="pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-xs text-muted-foreground">
              {tDeletion("notice")}
            </div>

            <div className="flex gap-3 text-sm">
              <Link className="text-primary hover:underline" href="/privacy">
                {tDeletion("links.privacy")}
              </Link>

              <Link className="text-primary hover:underline" href="/dashboard">
                {tDeletion("links.home")}
              </Link>
            </div>
          </div>
        </div>

        <LegalFooter />
      </div>
    </main>
  );
}
