import type { MetadataRoute } from "next";
import { industries } from "@/lib/content/industries";
import { services } from "@/lib/content/services";
import { siteConfig } from "@/lib/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    "/about",
    "/contact",
    "/blog",
    "/case-studies",
    ...services.map((service) => service.href),
    ...industries.map((industry) => industry.href),
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route.startsWith("/services") || route.startsWith("/industries")
          ? 0.8
          : 0.7,
  }));
}
