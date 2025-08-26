import { any } from "@payloadcms/richtext-lexical/lexical";
import { SEO } from "./page";
import { INavbar } from "./nav";

export interface PayloadFetchOptions {
  next?: {
    cache?: string;
    revalidate?: number | false;
    tags?: string[];
  },
  method?: string;
  body?: string;
  headers?: HeadersInit;
}

type FilterValue = string | number | boolean;

type WhereCondition = Record<string, FilterValue | {
  equals?: FilterValue;
  not_equals?: FilterValue;
  in?: FilterValue[];
  like?: string;
}>;

export interface PayloadQueryParams {
  where?: WhereCondition;
  depth?: number;
  limit?: number;
  page?: number;
  sort?: string;
  [key: string]: any;
}

export interface PayloadResponseDefaults {
  id: string;
  updatedAt: string;
  createdAt: string;
}

export interface PayloadQueryResponse<T> {
  docs: T[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number | null;
  page: number;
  pagingCounter: number;
  prevPage: number | null;
  totalDocs: number;
  totalPages: number;
}

export interface PayloadPage extends PayloadResponseDefaults {
  title: string;
  slug: string;
  seo: SEO;
  layout: any[];
}

export interface PayloadMedia {
  alt: string;
  createdAt: string;
  filename: string;
  filesize: number;
  focalX: number;
  focalY: number;
  height: number;
  id: string;
  mimeType: string;
  thumbnailUrl: string | null;
  updatedAt: string;
  url: string;
  width: number;
}

export interface ISiteSettings extends PayloadResponseDefaults {
  logo: string;
  title: string;
  navigationBar: INavbar;
}

interface BlogBase {
  slug: string;
  title: string;
  excerpt: string;  
  publishedDate: string;
  featuredImage: PayloadMedia;
  status: 'published' | 'archived' | 'draft';
  tags: string[];
}

export interface IBlog extends PayloadResponseDefaults, BlogBase {
  content: any;
  relatedBlogs: BlogBase[];
  seo: SEO;
}

export type Priority = "above" | "below";

export interface CallToActionBlock {
  blockType: "call-to-action";
  priority: Priority;
  title: string;
  description?: string;
  buttons?: {
    label: string;
    url: string;
  }[];
}

export interface AccordionBlock {
  blockType: "accordion";
  priority: Priority;
  items: {
    question: string;
    answer: any;
  }[];
}

export interface FeatureListBlock {
  blockType: "feature-list";
  priority: Priority;
  sectionTitle?: string;
  features: {
    icon?: PayloadMedia;
    title: string;
    description?: string;
  }[];
}

export interface HeroBlock {
  blockType: "hero";
  priority: Priority;
  backgroundImage: PayloadMedia;
  title: string;
  subtitle?: string;
  buttons?: {
    label: string;
    url: string;
  }[];
  icon?: PayloadMedia;
}

export interface ImageTextBlock {
  blockType: "image-text";
  priority: Priority;
  imagePosition: "left" | "right";
  image: PayloadMedia;
  title?: string;
  content?: any;
}

export interface MediaGalleryBlock {
  blockType: "media-gallery";
  priority: Priority;
  title?: string;
  images: {
    image: PayloadMedia;
    caption?: string;
  }[];
}

export interface TestimonialBlock {
  blockType: "testimonial";
  priority: Priority;
  quote: string;
  author: string;
  role?: string;
  avatar?: PayloadMedia;
}

export type PageBlock =
  | CallToActionBlock
  | AccordionBlock
  | FeatureListBlock
  | HeroBlock
  | ImageTextBlock
  | MediaGalleryBlock
  | TestimonialBlock;