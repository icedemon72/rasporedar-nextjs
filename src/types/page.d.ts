import { Twitter } from "next/dist/lib/metadata/types/twitter-types";

export type SEO = {
  title: string;
  description: string;
  robots: string;
  openGraph: {
    images: any;
  };
  twitter?: Twitter;
  keywords: string;
};

export type PageProps<
  P extends Record<string, any> = Record<string, any>, 
  S extends Record<string, any> = Record<string, any>
> = {
  params: Promise<P>;
  searchParams: Promise<S>;
};