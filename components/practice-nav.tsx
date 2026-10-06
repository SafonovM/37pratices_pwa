"use client";

import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, List } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { TOTAL_PRACTICES } from "@/lib/constants";

type PracticeNavProps = {
  current: number;
  prev: number | null;
  next: number | null;
};

export function PracticeNav({ current, prev, next }: PracticeNavProps) {
  const t = useTranslations("Practice");

  return (
    <div className="space-y-4">
      <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-accent transition-all duration-500 ease-out"
          style={{ width: `${(current / TOTAL_PRACTICES) * 100}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={1}
          aria-valuemax={TOTAL_PRACTICES}
        />
      </div>

      <div className="flex items-center justify-between gap-2">
        <p className="font-sans text-sm text-muted-foreground">
          {t("of", { current, total: TOTAL_PRACTICES })}
        </p>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/toc">
            <List className="h-4 w-4" />
            {t("toc")}
          </Link>
        </Button>
      </div>

      <div className="flex items-center justify-between gap-3">
        {prev ? (
          <Button variant="outline" asChild className="min-w-[7rem]">
            <Link href={`/practices/${prev}`}>
              <ChevronLeft className="h-4 w-4" />
              {t("prev")}
            </Link>
          </Button>
        ) : (
          <span className="min-w-[7rem]" />
        )}

        {next ? (
          <Button variant="outline" asChild className="min-w-[7rem]">
            <Link href={`/practices/${next}`}>
              {t("next")}
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <span className="min-w-[7rem]" />
        )}
      </div>
    </div>
  );
}
