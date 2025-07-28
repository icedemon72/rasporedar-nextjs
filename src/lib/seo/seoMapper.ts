import { SEO } from "@/types/page";

export const SEOMapper = (seo: SEO, fallBack?: SEO): SEO => {
  if (!fallBack) {
    fallBack = {
      title: '',
      description: '',
      robots: 'noindex,nofollow',
      openGraph: {
        images: './favicon.ico'
      },
      keywords: ''
    }
  }

  const merged: SEO = { ...fallBack };

  (Object.keys(seo) as (keyof Omit<SEO, "openGraph">)[]).forEach((key) => {
    const value = seo[key];
    if (value !== null && value !== "" && key !== 'twitter') {
      merged[key] = value as string;
    }
  });

  if (seo.openGraph && Object.keys(seo.openGraph).length > 0) {
    merged.openGraph = {
      ...fallBack.openGraph,
      ...seo.openGraph,
    };
  }

  merged.twitter = {
    images: [merged.openGraph.images],
    card: 'summary_large_image',
    title: merged.title,
    description: merged.description,
  };

  return merged;
};