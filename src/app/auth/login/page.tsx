import LoginClient from '@/components/client/login/LoginClient';
import { getCurrentUserServer } from '@/lib/auth/auth-server';
import { SEOMapper } from '@/lib/seo/seoMapper';
import { PageProps, SEO } from '@/types/page';
import { redirect } from 'next/navigation';

export async function generateMetadata() {
  const fallback: SEO = {
    title: `Prijava | ${process.env.NEXT_PUBLIC_APP_NAME}`,
    description: 'Prijavi se i vidi svoje rasporede.',
    robots: 'index,follow',
    openGraph: {
      images: './favicon.ico'
    },
    keywords: 'Prijava'
  }

  return SEOMapper(fallback);
}

export default async function LoginPage({ searchParams }: PageProps) {
  const { redirectTo } = await searchParams;
  
  return (
    <LoginClient redirectTo={redirectTo || '/app'} />
  );
}