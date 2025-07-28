export const revalidate = 86400; 

import { getBlogs, getPages } from "@/lib/payloadcms/payloadcms";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BUILD_TIME = new Date();

  const staticPages = [
    '/',
    '/auth/login',
    '/auth/register',
  ];

  const pages = await getPages(100);
  const filteredPages = pages.docs.filter(doc => doc.slug !== 'home');

  const blogs = await getBlogs(1000, {
    where: {
      status: {
        equals: 'published'
      }
    }
  });
  
  const blogsUrl: MetadataRoute.Sitemap = blogs.docs.map((blog) => ({
    url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/blogs/${blog.slug}`,
    lastModified: blog.updatedAt,
    changeFrequency: "yearly",
  }));

  const pagesUrls: MetadataRoute.Sitemap = filteredPages.map((page) => ({
    url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/${page.slug}`,
    lastModified: page.updatedAt,
    changeFrequency: "monthly",
  }));

  const staticUrls: MetadataRoute.Sitemap = staticPages.map((url) => ({
    url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}${url}`,
    lastModified: BUILD_TIME,
    changeFrequency: "yearly",
  }));

  return [
    ...staticUrls,
    ...pagesUrls,
    ...blogsUrl,
  ];
}