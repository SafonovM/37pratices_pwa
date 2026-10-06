import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  getAllPracticeNumbers,
  getNeighbors,
  getPractice,
  TOTAL_PRACTICES,
} from "@/lib/content";
import { MarkdownBody } from "@/components/markdown-body";
import { PracticeNav } from "@/components/practice-nav";
import { PracticeReader } from "@/components/practice-reader";
import { routing, type Locale } from "@/i18n/routing";

type Props = {
  params: { locale: string; n: string };
};

export function generateStaticParams() {
  const numbers = getAllPracticeNumbers();
  return routing.locales.flatMap((locale) =>
    numbers.map((n) => ({ locale, n: String(n) }))
  );
}

export async function generateMetadata({ params }: Props) {
  const locale = params.locale as Locale;
  const number = Number(params.n);
  const practice = getPractice(locale, number);
  const meta = await getTranslations({ locale, namespace: "Meta" });
  const t = await getTranslations({ locale, namespace: "Practice" });

  const title = `${practice.title} · ${meta("siteName")}`;
  const description = practice.available
    ? practice.body.slice(0, 160).replace(/\n+/g, " ")
    : t("comingSoon");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
  };
}

export default async function PracticePage({ params }: Props) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);

  const number = Number(params.n);
  const practice = getPractice(locale, number);
  const { prev, next } = getNeighbors(number);
  const t = await getTranslations("Practice");

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:py-12">
      <PracticeReader prev={prev} next={next}>
        <PracticeNav current={number} prev={prev} next={next} />

        <article className="mx-auto mt-10 max-w-prose">
          <p className="mb-3 font-sans text-sm uppercase tracking-widest text-accent">
            {t("of", { current: number, total: TOTAL_PRACTICES })}
          </p>
          <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            {practice.title}
          </h1>

          <div className="mt-8">
            {practice.available ? (
              <MarkdownBody content={practice.body} />
            ) : (
              <p className="font-serif text-lg italic text-muted-foreground">
                {t("comingSoon")}
              </p>
            )}
          </div>
        </article>

        <div className="mx-auto mt-14 max-w-prose">
          <PracticeNav current={number} prev={prev} next={next} />
        </div>
      </PracticeReader>
    </div>
  );
}
