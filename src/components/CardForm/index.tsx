"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createId } from "@paralleldrive/cuid2";
import { Timestamp } from "firebase/firestore";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { ZodErrorMap } from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import type { ICard } from "@/interfaces";
import { cardSchema, type CardValues } from "@/schemas";
import { cardService } from "@/services";
import { useUserStore } from "@/stores";
import { createInitialFsrsState, getIdOrThrow } from "@/utils";

import DeckPicker from "./DeckPicker";

type Props = {
  cardId?: string;
};

export default function CardForm({ cardId }: Props) {
  const tCardForm = useTranslations("cardForm");
  const tCommon = useTranslations("common");
  const uid = useUserStore((s) => s.user?.id);
  const isEdit = !!cardId;

  const [saving, setSaving] = useState(false);
  const [topError, setTopError] = useState("");

  const cardErrorMap: ZodErrorMap = (issue) => {
    const field = issue.path?.[0];
    if (issue.code === "too_small") {
      if (field === "deckId")
        return { message: tCardForm("validation.deckRequired") };
      if (field === "front")
        return { message: tCardForm("validation.frontRequired") };
      if (field === "back")
        return { message: tCardForm("validation.backRequired") };
    }

    return { message: issue.message ?? "Invalid value" };
  };

  const form = useForm<CardValues>({
    resolver: zodResolver(cardSchema, { error: cardErrorMap }),
    defaultValues: {
      deckId: "",
      front: "",
      back: "",
    },
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  // load card for edit
  useEffect(() => {
    if (!isEdit || !cardId) return;

    cardService.getById(cardId).then((card) => {
      reset({
        deckId: card.deckId,
        front: card.front,
        back: card.back,
      });
    });
  }, [isEdit, cardId, reset]);

  const submit = async (values: CardValues) => {
    setSaving(true);
    setTopError("");

    try {
      const ownerId = uid ?? getIdOrThrow();
      const now = Timestamp.now();

      if (isEdit && cardId) {
        await cardService.update(cardId, {
          deckId: values.deckId,
          front: values.front.trim(),
          back: values.back.trim(),
          updatedAt: now,
        } as any);

        return;
      }

      const payload: ICard = {
        id: createId(),
        ownerId,
        deckId: values.deckId,
        front: values.front.trim(),
        back: values.back.trim(),
        srs: createInitialFsrsState(),
        createdAt: now,
        updatedAt: now,
      };

      await cardService.create(payload);

      reset({ deckId: values.deckId, front: "", back: "" });
    } catch (e: any) {
      setTopError(e?.message ?? tCardForm("errors.save"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="rounded-2xl border border-border bg-card p-6 space-y-6"
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">
          {isEdit ? tCardForm("title.edit") : tCardForm("title.create")}
        </h1>

        <p className="text-sm text-muted-foreground">
          {isEdit ? tCardForm("subtitle.edit") : tCardForm("subtitle.create")}
        </p>
      </div>

      {topError && <div className="text-sm text-destructive">{topError}</div>}

      <Field>
        <FieldLabel>{tCardForm("fields.deck")}</FieldLabel>
        <Controller
          control={control}
          name="deckId"
          render={({ field }) => (
            <DeckPicker value={field.value || null} onChange={field.onChange} />
          )}
        />
        {errors.deckId && <FieldError>{errors.deckId.message}</FieldError>}
      </Field>

      <Field>
        <FieldLabel>{tCardForm("fields.front")}</FieldLabel>
        <Input {...register("front")} />
        {errors.front && <FieldError>{errors.front.message}</FieldError>}
      </Field>

      <Field>
        <FieldLabel>{tCardForm("fields.back")}</FieldLabel>
        <Textarea className="min-h-28" {...register("back")} />
        {errors.back && <FieldError>{errors.back.message}</FieldError>}
      </Field>

      <div className="flex justify-end gap-3">
        <Button type="submit" disabled={!isValid || saving}>
          {saving
            ? tCommon("saving")
            : isEdit
              ? tCardForm("actions.saveChanges")
              : tCardForm("actions.create")}
        </Button>
      </div>
    </form>
  );
}
