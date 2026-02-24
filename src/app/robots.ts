import type { MetadataRoute } from "next";
import { config } from "@/data/config";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = config.site;

    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/"],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
