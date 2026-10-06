import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 py-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-1 px-4 text-center text-sm text-muted-foreground">
        <p>© {year} · 37 Practices</p>
        <p>{t("offline")}</p>
      </div>
    </footer>
  );
}
