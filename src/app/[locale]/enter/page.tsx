"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Providers from "./components/Providers";
import SignInForm from "./components/SignInForm/inddex";
import SignUpForm from "./components/SignUpForm";

type Mode = "signin" | "signup";

export default function EnterPage() {
  const [mode, setMode] = useState<Mode>("signin");
  const [disabled, setDisabled] = useState(false);
  const tAuth = useTranslations("auth");
  const tCommon = useTranslations("common");

  const modeKey = mode === "signin" ? "signIn" : "signUp";

  const headerText = useMemo(() => tAuth(`title.${modeKey}`), [modeKey, tAuth]);
  const subText = useMemo(() => tAuth(`subtitle.${modeKey}`), [modeKey, tAuth]);

  const heroFeatures = tAuth.raw("hero.features") as {
    title: string;
    description: string;
  }[];

  return (
    <main className="relative min-h-screen">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute -top-[20%] -left-[10%] h-125 w-125 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-125 w-125 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto flex min-h-screen items-center justify-center px-4 py-12">
        <div className="grid w-full max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* LEFT COLUMN: Brand & Marketing */}
          <div className="hidden flex-col justify-center space-y-8 lg:flex">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Link href="/">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-xl shadow-primary/20 bg-white dark:bg-zinc-900">
                  {/* Thay bằng đường dẫn ảnh thật của bạn */}
                  <Image
                    src="/logo.png"
                    alt={tCommon("logoAlt")}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>

              <div>
                <h2 className="text-2xl font-bold text-foreground">hnfc</h2>
                <p className="text-sm text-muted-foreground">
                  {tAuth("hero.tagline")}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
                {tAuth("hero.headline.line1")} <br />
                <span className="text-primary">
                  {tAuth("hero.headline.line2")}
                </span>
              </h1>
              <p className="max-w-md text-lg text-muted-foreground">
                {tAuth("hero.description")}
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-3 gap-4">
              {heroFeatures.map((item, i) => (
                <div
                  key={i}
                  className="group rounded-2xl border border-border bg-card/50 p-4 backdrop-blur-md transition-all hover:bg-card hover:border-primary/50"
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-primary">
                    {item.title}
                  </p>

                  <p className="mt-1 text-lg font-semibold text-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Auth Form (Shadcn Card) */}
          <Card className="w-full border-border bg-card/80 shadow-2xl shadow-primary/5 backdrop-blur-xl">
            <CardHeader className="px-8 pt-8 pb-0">
              <CardTitle className="text-2xl font-bold text-foreground">
                {headerText}
              </CardTitle>

              <CardDescription className="text-muted-foreground">
                {subText}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-8 pt-6">
              <Providers disabled={disabled} setDisabled={setDisabled} />

              <Tabs
                value={mode}
                onValueChange={(v) => setMode(v as Mode)}
                className="w-full"
              >
                {/* Custom Tab List để giống style Underlined */}
                <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent p-0 h-auto mb-6">
                  <TabsTrigger
                    value="signin"
                    className="rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none bg-transparent"
                  >
                    {tAuth("tabs.signIn")}
                  </TabsTrigger>

                  <TabsTrigger
                    value="signup"
                    className="rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none bg-transparent"
                  >
                    {tAuth("tabs.signUp")}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="signin" className="mt-0">
                  <SignInForm disabled={disabled} setDisabled={setDisabled} />
                </TabsContent>

                <TabsContent value="signup" className="mt-0">
                  <SignUpForm disabled={disabled} setDisabled={setDisabled} />
                </TabsContent>
              </Tabs>

              <p className="mt-6 text-center text-xs text-muted-foreground">
                {tAuth.rich("consent", {
                  terms: (chunks) => (
                    <Link
                      href="/terms"
                      className="font-medium text-primary hover:underline"
                    >
                      {chunks}
                    </Link>
                  ),
                  privacy: (chunks) => (
                    <Link
                      href="/privacy"
                      className="font-medium text-primary hover:underline"
                    >
                      {chunks}
                    </Link>
                  ),
                })}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
