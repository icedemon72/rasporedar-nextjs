import { getBlogs, getPageBySlug } from "@/lib/payloadcms/payloadcms";
import { SEOMapper } from "@/lib/seo/seoMapper";
import BlogList from "@/components/ui/blog/BlogList";
import PageWrapper from "@/components/wrappers/PageWrapper";

export async function generateMetadata() {
  const page = await getPageBySlug('blogs');

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

export default async function BlogsPage() {
  const initialBlogsResponse = await getBlogs(9, 1, { 
    where: { 
      status: 'published'
    },
    depth: 1
  });

  const initialBlogs = initialBlogsResponse.docs;
  const totalPages = initialBlogsResponse.totalPages;

  return (
    <PageWrapper 
      title={'Blogovi'}
      breadcrumbs={{
        links: [
          { label: 'Početna', url: '/' },
          { label: 'Blogovi' }
        ]
      }}
    >
      <BlogList initialBlogs={initialBlogs} totalPages={totalPages} />
    </PageWrapper>
  );
}