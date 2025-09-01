import { getPageBySlug } from "@/lib/payloadcms/payloadcms";
import { SEOMapper } from "@/lib/seo/seoMapper";
import { SEO } from "@/types/page";
import BlockWrapper from "../components/wrappers/BlockWrapper";

export async function generateMetadata() {
  const page = await getPageBySlug('home');

  const { seo } = page;

  const fallback: SEO = {
    title: `Redar Rasporeda Časova | ${process.env.NEXT_PUBLIC_APP_NAME}`,
    description: 'Aplikacija za efikasan menadžment rasporeda časova – jednostavno kreiranje, pregled i organizacija školskih rasporeda na jednom mestu.',
    robots: 'index,follow',
    openGraph: {
      images: './favicon.ico'
    },
    keywords: 'Rasporedar'
  }

  return SEOMapper(seo, fallback);
}

export default async function HomePage() {
  const page = await getPageBySlug('home');

  return (
    <div className="space-y-4">
    { 
      page.layout.map((block, index) => (
        <BlockWrapper {...block} isHome={true} key={index} />
      ))
    }
    </div>
  );
}
