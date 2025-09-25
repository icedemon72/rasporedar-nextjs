import NewsList from "@/components/ui/news/NewsList";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { getNews, getPageBySlug } from "@/lib/payloadcms/payloadcms";
import { SEOMapper } from "@/lib/seo/seoMapper";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  const page = await getPageBySlug('novosti');

  if (!page) return notFound();

  const { seo } = page;

  const fallback = {
    description: 'Pratite najnovije savete, vesti i tutorijale o menadžmentu rasporeda časova na Rasporedaru. Saznajte kako da olakšate organizaciju!',
    title: `Blog | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  }

  const seoToMap = {
    ...fallback,
    ...seo
  }

  return SEOMapper(seoToMap);
}

export default async function NewsPage() {
  const initialNewsResponse = await getNews(12, 1, { 
    where: { 
      status: 'published'
    },
    depth: 1
  });

  const initialNews = initialNewsResponse.docs;
  const totalPages = initialNewsResponse.totalPages;

  return (
    <PageWrapper
      title={'Novosti'}
      className="border-0"
      breadcrumbs={{
        links: [
          { label: 'Početna', url: '/' },
          { label: 'Novosti' }
        ]
      }}
    >
      <h3>Hello</h3>
      <NewsList initialNews={initialNews} totalPages={totalPages} />
    </PageWrapper>
  );
}