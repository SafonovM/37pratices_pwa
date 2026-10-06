import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { PracticeMetaItem } from "@/lib/content";
import { cn } from "@/lib/utils";

type TocListProps = {
  practices: PracticeMetaItem[];
  current?: number;
};

export function TocList({ practices, current }: TocListProps) {
  const t = useTranslations("Toc");

  return (
    <ol className="space-y-1">
      {practices.map((practice) => {
        const isCurrent = current === practice.number;
        return (
          <li key={practice.number}>
            <Link
              href={`/practices/${practice.number}`}
              className={cn(
                "group flex items-baseline gap-3 rounded-md px-3 py-2.5 transition-colors",
                isCurrent
                  ? "bg-accent/15 text-foreground"
                  : "hover:bg-muted/70 text-foreground/90"
              )}
              aria-current={isCurrent ? "page" : undefined}
            >
              <span
                className={cn(
                  "w-8 shrink-0 font-sans text-sm tabular-nums text-muted-foreground",
                  isCurrent && "font-semibold text-accent"
                )}
              >
                {practice.number}
              </span>
              <span className="font-serif text-base leading-snug group-hover:underline group-hover:underline-offset-4">
                {practice.shortTitle ||
                  t("practice", { number: practice.number })}
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
