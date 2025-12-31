import { useTranslations } from "next-intl";
import { ReactNode } from "react";

interface StepProps {
  icon: ReactNode;
  step: number;
  keyword: string;
}

export default function Step({ icon, step, keyword }: StepProps) {
  const t = useTranslations(`home.howItWorks.steps.${keyword}`);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative w-24 h-24 rounded-full bg-background border-4 border-muted flex items-center justify-center mb-6 shadow-sm z-10">
        <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          {icon}
        </div>

        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm border-4 border-background">
          {step}
        </div>
      </div>

      <h3 className="text-xl font-bold mb-2">{t("title")}</h3>

      <p className="text-muted-foreground max-w-xs">{t("description")}</p>
    </div>
  );
}
