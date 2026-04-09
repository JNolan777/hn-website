import { PRODUCTS } from "@/lib/products";
import type { MetadataRoute } from "next";

const BASE = "https://hn-website-seven.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const productUrls = PRODUCTS.map((p) => ({
    url: `${BASE}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    ...productUrls,
  ];
}
