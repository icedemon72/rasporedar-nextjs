import BlockWrapper from "@/components/wrappers/BlockWrapper";
import { getPageBySlug } from "@/lib/payloadcms/payloadcms";
import { SEOMapper } from "@/lib/seo/seoMapper";
import { PageProps } from "@/types/page";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) return notFound();

  const { seo } = page;

  return SEOMapper(seo);
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const page = await getPageBySlug(slug);

  if (!page) return notFound();

  return (
    <div className="space-y-4">
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
    </div>
  );
}
