import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { MarkdownBody } from "@/components/markdown-body";
import { getIntro, getMeta } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props) {
  const t = await getTranslations({ locale: params.locale, namespace: "Meta" });
  return {
    title: t("siteName"),
    description: t("siteDescription"),
    openGraph: {
      title: t("siteName"),
      description: t("siteDescription"),
      type: "website",
    },
  };
}

export default async function HomePage({ params }: Props) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const tNav = await getTranslations("Nav");
  const intro = getIntro(locale);
  const meta = getMeta(locale);

  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 pt-12 md:pt-20">
      <section className="mx-auto max-w-prose text-center">
        <p className="mb-4 font-sans text-sm uppercase tracking-[0.2em] text-accent">
          {meta.author}
        </p>
        <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-balance text-foreground md:text-5xl lg:text-6xl">
          {t("title")}
        </h1>
        <p className="mt-4 font-sans text-base text-muted-foreground md:text-lg">
          {t("subtitle")}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild>
            <Link href="/practices/1">{t("cta")}</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/toc">{tNav("toc")}</Link>
          </Button>
        </div>
      </section>

      {intro.available && (
        <section className="mx-auto mt-16 max-w-prose border-t border-border/70 pt-12 text-left">
          <MarkdownBody content={intro.body} />
        </section>
      )}
    </div>
  );
}
