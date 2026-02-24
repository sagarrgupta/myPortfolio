import type { MetadataRoute } from "next";
import { config } from "@/data/config";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = config.site;

    // All sections on the homepage
    const sections = ["hero", "skills", "experience", "projects", "publications", "contact"];

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1.0,
        },
        ...sections.map((section) => ({
            url: `${baseUrl}/#${section}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        }))
    ];
}
