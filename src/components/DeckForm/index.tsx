"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { ZodErrorMap } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DeckInput, deckSchema } from "@/schemas";
import { deckService } from "@/services";
import ColorPicker from "./ColorPicker";
import Description from "./Description";
import Tags from "./Tags";
import Title from "./Title";

export function DeckForm({ deckId }: { deckId?: string }) {
  const tDeckForm = useTranslations("deckForm");
  const tCommon = useTranslations("common");
  const isEdit = !!deckId;

  const [loading, setLoading] = useState(!!deckId);
  const [error, setError] = useState<string | null>(null);

  const deckErrorMap: ZodErrorMap = (issue, ctx) => {
    const field = issue.path[0];

    if (field === "title") {
      if (issue.code === "too_small")
        return { message: tDeckForm("validation.titleRequired") };
      if (issue.code === "too_big")
        return { message: tDeckForm("validation.titleMax") };
    }

    if (field === "description" && issue.code === "too_big")
      return { message: tDeckForm("validation.descriptionMax") };

    if (field === "tags" && issue.code === "too_big")
      return { message: tDeckForm("validation.tagMax") };

    if (
      field === "color" &&
      issue.code === "invalid_string" &&
      issue.validation === "regex"
    )
      return { message: tDeckForm("validation.color") };

    return { message: ctx.defaultError };
  };

  const form = useForm<DeckInput>({
    resolver: zodResolver(deckSchema, { errorMap: deckErrorMap }),
    defaultValues: {
      title: "",
      color: "#3b82f6",
      tags: [],
      description: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  useEffect(() => {
    if (!deckId) return;
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const deck = await deckService.getById(deckId);
        if (cancelled) return;

        reset({
          title: deck.title ?? "",
          color: deck.color ?? "#3b82f6",
          tags: deck.tags ?? [],
          description: deck.description ?? "",
        });
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? tDeckForm("errors.load"));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [deckId, reset, tDeckForm]);

  const onReset = () => {
    reset({
      title: "",
      color: "#3b82f6",
      tags: [],
      description: "",
    });

    setError(null);
  };

  const onSubmit = handleSubmit(async (values) => {
    setError(null);

    try {
      isEdit
        ? await deckService.update(deckId!, values)
        : await deckService.create(values);

      onReset();
    } catch (e: any) {
      setError(e?.message ?? tDeckForm("errors.save"));
    }
  });

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4 flex-wrap">
            <div>
              <CardTitle className="text-2xl">
                {isEdit ? tDeckForm("title.edit") : tDeckForm("title.create")}
              </CardTitle>

              <CardDescription className="md:text-lg">
                {isEdit
                  ? tDeckForm("subtitle.edit", { deckId })
                  : tDeckForm("subtitle.create")}
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              onClick={onReset}
              className="rounded-xl"
              disabled={loading || isSubmitting}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {tDeckForm("actions.reset")}
            </Button>

            <Button
              onClick={onSubmit}
              className="rounded-xl"
              disabled={loading || isSubmitting}
            >
              {isSubmitting ? tCommon("saving") : tDeckForm("actions.save")}
            </Button>
          </div>
        </div>

        {error ? (
          <div className="mt-3 rounded-xl border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}
      </CardHeader>

      <CardContent className="space-y-8">
        {loading ? (
          <div className="text-sm text-muted-foreground">
            {tDeckForm("actions.loading")}
          </div>
        ) : (
          <>
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <Title
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.title?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="color"
              render={({ field }) => (
                <ColorPicker value={field.value} onChange={field.onChange} />
              )}
            />

            <Controller
              control={control}
              name="tags"
              render={({ field }) => (
                <Tags tags={field.value!} setTags={field.onChange} />
              )}
            />

            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <Description
                  value={field.value!}
                  onChange={field.onChange}
                  error={errors.description?.message}
                />
              )}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}
