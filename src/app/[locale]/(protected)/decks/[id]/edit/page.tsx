"use client";

import { DeckForm } from "@/components/DeckForm";
import { useParams } from "next/navigation";

export default function DeckEditPage() {
  const params = useParams<{ id: string }>();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <DeckForm deckId={params.id} />
    </div>
  );
}
