import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { SEO } from "./page";

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

export interface ISiteSettings extends PayloadResponseDefaults {
  logo: string;
  title: string;
  navigationBar: {
    logo: string;
    title: string;
    links: {
      label: string;
      url?: string;
      isDropdown: boolean;
      links: {
        label: string;
        url: string;
      }
    }
  }
}

interface BlogBase {
  slug: string;
  title: string;
  excerpt: string;  
  publishedDate: string;
  status: 'published' | 'archived' | 'draft';
  tags: string[];
}

export interface IBlog extends PayloadResponseDefaults, BlogBase {
  content: SerializedEditorState;
  relatedBlogs: BlogBase[];
  seo: SEO;
}