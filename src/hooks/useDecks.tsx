import type { IDeckWithStats } from "@/interfaces";
import { deckService } from "@/services";
import { useDeckOptionsStore, useUserStore } from "@/stores";
import { useCallback, useEffect, useState } from "react";

type UseDecksResult = {
  decks: IDeckWithStats[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

export const useDecks = (): UseDecksResult => {
  const { user } = useUserStore();
  const uid = user?.id ?? null;
  const { setOptions } = useDeckOptionsStore();

  const [decks, setDecks] = useState<IDeckWithStats[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!uid) {
      setDecks([]);
      setOptions([]);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const decks = await deckService.findMany();

      setOptions(decks.map((d) => ({ id: d.id, title: d.title })));

      // Stats (nếu bạn vẫn muốn)
      const withStats = await deckService.getDecksWithStats(decks);
      setDecks(withStats);
    } catch (e: any) {
      setError(e?.message ?? "");
    } finally {
      setIsLoading(false);
    }
  }, [uid, setOptions]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { decks, isLoading, error, refresh };
};
