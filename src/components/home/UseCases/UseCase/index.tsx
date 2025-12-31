import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

interface UseCaseProps {
  icon: ReactNode;
  keyword: string;
}

export default function UseCase({ icon, keyword }: UseCaseProps) {
  const t = useTranslations(`home.useCases.items.${keyword}`);

  return (
    <Card className="rounded-2xl overflow-hidden border-border/50 hover:border-primary/40 transition-all">
      <CardHeader className="bg-muted/30 pb-4">
        <div className="flex justify-between items-start">
          <div className="p-2 rounded-xl bg-background shadow-sm border border-border/50">
            {icon}
          </div>

          <Badge variant="outline">{t("tag")}</Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <CardTitle className="text-lg mb-2">{t("title")}</CardTitle>

        <p className="text-sm text-muted-foreground">{t("description")}</p>
      </CardContent>
    </Card>
  );
}
