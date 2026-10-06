import { randomUUID } from "node:crypto";
import withSerwistInit from "@serwist/next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const revision = randomUUID();
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
  cacheOnNavigation: true,
  additionalPrecacheEntries: [{ url: `${basePath}/~offline`, revision }],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
};

export default withSerwist(withNextIntl(nextConfig));
