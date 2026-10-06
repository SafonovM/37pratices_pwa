import { getTranslations, setRequestLocale } from "next-intl/server";
import { TocList } from "@/components/toc-list";
import { getMeta } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props) {
  const t = await getTranslations({ locale: params.locale, namespace: "Toc" });
  const meta = await getTranslations({
    locale: params.locale,
    namespace: "Meta",
  });
  return {
    title: `${t("title")} · ${meta("siteName")}`,
    description: t("subtitle"),
  };
}

export default async function TocPage({ params }: Props) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("Toc");
  const meta = getMeta(locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-8 max-w-prose">
        <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-2 font-sans text-muted-foreground">{t("subtitle")}</p>
      </header>
      <TocList practices={meta.practices} />
    </div>
  );
}
