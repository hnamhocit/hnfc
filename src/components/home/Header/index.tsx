import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import LocaleSwapButton from "@/components/LocaleSwapButton";
import { Button } from "@/components/ui/button";

const items = ["features", "howItWorks", "useCases", "pricing"];

export default function Header() {
  const t = useTranslations("home.nav");

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl shadow-sm group-hover:shadow-primary/20 transition-all">
            <Image src="/logo.png" alt="hnfc" fill className="object-cover" />
          </div>

          <div className="leading-tight">
            <div className="text font-bold tracking-tight">hnfc</div>

            <div className="text-xs text-muted-foreground">
              Flashcards, made simple
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {items.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {t(item)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwapButton />

          <Link href="/enter">
            <Button variant="ghost" className="hidden sm:inline-flex">
              {t("signIn")}
            </Button>
          </Link>

          <Link href="/enter">
            <Button className="font-semibold shadow-lg shadow-primary/20">
              {t("getStarted")}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
