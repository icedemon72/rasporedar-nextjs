import RegisterClient from "@/components/client/register/RegisterClient";
import { SEOMapper } from "@/lib/seo/seoMapper";
import { SEO } from "@/types/page";

export async function generateMetadata() {
  const fallback: SEO = {
    title: `Registracija | ${process.env.NEXT_PUBLIC_APP_NAME}`,
    description: 'Učlani se na platformu i počni da uredjuješ rasporede.',
    robots: 'index,follow',
    openGraph: {
      images: './favicon.ico'
    },
    keywords: 'Registracija'
  }

  return SEOMapper(fallback);
}

export default async function RegisterPage() {
  return <RegisterClient />;
}