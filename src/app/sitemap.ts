export const revalidate = 86400; 

import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BUILD_TIME = new Date();

  const staticPages = [
    ''
  ];

   const staticUrls: MetadataRoute.Sitemap = staticPages.map((url) => ({
    url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}${url}`,
    lastModified: BUILD_TIME,
    changeFrequency: "monthly",
  }));

  return [
    ...staticUrls
  ];
}