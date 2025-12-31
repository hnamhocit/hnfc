import { useTranslations } from "next-intl";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

import { useDecks } from "@/hooks/useDecks";
import Deck from "./Deck";
import Empty from "./Empty";

export default function Decks() {
  const { decks, isLoading, error, refresh } = useDecks();
  const tDecks = useTranslations("decks");
  const tCommon = useTranslations("common");

  const showEmpty = !isLoading && decks.length === 0;

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      {error ? (
        <div className="rounded-xl border border-border bg-card p-4 flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-medium text-destructive">
              {tDecks("list.loadError")}
            </div>

            <div className="text-sm text-muted-foreground mt-1">{error}</div>
          </div>

          <button
            type="button"
            onClick={refresh}
            className="text-sm font-semibold text-primary hover:underline"
          >
            {tCommon("retry")}
          </button>
        </div>
      ) : null}

      {isLoading ? (
        <div className="py-10 text-center text-muted-foreground">
          {tDecks("list.loading")}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <Link
            href="/decks/new"
            className="flex items-center justify-center border-2 border-dashed shadow rounded-xl min-h-50 border-border transition-colors hover:border-primary hover:text-primary bg-card"
          >
            <PlusIcon size={48} className="transition" />
          </Link>

          {decks.map((deck) => (
            <Deck key={deck.id} {...deck} />
          ))}
        </div>
      )}

      {showEmpty && (
        <Empty
          title={tDecks("list.emptyTitle")}
          description={tDecks("list.emptyDescription")}
        />
      )}
    </div>
  );
}
