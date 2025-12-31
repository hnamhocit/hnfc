import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

interface PasswordInputProps {
  label: string;
  placeholder: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function PasswordInput({
  label,
  placeholder,
  error,
  value,
  onChange,
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>

      <div className="relative">
        <Input
          type={isVisible ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            const value = e.target.value;
            if (value.startsWith(" ")) return;
            onChange(value);
          }}
          className="pr-10 h-12 border-input focus-visible:ring-primary"
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-12 w-12 text-muted-foreground hover:text-foreground"
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? (
            <EyeOffIcon className="h-4 w-4" />
          ) : (
            <EyeIcon className="h-4 w-4" />
          )}
        </Button>
      </div>

      <FieldError>{error}</FieldError>
    </Field>
  );
}
