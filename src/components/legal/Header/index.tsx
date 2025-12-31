"use client";

import { useTranslations } from "next-intl";
import { ChevronLeftIcon, HomeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "../../ui/button";

export default function LegalHeader() {
  const router = useRouter();
  const tLegal = useTranslations("legal.header");
  const tCommon = useTranslations("common");

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
      <div className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt={tCommon("logoAlt")}
          width={44}
          height={44}
          className="rounded-xl"
          priority
        />

        <div className="leading-tight">
          <div className="text-lg font-semibold text-foreground">hnfc</div>

          <div className="text-sm text-muted-foreground">
            {tLegal("subtitle")}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="secondary" onClick={() => router.back()}>
          <ChevronLeftIcon />
          {tCommon("back")}
        </Button>

        <Link href="/dashboard">
          <Button>
            <HomeIcon />
            {tLegal("home")}
          </Button>
        </Link>
      </div>
    </header>
  );
}
