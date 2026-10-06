import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Locale } from "@/i18n/routing";
import { TOTAL_PRACTICES } from "@/lib/constants";
import { padPracticeNumber } from "@/lib/utils";

export { TOTAL_PRACTICES };

export type PracticeMetaItem = {
  number: number;
  shortTitle: string;
};

export type ContentMeta = {
  title: string;
  author: string;
  total: number;
  practices: PracticeMetaItem[];
};

export type PracticeDocument = {
  number: number;
  title: string;
  shortTitle: string;
  body: string;
  available: boolean;
};

const contentRoot = path.join(process.cwd(), "content");

function readFileSafe(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

export function getMeta(locale: Locale): ContentMeta {
  const raw = readFileSafe(path.join(contentRoot, locale, "meta.json"));
  if (!raw) {
    throw new Error(`Missing meta.json for locale: ${locale}`);
  }
  return JSON.parse(raw) as ContentMeta;
}

export function getIntro(locale: Locale): PracticeDocument {
  const raw = readFileSafe(path.join(contentRoot, locale, "intro.md"));
  if (!raw) {
    return {
      number: 0,
      title: "Intro",
      shortTitle: "Intro",
      body: "",
      available: false,
    };
  }

  const { data, content } = matter(raw);
  return {
    number: Number(data.number ?? 0),
    title: String(data.title ?? "Intro"),
    shortTitle: String(data.shortTitle ?? data.title ?? "Intro"),
    body: content.trim(),
    available: true,
  };
}

export function getPractice(
  locale: Locale,
  number: number
): PracticeDocument {
  const meta = getMeta(locale);
  const item = meta.practices.find((p) => p.number === number);
  const fileName = `${padPracticeNumber(number)}.md`;
  const raw = readFileSafe(path.join(contentRoot, locale, fileName));

  if (!raw) {
    return {
      number,
      title: item?.shortTitle ?? `Practice ${number}`,
      shortTitle: item?.shortTitle ?? `Practice ${number}`,
      body: "",
      available: false,
    };
  }

  const { data, content } = matter(raw);
  return {
    number: Number(data.number ?? number),
    title: String(data.title ?? item?.shortTitle ?? `Practice ${number}`),
    shortTitle: String(
      data.shortTitle ?? item?.shortTitle ?? data.title ?? `Practice ${number}`
    ),
    body: content.trim(),
    available: true,
  };
}

export function getAllPracticeNumbers(): number[] {
  return Array.from({ length: TOTAL_PRACTICES }, (_, i) => i + 1);
}

export function getNeighbors(number: number): {
  prev: number | null;
  next: number | null;
} {
  return {
    prev: number > 1 ? number - 1 : null,
    next: number < TOTAL_PRACTICES ? number + 1 : null,
  };
}
