import { getBlogs, getPageBySlug } from "@/lib/payloadcms/payloadcms";
import { SEOMapper } from "@/lib/seo/seoMapper";

export async function generateMetadata() {
  const page = await getPageBySlug('blogs');

  const { seo } = page;

  const fallback = {
    description: 'Pratite najnovije savete, vesti i tutorijale o menadžmentu rasporeda časova na Rasporedaru. Saznajte kako da olakšate organizaciju!',
    title: 'Blog | Rasporedar',
  }

  const seoToMap = {
    ...fallback,
    ...seo
  }

  return SEOMapper(seoToMap);
}

export default async function BlogsPage() {
  const initialBlogs = await getBlogs(6, { 
    where: { 
      status: 'published'
    },
    depth: 0
  });

  return (
    <>Blogs Page</>
  );
}