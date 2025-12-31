import {
  BriefcaseIcon,
  GlobeIcon,
  GraduationCapIcon,
  StethoscopeIcon,
} from "lucide-react";

import { useTranslations } from "next-intl";
import UseCase from "./UseCase";

const USE_CASES = [
  {
    keyword: "languages",
    icon: <GlobeIcon className="w-8 h-8 text-blue-500" />,
  },
  {
    keyword: "students",
    icon: <GraduationCapIcon className="w-8 h-8 text-yellow-500" />,
  },
  {
    keyword: "career",
    icon: <BriefcaseIcon className="w-8 h-8 text-primary" />,
  },
  {
    keyword: "pro",
    icon: <StethoscopeIcon className="w-8 h-8 text-red-500" />,
  },
];

export default function UseCases() {
  const t = useTranslations("home.useCases");

  return (
    <section
      id="use-cases"
      className="py-24 bg-linear-to-b from-background to-muted/30"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>

            <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {USE_CASES.map((u, i) => (
            <UseCase key={i} {...u} />
          ))}
        </div>
      </div>
    </section>
  );
}
