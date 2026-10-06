"use client";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Moon, Sun, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DEFAULT_READING_PREFS,
  FONT_SIZE_CLASS,
  READING_PREFS_KEY,
  type FontSize,
  type ReadingPrefs,
} from "@/lib/reading-prefs";
import { cn } from "@/lib/utils";

function readPrefs(): ReadingPrefs {
  if (typeof window === "undefined") return DEFAULT_READING_PREFS;
  try {
    const raw = localStorage.getItem(READING_PREFS_KEY);
    if (!raw) return DEFAULT_READING_PREFS;
    return { ...DEFAULT_READING_PREFS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_READING_PREFS;
  }
}

function writePrefs(prefs: ReadingPrefs) {
  localStorage.setItem(READING_PREFS_KEY, JSON.stringify(prefs));
  document.documentElement.dataset.fontSize = prefs.fontSize;
}

export function ReadingSettings() {
  const t = useTranslations("Settings");
  const { theme, setTheme } = useTheme();
  const [fontSize, setFontSize] = useState<FontSize>("m");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const prefs = readPrefs();
    setFontSize(prefs.fontSize);
    document.documentElement.dataset.fontSize = prefs.fontSize;
    setMounted(true);
  }, []);

  const updateFont = (size: FontSize) => {
    setFontSize(size);
    writePrefs({ fontSize: size });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t("title")}>
          <Type className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t("title")}</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 pt-2">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {t("theme")}
            </p>
            <div className="flex gap-2">
              {(
                [
                  ["light", t("themeLight"), Sun],
                  ["dark", t("themeDark"), Moon],
                ] as const
              ).map(([value, label, Icon]) => (
                <Button
                  key={value}
                  variant={mounted && theme === value ? "default" : "outline"}
                  size="sm"
                  className="flex-1"
                  onClick={() => setTheme(value)}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {t("fontSize")}
            </p>
            <div className="flex gap-2">
              {(["s", "m", "l"] as const).map((size) => (
                <Button
                  key={size}
                  variant={fontSize === size ? "default" : "outline"}
                  size="sm"
                  className="flex-1"
                  onClick={() => updateFont(size)}
                >
                  {t(`font${size.toUpperCase() as "S" | "M" | "L"}`)}
                </Button>
              ))}
            </div>
            <p
              className={cn(
                "mt-3 font-serif text-foreground/80",
                FONT_SIZE_CLASS[fontSize]
              )}
            >
              Aa
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
