"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeftIcon, PlayCircleIcon } from "lucide-react";

import MarkdownLive from "@/components/MarkdownLive";
import { Button } from "@/components/ui/button";
import { useDeckCards } from "@/hooks/useDeckCards";
import type { IDeck } from "@/interfaces";
import { deckService } from "@/services";
import CardItem from "./components/CardItem";

type LoadState = "loading" | "ready" | "not_found" | "error";

export default function DeckDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const tDeck = useTranslations("deckDetail");
  const tCommon = useTranslations("common");

  const [state, setState] = useState<LoadState>("loading");
  const [deck, setDeck] = useState<IDeck | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let alive = true;

    async function run() {
      if (!id) return;
      setState("loading");
      setError("");

      try {
        const d = await deckService.getById(id);
        if (!alive) return;
        setDeck(d);
        setState("ready");
      } catch (e: any) {
        if (!alive) return;
        const msg = e?.message ?? tDeck("error");
        setError(msg);
        if (msg.toLowerCase().includes("not found")) setState("not_found");
        else setState("error");
      }
    }

    run();
    return () => {
      alive = false;
    };
  }, [id, tDeck]);

  const deckId = useMemo(() => (typeof id === "string" ? id : null), [id]);
  const {
    state: cardState,
    cards,
    error: cardError,
    setCards,
    refresh: refreshCards,
  } = useDeckCards(state === "ready" ? deckId : null);

  if (state === "loading") {
    return (
      <div className="container mx-auto p-4 md:p-6">
        <div className="text-muted-foreground">{tDeck("loading")}</div>
      </div>
    );
  }

  if (state === "not_found") {
    return (
      <div className="container mx-auto p-4 md:p-6 space-y-4">
        <div className="font-semibold text-foreground">{tDeck("notFound")}</div>
        <Button asChild variant="secondary">
          <Link href="/dashboard">{tCommon("back")}</Link>
        </Button>
      </div>
    );
  }

  if (state === "error" || !deck) {
    return (
      <div className="container mx-auto p-4 md:p-6 space-y-4">
        <div className="text-destructive font-semibold">{tDeck("error")}</div>
        <div className="text-muted-foreground text-sm">{error}</div>

        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => router.refresh()}>
            {tCommon("retry")}
          </Button>
          <Button asChild variant="secondary">
            <Link href="/dashboard">{tCommon("back")}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-10">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div
              className="w-3.5 h-3.5 rounded-full"
              style={{ backgroundColor: deck.color }}
            />
            <h1 className="text-2xl font-bold text-foreground">{deck.title}</h1>
          </div>

          {deck.tags?.length ? (
            <div className="flex flex-wrap gap-2">
              {deck.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs font-semibold px-2 py-1 rounded-full bg-muted text-muted-foreground border border-border"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex gap-2">
          <Link href="/dashboard">
            <Button variant="secondary">
              <ChevronLeftIcon />
              {tCommon("back")}
            </Button>
          </Link>

          <Link href={`/decks/${deck.id}/study`}>
            <Button>
              <PlayCircleIcon />
              {tDeck("actions.study")}
            </Button>
          </Link>
        </div>
      </div>

      {/* Description */}
      <div>
        <div className="text-sm font-semibold text-foreground mb-3">
          {tDeck("description.title")}
        </div>

        {(deck.description ?? "").trim() === "" ? (
          <div className="text-muted-foreground italic">
            {tDeck("description.empty")}
          </div>
        ) : (
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <MarkdownLive value={deck.description ?? ""} />
          </div>
        )}
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {cardState === "error" ? (
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="text-sm text-destructive font-medium">
              {tDeck("cards.loadError")}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {cardError}
            </div>
          </div>
        ) : null}

        {cardState === "loading" ? (
          <div className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
            {tDeck("cards.loading")}
          </div>
        ) : null}

        {cardState === "ready" && cards.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-card p-6 text-center">
            <div className="text-sm font-medium text-foreground">
              {tDeck("cards.emptyTitle")}
            </div>

            <div className="text-sm text-muted-foreground mt-1">
              {tDeck("cards.emptyDescription")}
            </div>

            <div className="mt-4">
              <Button asChild>
                <Link href={`/add?deckId=${deck.id}`}>
                  {tDeck("cards.create")}
                </Link>
              </Button>
            </div>
          </div>
        ) : null}

        {cardState === "ready" && cards.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {cards.map((c) => (
              <CardItem key={c.id} card={c} setCards={setCards} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
