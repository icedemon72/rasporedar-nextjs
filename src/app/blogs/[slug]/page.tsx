import { getBlogBySlug } from "@/lib/payloadcms/payloadcms";
import { SEOMapper } from "@/lib/seo/seoMapper";
import { PageProps } from "@/types/page";
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
      images: `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL}${seo?.openGraph?.images?.url}`
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
    <>
      <h1>{blog.title}</h1>
      <div dangerouslySetInnerHTML={{__html: content}} />
      {
        blog?.relatedBlogs?.length && (blog.relatedBlogs.map((b, index) => <p key={index}>{b.title}</p>))
      }
    </>
  );
}