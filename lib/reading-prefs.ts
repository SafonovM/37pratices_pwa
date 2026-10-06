export const READING_PREFS_KEY = "37p-reading-prefs";
export const LOCALE_PREF_KEY = "37p-locale";

export type FontSize = "s" | "m" | "l";

export type ReadingPrefs = {
  fontSize: FontSize;
};

export const DEFAULT_READING_PREFS: ReadingPrefs = {
  fontSize: "m",
};

export const FONT_SIZE_CLASS: Record<FontSize, string> = {
  s: "text-base leading-relaxed md:text-lg",
  m: "text-lg leading-relaxed md:text-xl",
  l: "text-xl leading-relaxed md:text-2xl",
};
