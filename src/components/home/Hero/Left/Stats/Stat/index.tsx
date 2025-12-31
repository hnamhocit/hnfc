import { useTranslations } from "next-intl";

interface StatProps {
  label: string;
  value: string;
}

export default function Stat({ label, value }: StatProps) {
  const t = useTranslations("home.hero.stats");

  return (
    <div key={label}>
      <div className="text-2xl font-bold text-foreground">{value}</div>

      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mt-1">
        {t(label)}
      </div>
    </div>
  );
}
