import { getPageBySlug } from "@/lib/payloadcms/payloadcms";
import { SEOMapper } from "@/lib/seo/seoMapper";
import { SEO } from "@/types/page";
import Link from "next/link";

export async function generateMetadata() {
  const page = await getPageBySlug('home');

  const { seo } = page;

  const fallback: SEO = {
    title: 'Redar Rasporeda Časova | Rasporedar',
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
    <section id="hero" className="w-full min-h-[280px] h-[calc(100vh-76px)] bg-home-day dark:bg-home-night bg-cover relative">
				<div className="absolute w-full h-full bg-black/70 flex flex-col gap-2 justify-center items-center">
					<h1 className="font-bold text-3xl text-white uppercase">Rasporedar</h1>
					<p className="font-semibold text-xl text-red-500">Redar rasporeda časova</p>
					<div className="flex justify-center gap-2">
            <div className="flex justify-center gap-2">
              <Link className="btn-primary btn-green" href="/register">
                Pridruži se
              </Link>
					  </div>
          </div>
        </div>
      </section>
  );
}
