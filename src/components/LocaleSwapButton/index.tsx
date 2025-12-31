"use client";

import { Button } from "@/components/ui/button";
import { useLocaleStore } from "@/stores";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

type Locale = "en" | "vi";

type Props = {
  className?: string;
};

function switchLocalePath(pathname: string, next: Locale) {
  const parts = pathname.split("/");
  if (parts.length > 1) parts[1] = next;
  return parts.join("/") || `/${next}`;
}

export default function LocaleSwapButton({ className }: Props) {
  const { locale, setLocale } = useLocaleStore();
  const next: Locale = locale === "en" ? "vi" : "en";
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("locale");

  // dir: en->vi = 1 (flip xuống), vi->en = -1 (flip lên)
  const [dir, setDir] = React.useState<1 | -1>(1);

  const onToggle = () => {
    setDir(locale === "en" ? 1 : -1);
    router.replace(switchLocalePath(pathname, next));
    setLocale(next);
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={onToggle}
      className={[
        "h-9 rounded-xl px-3 gap-2",
        "inline-flex items-center justify-center",
        className ?? "",
      ].join(" ")}
      aria-label={t("switch")}
      title={t("switch")}
    >
      {/* Icon transfer */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-80"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M20 10h-16l5.5 -6" />
        <path d="M4 14h16l-5.5 6" />
      </svg>

      {/* 3D flip label */}
      <span
        className="relative h-5 w-7 overflow-hidden"
        style={{ perspective: 600 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={locale}
            initial={{
              rotateX: -90 * dir, // chữ mới “đi từ phía sau” vào
              y: -6 * dir,
              opacity: 0,
            }}
            animate={{
              rotateX: 0,
              y: 0,
              opacity: 1,
            }}
            exit={{
              rotateX: 90 * dir, // chữ cũ “lật ra”
              y: 6 * dir,
              opacity: 0,
            }}
            transition={{
              duration: 0.22,
              ease: "easeInOut",
            }}
            className="absolute inset-0 flex items-center justify-center font-semibold tracking-wide"
            style={{ transformStyle: "preserve-3d" }}
          >
            {locale.toUpperCase()}
          </motion.span>
        </AnimatePresence>
      </span>
    </Button>
  );
}
