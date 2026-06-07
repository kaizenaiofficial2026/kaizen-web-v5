import type { MetadataRoute } from "next";
import { industries } from "@/lib/content/industries";
import { siteConfig } from "@/lib/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    "/about",
    "/contact",
    "/blog",
    "/case-studies",
    ...industries.map((industry) => industry.href),
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/industries") ? 0.8 : 0.7,
  }));
}
