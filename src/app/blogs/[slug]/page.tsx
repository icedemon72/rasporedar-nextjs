import BlogCard from "@/components/ui/blog/BlogCard";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { getBlogBySlug } from "@/lib/payloadcms/payloadcms";
import { SEOMapper } from "@/lib/seo/seoMapper";
import { PageProps } from "@/types/page";
import { getPayloadURL } from "@/utils/docker";
import { toHTML } from "@/utils/serializeLexical";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) return notFound();

  const { seo } = blog;

  const seoMapped = {
    ...seo,
    openGraph: {
      images: `${getPayloadURL()}${seo?.openGraph?.images?.url}`
    }
  }

  return SEOMapper(seoMapped);
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) return notFound();

  const content = toHTML(blog.content);
  return (
    <PageWrapper
      title={blog.title}
      breadcrumbs={{
        links: [
          { label: 'Početna', url: '/' },
          { label: 'Blogovi', url: '/blogs' },
          { label: blog.title }
        ]
      }}
    >
      <div className="blog-content" dangerouslySetInnerHTML={{__html: content}} />
      {
        blog?.relatedBlogs?.length > 0 && (
          <div className="flex flex-col items-center space-y-4">
            <h2>Slični blogovi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {blog.relatedBlogs.slice(0, 3).map((b, index) => (
                <BlogCard blog={b} key={index} />
              ))}
            </div>
          </div>
        )
      }
    </PageWrapper>
  );
}