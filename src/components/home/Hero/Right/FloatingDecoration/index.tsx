import { CheckCircle2Icon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export default function FloatingDecoration() {
  const t = useTranslations("home.hero.session");
  return (
    <Card className="absolute -bottom-6 -left-6 w-48 p-4 rounded-2xl shadow-xl border-border/60 bg-background/80 backdrop-blur-md animate-bounce-slow hidden md:block">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
          <CheckCircle2Icon className="w-5 h-5" />
        </div>

        <div>
          <div className="text-sm font-bold">{t("streak.days")}</div>

          <div className="text-[10px] text-muted-foreground">
            {t("streak.label")}
          </div>
        </div>
      </div>
    </Card>
  );
}
