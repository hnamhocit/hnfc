import { useTranslations } from "next-intl";

const categories = [
  "computerScience",
  "medical",
  "law",
  "languages",
  "history",
  "geography",
];

export default function Categories() {
  const t = useTranslations("home.categories");

  return (
    <section className="container mx-auto pb-20 px-4">
      <div className="flex flex-wrap justify-center gap-3 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
        {categories.map((c) => (
          <div
            key={c}
            className="px-4 py-2 rounded-full border border-border text-sm font-medium text-muted-foreground"
          >
            {t(c)}
          </div>
        ))}
      </div>
    </section>
  );
}
