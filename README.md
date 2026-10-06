# 37 Practices PWA

Статический онлайн-ридер текста «37 практик бодхисаттвы» (Нгулчу Тогме Зангпо).  
Next.js 14 · Tailwind · next-intl · Serwist PWA · GitHub Pages.

Работает **полностью офлайн** после первой загрузки. Без бэкенда, БД и API.

## Стек

| Слой | Выбор |
|------|--------|
| Framework | Next.js 14 (App Router) + TypeScript |
| Стили | Tailwind CSS + минимальный shadcn-стиль |
| i18n | next-intl (`/ru`, `/en`), без middleware |
| Контент | Markdown + frontmatter в `/content` |
| PWA | Serwist (`@serwist/next`) |
| Хостинг | GitHub Pages (`output: 'export'`) |

## Быстрый старт

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) → редирект на `/ru/`.

```bash
npm run build   # статика в /out
npx serve out   # локальная проверка экспорта
```

## Структура

```
app/[locale]/          # обложка, toc, practices/[n], about
content/ru|en/         # intro.md, 01.md…, meta.json
messages/              # UI-строки
components/            # хедер, ридер, настройки
public/manifest.webmanifest
.github/workflows/deploy.yml
```

Маршруты:

- `/[locale]/` — обложка
- `/[locale]/toc/` — оглавление
- `/[locale]/practices/[n]/` — практика
- `/[locale]/about/` — о проекте

## Контент

Добавьте файлы `content/{locale}/04.md` … `37.md`:

```md
---
title: Заголовок практики
number: 4
shortTitle: Короткий заголовок
---

Текст практики в Markdown.
```

Обновите `shortTitle` в `content/{locale}/meta.json` (уже есть все 37 слотов).  
Страницы без файла показывают «скоро» / «coming soon».

## Языки и настройки

- Переключатель `ru` / `en` в хедере → URL + `localStorage` (`37p-locale`)
- Тема и размер шрифта (S/M/L) → `localStorage` (`37p-reading-prefs`)

Новый язык: добавьте locale в `i18n/routing.ts`, `messages/{locale}.json` и папку `content/{locale}/`.

## GitHub Pages

1. **Settings → Pages → Build and deployment → Source: GitHub Actions**  
   (без этого URL покажет *«There isn't a GitHub Pages site here»* — это не отсутствие `index.html`)
2. Push в `main` / `master` — workflow соберёт и задеплоит `/out`
3. Дождитесь зелёного run в **Actions**, затем откройте:  
   `https://<user>.github.io/<repo>/`  
   (для этого репо: `https://SafonovM.github.io/37pratices_pwa/`)

`NEXT_PUBLIC_BASE_PATH` в CI выставляется как `/<имя-репозитория>`.

Корневой `index.html` — статический редирект на `/ru/` (meta refresh + ссылка), без зависимости от JS Next.

### Кастомный домен (корень)

В workflow уберите `NEXT_PUBLIC_BASE_PATH` (или задайте пустую строку), чтобы `basePath` не добавлялся.

### Локальная сборка как на Pages

```bash
NEXT_PUBLIC_BASE_PATH=/37pratices_pwa npm run build
```

## PWA

- Манифест: `public/manifest.webmanifest`
- Иконки: `public/icons/` (`npm run icons` пересоберёт)
- Service worker: Serwist, генерируется при `npm run build` в `public/sw.js`
- В `dev` SW отключён

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | разработка |
| `npm run build` | static export → `out/` |
| `npm run lint` | ESLint |
| `npm run icons` | пересоздать PNG-иконки |

## Замечания по архитектуре

- **Нет middleware** — при static export на Pages он не выполняется; locale всегда в URL.
- **Serwist вместо next-pwa** — актуальная поддержка App Router.
- **Markdown вместо MDX** — контент без React-компонентов внутри текста.
