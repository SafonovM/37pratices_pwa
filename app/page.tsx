import { routing } from "@/i18n/routing";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Static HTML redirect for GitHub Pages.
 * Avoid next/navigation redirect() — it relies on the client runtime and
 * can look like a 404 if JS/assets fail to load under basePath.
 */
export default function RootPage() {
  const href = `${basePath}/${routing.defaultLocale}/`;

  return (
    <html lang={routing.defaultLocale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="refresh" content={`0; url=${href}`} />
        <title>37 Practices</title>
        <link rel="canonical" href={href} />
      </head>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#F7F3EB",
          color: "#2C2A26",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <p>
          <a href={href} style={{ color: "#8B6914" }}>
            37 Practices →
          </a>
        </p>
      </body>
    </html>
  );
}
