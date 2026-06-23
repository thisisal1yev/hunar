import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = ["", "/jobs", "/for-employers", "/privacy", "/terms", "/consent"];

  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "/jobs" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
