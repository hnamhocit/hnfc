import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import type { ZodErrorMap } from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RegisterInput, registerSchema } from "@/schemas";
import { authService } from "@/services";
import PasswordInput from "../PasswordInput";

interface SignUpFormProps {
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
}

export default function SignUpForm({ disabled, setDisabled }: SignUpFormProps) {
  const tFields = useTranslations("auth.fields");
  const tSignUp = useTranslations("auth.signUp");
  const tValidation = useTranslations("auth.validation");

  const registerErrorMap: ZodErrorMap = (issue) => {
    const field = issue.path?.[0];

    if (field === "displayName") {
      if (issue.code === "too_small")
        return { message: tValidation("nameMin") };
      if (issue.code === "too_big") return { message: tValidation("nameMax") };
    }

    if (field === "email")
      return {
        message: tValidation("invalidEmail"),
      };

    if (field === "password") {
      if (issue.code === "too_small")
        return { message: tValidation("passwordRequired") };

      if (issue.code === "invalid_format" && issue.format === "regex")
        return { message: tValidation("passwordRules") };
    }

    return { message: issue.message ?? "Invalid value" };
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema, { error: registerErrorMap }),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: RegisterInput) => {
    setDisabled(true);

    try {
      await authService.register(data);
    } catch (error) {
      console.error("Register failed:", error);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <form
      className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Field>
        <FieldLabel>{tFields("displayName")}</FieldLabel>

        <Input
          id="displayName"
          type="text"
          placeholder={tFields("displayNamePlaceholder")}
          className="h-12 border-input focus-visible:ring-primary"
          {...register("displayName")}
        />

        <FieldError>{errors.displayName?.message}</FieldError>
      </Field>

      <Field>
        <FieldLabel>{tFields("email")}</FieldLabel>

        <Input
          id="email"
          type="email"
          placeholder={tFields("emailPlaceholder")}
          className="h-12 border-input focus-visible:ring-primary"
          {...register("email")}
        />

        <FieldError>{errors.email?.message}</FieldError>
      </Field>

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <PasswordInput
            label={tFields("password")}
            placeholder={tSignUp("passwordPlaceholder")}
            error={errors.password?.message}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Button
        disabled={disabled}
        type="submit"
        size="lg"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11 mt-2"
      >
        {tSignUp("submit")}
      </Button>
    </form>
  );
}
