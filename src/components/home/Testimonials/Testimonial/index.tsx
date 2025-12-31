import { StarIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { ITestimonial } from "..";

export default function Testimonial({ quote, name, role }: ITestimonial) {
  return (
    <Card className="rounded-2xl border-none shadow-lg bg-linear-to-br from-background to-muted/50">
      <CardContent className="p-8">
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className="w-4 h-4 fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>

        <p className="text-base text-foreground/80 italic mb-6 leading-relaxed">
          "{quote}"
        </p>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-purple-400 flex items-center justify-center text-white font-bold">
            {name.charAt(0)}
          </div>

          <div>
            <div className="font-bold text-sm">{name}</div>
            <div className="text-xs text-muted-foreground">{role}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
