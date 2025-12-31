import { useTranslations } from "next-intl";
import TextareaAutosize from "react-textarea-autosize";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";

interface TitleFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function Title({ value, onChange, error }: TitleFieldProps) {
  const t = useTranslations("deckForm.fields.title");

  return (
    <Field>
      <FieldLabel>{t("label")}</FieldLabel>

      <TextareaAutosize
        className="resize-none outline-none text-3xl font-bold"
        placeholder={t("placeholder")}
        value={value}
        onChange={(e) => {
          const value = e.target.value;
          if (value.startsWith("\n") || value.startsWith(" ")) return;
          onChange(e.target.value);
        }}
      />

      <FieldError>{error}</FieldError>
    </Field>
  );
}
