"use client";

import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useMemo } from "react";

export default function ProfilePage() {
  const tProfile = useTranslations("profile");
  const tMenu = useTranslations("menu");
  const tCommon = useTranslations("common");

  const { user } = useUserStore();

  const createdAt = useMemo(() => {
    if (!user?.createdAt) return "-";
    return user.createdAt.toDate().toLocaleString();
  }, [user?.createdAt]);

  const updatedAt = useMemo(() => {
    if (!user?.updatedAt) return "-";
    return user.updatedAt.toDate().toLocaleString();
  }, [user?.updatedAt]);

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {tProfile("title")}
          </h1>

          <div className="text-sm text-muted-foreground">
            {tProfile("subtitle")}
          </div>
        </div>

        <Button asChild variant="secondary">
          <Link href="/me/settings">{tMenu("settings")}</Link>
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-muted overflow-hidden flex items-center justify-center border border-border">
            {user?.photoURL ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.photoURL}
                alt={tCommon("userAvatar")}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-muted-foreground text-sm">
                {tProfile("noAvatar")}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <div className="text-lg font-semibold text-foreground truncate">
              {user?.displayName || tProfile("noDisplayName")}
            </div>

            <div className="text-sm text-muted-foreground truncate">
              {user?.email || "-"}
            </div>

            <div className="text-xs text-muted-foreground/80 mt-1 truncate">
              {tProfile("userId")}: {user?.id}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="rounded-lg border border-border p-4 bg-background/40">
            <div className="text-muted-foreground">{tProfile("created")}</div>

            <div className="text-foreground font-medium">{createdAt}</div>
          </div>

          <div className="rounded-lg border border-border p-4 bg-background/40">
            <div className="text-muted-foreground">{tProfile("updated")}</div>

            <div className="text-foreground font-medium">{updatedAt}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
