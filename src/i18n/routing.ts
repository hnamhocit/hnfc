import { useLocaleStore } from "@/stores";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "vi"],
  defaultLocale: useLocaleStore.getState().locale,
  localeDetection: true,
});
