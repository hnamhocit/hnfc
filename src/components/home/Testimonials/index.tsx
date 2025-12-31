import { useTranslations } from "next-intl";

import Testimonial from "./Testimonial";

export interface ITestimonial {
  quote: string;
  name: string;
  role: string;
}

export default function Testimonials() {
  const t = useTranslations("home.testimonials");

  return (
    <section className="container mx-auto py-24 px-4">
      <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
        {t("title")}
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {(t.raw("items") as ITestimonial[]).map((testimonial, index) => (
          <Testimonial key={index} {...testimonial} />
        ))}
      </div>
    </section>
  );
}
