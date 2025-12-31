import { useTranslations } from "next-intl";
import Link from "next/link";

export default function LegalFooter() {
  const tFooter = useTranslations("legal.footer");

  return (
    <footer className="mt-10 text-xs text-muted-foreground flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <div>© {new Date().getFullYear()} hnfc</div>
      <div className="flex gap-3">
        <Link className="hover:underline" href="/privacy">
          {tFooter("privacy")}
        </Link>

        <Link className="hover:underline" href="/terms">
          {tFooter("terms")}
        </Link>

        <Link className="hover:underline" href="/delete-account">
          {tFooter("deletion")}
        </Link>
      </div>
    </footer>
  );
}
