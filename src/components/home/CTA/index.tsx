import { useTranslations } from "next-intl";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function CTA() {
  const t = useTranslations("home.cta");

  return (
    <section className="container mx-auto pb-24 px-4">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-primary text-primary-foreground p-8 md:p-16 text-center">
        {/* Abstract circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-900/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            {t("title")}
          </h2>

          <p className="text-lg text-primary-foreground/80">
            {t("description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/enter">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-bold h-14 px-8 text-lg shadow-xl"
              >
                {t("button")}
              </Button>
            </Link>
          </div>

          <p className="text-xs text-primary-foreground/60 mt-4">{t("note")}</p>
        </div>
      </div>
    </section>
  );
}
