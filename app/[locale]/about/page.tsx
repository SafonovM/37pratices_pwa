import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props) {
  const t = await getTranslations({ locale: params.locale, namespace: "About" });
  const meta = await getTranslations({
    locale: params.locale,
    namespace: "Meta",
  });
  return {
    title: `${t("title")} · ${meta("siteName")}`,
    description: t("body"),
  };
}

export default async function AboutPage({ params }: Props) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("About");

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <article className="mx-auto max-w-prose">
        <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-6 font-serif text-lg leading-relaxed text-foreground/90">
          {t("body")}
        </p>
      </article>
    </div>
  );
}
