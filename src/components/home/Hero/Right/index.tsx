import { KeyboardIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import FloatingDecoration from "./FloatingDecoration";

export default function Right() {
  const t = useTranslations("home.hero.session");

  return (
    <div className="relative">
      {/* Main App Window Mock */}
      <Card className="relative overflow-hidden rounded-[2rem] border-border/60 bg-background/60 backdrop-blur-xl shadow-2xl">
        <CardHeader className="border-b border-border/40 p-4 flex flex-row items-center justify-between">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <div className="w-3 h-3 rounded-full bg-green-400/80" />
          </div>

          <div className="text-xs font-medium text-muted-foreground">
            {t("header.title")}
          </div>

          <Badge
            variant="outline"
            className="text-xs h-5 border-primary/30 text-primary"
          >
            {t("header.live")}
          </Badge>
        </CardHeader>

        <CardContent className="p-6 md:p-8 space-y-8">
          {/* Flashcard View */}
          <div className="text-center space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
              {t("tag.definition")}
            </div>

            <div className="text-2xl md:text-3xl font-semibold leading-tight">
              {t("content.question")}
            </div>

            <div className="p-4 rounded-xl bg-muted/50 text-sm text-muted-foreground border border-border/50">
              {t("content.hint")}
            </div>
          </div>

          {/* Action Buttons Mock */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="col-span-2 flex justify-center gap-8 text-xs text-muted-foreground mb-2">
              <span className="flex items-center">
                <KeyboardIcon className="w-3 h-3 mr-1" />
                {t("meta.spaceToFlip")}
              </span>

              <span className="flex items-center">
                <KeyboardIcon className="w-3 h-3 mr-1" />
                {t("meta.rateShortcut")}
              </span>
            </div>

            <Button
              variant="outline"
              className="h-12 border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-red-900/30 dark:hover:bg-red-900/20"
            >
              {t("actions.again")}
            </Button>

            <Button className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
              {t("actions.good")}
            </Button>
          </div>
        </CardContent>
      </Card>

      <FloatingDecoration />
    </div>
  );
}
