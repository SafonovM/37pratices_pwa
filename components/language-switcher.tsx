"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { LOCALE_PREF_KEY } from "@/lib/reading-prefs";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (next: Locale) => {
    if (next === locale) return;
    localStorage.setItem(LOCALE_PREF_KEY, next);
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      className="flex items-center gap-1 rounded-md border border-border p-0.5"
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((code) => (
        <Button
          key={code}
          variant="ghost"
          size="sm"
          disabled={isPending}
          onClick={() => switchLocale(code)}
          className={cn(
            "h-7 min-w-9 px-2 uppercase",
            locale === code && "bg-muted font-semibold"
          )}
          aria-pressed={locale === code}
        >
          {code}
        </Button>
      ))}
    </div>
  );
}
