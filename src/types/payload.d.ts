import { any } from "@payloadcms/richtext-lexical/lexical";
import { SEO } from "./page";
import { INavbar } from "./nav";

export type PayloadButton = {
  label: string;
  url: string;
  style?: 'primary' | 'secondary';
}

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

export type IFooter = {
  buttonSection?: {
    title?: string;
    button?: {
      label: string;
      url: string;
    };
  };
  linksSection?: PayloadButton[];
  contactSection?: Array<{
    icon: PayloadMedia;
    title: string;
    subtitle?: string;
  }>;
  copyright?: string;
  staticPages?: Array<{
    label: string;
    page: string | {
      id: string;
      slug: string;
      title: string;
    };
  }>;
};


export interface ISiteSettings extends PayloadResponseDefaults {
  logo: string;
  title: string;
  navigationBar: INavbar;
  footer: IFooter;
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

export type CallToActionCard = {
  title: string;
  description?: string;
  image: PayloadMedia;
}

export type QAItem = {
  question: string;
  answer: any;
}

export interface CallToActionBlock {
  blockType: "call-to-action";
  priority: Priority;
  title: string;
  description?: string;
  buttons?: PayloadButton[];
  backgroundImage: PayloadMedia;
  cards?: CallToActionCard[];
}

export interface AccordionBlock {
  blockType: "accordion";
  priority: Priority;
  items: QAItem[];
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
    style: 'primary' | 'secondary';
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

export interface TestimonialItem {
  quote: string;
  author: string;
  role?: string;
  avatar?: PayloadMedia;
}

export interface TestimonialBlock {
  blockType: 'testimonial';
  priority?: Priority;
  title?: string;
  description?: string;
  testimonials: TestimonialItem[];
}

export type CardLinkItem = {
    title: string;
    description?: string;
    image: PayloadMedia;
    url: string;
  }

export interface CardLinksBlock {
  blockType: "card_link";
  blockName?: string;
  title?: string;
  description?: string;
  priority?: Priority;
  card_links: CardLinkItem[];
}

export interface FAQBlock {
  blockType: "faq";
  blockName?: string;
  title: string;
  description?: any;
  priority: Priority;
  accordion?: AccordionBlock[];
}


export type PageBlock =
  | CallToActionBlock
  | AccordionBlock
  | FeatureListBlock
  | HeroBlock
  | ImageTextBlock
  | MediaGalleryBlock
  | TestimonialBlock
  | CardLinksBlock
  | FAQBlock;