import { format } from "date-fns";
import { useTranslations } from "next-intl";
import { Clock, Edit, MoreVertical, RotateCw, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { CardState, ICard } from "@/interfaces";
import { cardService } from "@/services";

interface CardItemProps {
  card: ICard;
  setCards: Dispatch<SetStateAction<ICard[]>>;
}

const getStateBadgeClass = (state: CardState) => {
  switch (state) {
    case "new":
      return "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:bg-blue-500/15 dark:text-blue-300";
    case "learning":
      return "bg-amber-500/10 text-amber-700 border-amber-500/20 dark:bg-amber-500/15 dark:text-amber-300";
    case "review":
      return "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:bg-emerald-500/15 dark:text-emerald-300";
    case "relearning":
      return "bg-rose-500/10 text-rose-700 border-rose-500/20 dark:bg-rose-500/15 dark:text-rose-300";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

export default function CardItem({ card, setCards }: CardItemProps) {
  const router = useRouter();
  const tStates = useTranslations("cards.states");
  const tCommon = useTranslations("common");
  const tCards = useTranslations("cards");

  const formattedDueDate = card.srs?.dueAt?.toDate
    ? format(card.srs.dueAt.toDate(), "MMM dd, yyyy")
    : tCards("notAvailable");

  const state = card.srs?.state ?? "new";
  const reps = card.srs?.reps ?? 0;

  return (
    <Card className="group flex flex-col h-full bg-card border-border shadow-sm hover:shadow-md transition-all">
      {/* HEADER */}
      <CardHeader className="flex flex-row items-center justify-between px-6 py-4 space-y-0">
        <Badge
          variant="outline"
          className={`rounded-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-none ${getStateBadgeClass(
            state,
          )}`}
        >
          {tStates(state)}
        </Badge>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-muted-foreground/70 hover:text-foreground"
            >
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">{tCommon("more")}</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuItem
              onClick={() => router.push(`/cards/${card.id}/edit`)}
              className="text-xs cursor-pointer"
            >
              <Edit className="mr-2 h-3.5 w-3.5" />
              {tCommon("edit")}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              variant="destructive"
              onClick={() => {
                setCards((prev) => prev.filter((c) => c.id !== card.id));
                cardService.remove(card.id);
              }}
            >
              <Trash2 className="mr-2 h-3.5 w-3.5" />
              {tCommon("delete")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="px-6 pb-6 flex-1 flex flex-col gap-4">
        <div className="min-h-6">
          <div className="text-xl font-semibold text-foreground leading-snug wrap-break-words">
            {card.front}
          </div>
        </div>

        <div className="w-full border-t border-dashed border-border/60" />

        <div className="min-h-6">
          <div className="text-sm text-muted-foreground font-medium leading-relaxed whitespace-pre-wrap wrap-break-words">
            {card.back}
          </div>
        </div>
      </CardContent>

      {/* FOOTER */}
      <CardFooter className="px-6 py-3 bg-muted/20 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground">
        <div className="flex items-center gap-4">
          <div
            className="flex items-center gap-1.5"
            title={tCommon("repetitions")}
          >
            <RotateCw className="h-3.5 w-3.5" />
            <span>{reps}</span>
          </div>

          <div className="flex items-center gap-1.5" title={tCommon("dueDate")}>
            <Clock className="h-3.5 w-3.5" />
            <span>{formattedDueDate}</span>
          </div>
        </div>

        {/* optional: hint */}
        <div className="opacity-70 group-hover:opacity-100 transition">
          {tCards("menuHint")}
        </div>
      </CardFooter>
    </Card>
  );
}
