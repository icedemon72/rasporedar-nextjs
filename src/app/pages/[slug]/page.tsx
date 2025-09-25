import BlockWrapper from "@/components/wrappers/BlockWrapper";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { getPageBySlug } from "@/lib/payloadcms/payloadcms";
import { SEOMapper } from "@/lib/seo/seoMapper";
import { PageProps } from "@/types/page";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPageBySlug(`pages/${slug}`);

  if (!page) return notFound();

  const { seo } = page;

  return SEOMapper(seo);
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const page = await getPageBySlug(`pages/${slug}`);

  if (!page) return notFound();

  return (
    <PageWrapper title={page.title} className="space-y-4">
      {
        page.layout
        .filter((b) => b.priority === "above")
        .map((block, i) => <BlockWrapper key={i} {...block} />)
      }

      {
        page.layout
        .filter((b) => b.priority !== "above")
        .map((block, i) => <BlockWrapper key={i} {...block} />)
      }
    </PageWrapper>
  );
}
