import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BellIcon } from "lucide-react";
import Image from "next/image";

import { authService } from "@/services";
import { useUserStore } from "@/stores";
import BackButton from "../BackButton";
import LocaleSwapButton from "../LocaleSwapButton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ThemeButton from "./ThemeButton";

export default function Header() {
  const { user } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();
  const tMenu = useTranslations("menu");
  const tCommon = useTranslations("common");

  return (
    <header className="sticky top-0 left-0 w-full z-20 h-16 border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex items-center justify-between h-full container mx-auto px-4 md:px-6">
        <div className="flex items-center gap-7">
          <div className="flex items-center gap-2">
            {pathname !== "/vi/dashboard" && pathname !== "/en/dashboard" ? (
              <BackButton />
            ) : (
              <>
                <Image
                  src="/logo.png"
                  alt={tCommon("logoAlt")}
                  width={40}
                  height={40}
                  className="rounded-full"
                />

                <Link
                  href="/dashboard"
                  className="text-2xl font-bold text-primary"
                >
                  hnfc
                </Link>
              </>
            )}
          </div>

          <Link
            href="/add"
            className="hidden md:block p-2 border rounded-lg text-neutral-500"
          >
            {tMenu("add")}
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <LocaleSwapButton />

          <ThemeButton />

          <div className="hidden md:block">
            <Button size="icon" variant="outline">
              <BellIcon />
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback>{user?.displayName?.[0] || "U"}</AvatarFallback>

                <AvatarImage
                  src={user?.photoURL || undefined}
                  alt={user?.displayName || tCommon("userAvatar")}
                />
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => router.push("/add")}>
                {tMenu("add")}
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => router.push("/me/profile")}>
                {tMenu("profile")}
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => router.push("/me/notifications")}
              >
                {tMenu("notifications")}
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => router.push("/me/settings")}>
                {tMenu("settings")}
              </DropdownMenuItem>

              <DropdownMenuItem
                variant="destructive"
                onClick={authService.logout}
              >
                {tMenu("logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
