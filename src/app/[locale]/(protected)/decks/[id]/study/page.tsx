"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { db, doc, updateDoc } from "@/config";
import { useStudySession } from "@/hooks/useStudySession";
import type { FsrsRating, ICard, IDeck } from "@/interfaces";
import { cardService, deckService } from "@/services";

type LoadState = "loading" | "ready" | "error" | "not_found";

export default function DeckStudyPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const tStudy = useTranslations("study");
  const tCommon = useTranslations("common");

  const [state, setState] = useState<LoadState>("loading");
  const [deck, setDeck] = useState<IDeck | null>(null);
  const [cards, setCards] = useState<ICard[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    async function run() {
      if (!id) return;
      setState("loading");
      setError("");

      try {
        const d = await deckService.getById(id);
        const c = await cardService.listByDeck(id);

        if (!alive) return;
        setDeck(d);
        setCards(c);
        setState("ready");
      } catch (e: any) {
        if (!alive) return;
        const msg = e?.message ?? tStudy("errors.load");
        setError(msg);
        setState(
          msg.toLowerCase().includes("not found") ? "not_found" : "error",
        );
      }
    }
    run();
    return () => {
      alive = false;
    };
  }, [id]);

  const session = useStudySession(cards);

  useEffect(() => {
    if (state === "ready") session.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const onRate = async (rating: FsrsRating) => {
    const updated = session.rate(rating);
    if (!updated) return;

    // persist minimal update
    try {
      const ref = doc(db, "cards", updated.id);
      await updateDoc(ref, {
        srs: updated.srs,
        updatedAt: updated.updatedAt,
      });
    } catch (e) {
      // MVP: ignore persistence errors in UI, or toast later
      console.error("[Update card]", e);
    }
  };

  if (state === "loading") {
    return (
      <div className="container mx-auto p-4 md:p-6 text-muted-foreground">
        {tCommon("loading")}
      </div>
    );
  }

  if (state === "not_found") {
    return (
      <div className="container mx-auto p-4 md:p-6 space-y-3">
        <div className="font-semibold text-foreground">
          {tStudy("errors.notFound")}
        </div>
        <Button asChild variant="secondary">
          <Link href="/dashboard">{tCommon("back")}</Link>
        </Button>
      </div>
    );
  }

  if (state === "error" || !deck) {
    return (
      <div className="container mx-auto p-4 md:p-6 space-y-3">
        <div className="font-semibold text-destructive">
          {tStudy("errors.load")}
        </div>
        <div className="text-sm text-muted-foreground">{error}</div>
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

  // DONE
  if (session.state === "done") {
    return (
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div>
          <div className="text-lg font-semibold text-foreground">
            {deck.title}
          </div>
          <div className="text-sm text-muted-foreground">
            {tStudy("finish.subtitle")}
          </div>
        </div>

        <Card className="border-border bg-card">
          <CardHeader>
            <div className="text-xl font-semibold text-foreground">
              {tStudy("finish.title")}
            </div>
            <div className="text-sm text-muted-foreground">
              {tStudy("finish.reviewed", { count: session.studied })}
            </div>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Button onClick={() => session.start()}>
              {tStudy("finish.studyAgain")}
            </Button>
            <Button variant="secondary" asChild>
              <Link href={`/decks/${deck.id}`}>
                {tStudy("finish.backToDeck")}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const c = session.current;

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-lg font-semibold text-foreground line-clamp-2">
            {deck.title}
          </div>

          <div className="text-sm text-muted-foreground">
            {tStudy("progress.card", {
              current: Math.min(session.index + 1, session.total),
              total: session.total,
            })}
          </div>
        </div>

        <div className="w-full sm:w-72 flex items-center gap-3">
          <Progress value={session.progress} />
          <div className="text-xs text-muted-foreground w-10 text-right">
            {session.progress}%
          </div>
        </div>
      </header>

      {!c ? (
        <Card className="border-border bg-card">
          <CardContent className="p-6 text-muted-foreground">
            {tStudy("empty.description")}
            <div className="mt-4">
              <Button asChild>
                <Link href={`/add?deckId=${deck.id}`}>
                  {tStudy("empty.create")}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <div className="text-sm text-muted-foreground">
              {tStudy("card.front")}
            </div>
            <div className="text-2xl font-semibold text-foreground break-words">
              {c.front}
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="border-t border-border/60 pt-4">
              <div className="text-sm text-muted-foreground">
                {tStudy("card.back")}
              </div>

              {session.revealed ? (
                <div className="mt-2 whitespace-pre-wrap text-foreground break-words">
                  {c.back}
                </div>
              ) : (
                <div className="mt-2 text-muted-foreground italic">
                  {tStudy("card.hidden")}
                </div>
              )}
            </div>

            {!session.revealed ? (
              <div className="flex justify-end">
                <Button onClick={session.showAnswer}>
                  {tStudy("card.show")}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <Button variant="destructive" onClick={() => onRate(1)}>
                  {tStudy("card.ratings.again")}
                </Button>

                <Button variant="secondary" onClick={() => onRate(2)}>
                  {tStudy("card.ratings.hard")}
                </Button>

                <Button onClick={() => onRate(3)}>
                  {tStudy("card.ratings.good")}
                </Button>

                <Button variant="outline" onClick={() => onRate(4)}>
                  {tStudy("card.ratings.easy")}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
