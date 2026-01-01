import { PlusIcon, TagIcon, XIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface TagsProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

export default function Tags({ tags, setTags }: TagsProps) {
  const [tagInput, setTagInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("deckForm.fields.tags");

  function clampTag(raw: string) {
    return raw.trim().replace(/\s+/g, " ").replace(/,$/, "").slice(0, 40);
  }

  const addTag = () => {
    const newTag = clampTag(tagInput);
    if (
      newTag &&
      !tags.map((t) => t.toLowerCase()).includes(newTag.toLowerCase())
    ) {
      setTags([...tags, newTag]);
      setTagInput("");
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const removeTag = (tag: string) => {
    const next = (tags ?? []).filter(
      (x) => x.toLowerCase() !== tag.toLowerCase(),
    );

    setTags(next);
  };

  return (
    <Field>
      <FieldLabel>{t("label")}</FieldLabel>

      <div className="flex flex-col gap-3 rounded-2xl border p-3">
        <div className="flex flex-wrap items-center gap-2">
          {tags.length === 0 ? (
            <span className="text-sm text-muted-foreground">{t("empty")}</span>
          ) : (
            tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="gap-1 rounded-xl"
              >
                <TagIcon className="h-3.5 w-3.5" />
                {tag}
                <button
                  type="button"
                  className="ml-1 rounded-full p-0.5 hover:bg-muted"
                  onClick={() => removeTag(tag)}
                  aria-label={t("remove", { tag })}
                >
                  <XIcon className="h-3.5 w-3.5" />
                </button>
              </Badge>
            ))
          )}
        </div>

        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={tagInput}
            onChange={(e) => {
              setTagInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "," || e.key === "Tab") {
                e.preventDefault();
                addTag();
              }
            }}
            placeholder={t("placeholder")}
            className="rounded-xl"
          />

          <Button
            type="button"
            variant="secondary"
            className="rounded-xl"
            onClick={addTag}
            disabled={!tagInput.trim()}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            {t("add")}
          </Button>
        </div>
      </div>
    </Field>
  );
}
