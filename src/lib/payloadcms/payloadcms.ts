import { IBlog, ISiteSettings, PayloadFetchOptions, PayloadPage, PayloadQueryParams, PayloadQueryResponse } from '@/types/payload';
import { headers} from 'next/headers';
import { buildPayloadURL } from './buildPayloadUrl';

const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL;
const apiKey = process.env.PAYLOAD_CMS_KEY;

if (!baseUrl) throw new Error('NEXT_PUBLIC_PAYLOAD_CMS_URL environment variable is not defined');
if (!apiKey) throw new Error('PAYLOAD_CMS_KEY environment variable is not defined');

const defaultFetchOptions: PayloadFetchOptions = {
  next: {
    tags: ['payloadcms'],
    revalidate: 3600,
  },
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `third-party-access API-Key ${apiKey}`,
  },
};

export async function payloadCMSFetch<T>(
  endpoint: string,
  options: PayloadFetchOptions = {},
  specificTags: string[] = []
): Promise<T> {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || 'rasporedar-nextjs';

  try {
    const mergedHeaders = {
      ...defaultFetchOptions.headers,
      'User-Agent': userAgent,
      ...(options.headers || {}),
    };

    const mergedNext = {
      ...defaultFetchOptions.next,
      ...(options.next || {}),
      tags: [
        ...(defaultFetchOptions.next?.tags || []),
        ...(options.next?.tags || []),
        ...specificTags,
      ],
    };
    const response = await fetch(`${baseUrl}${endpoint}`, {
      headers: mergedHeaders,
      next: mergedNext,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`PayloadCMSFetch error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    console.error('PayloadCMSFetch failed:', error);
    throw error;
  }
}

export async function getPageBySlug(slug: string, revalidate: number = 43200): Promise<PayloadPage> {
  const params: PayloadQueryParams = {
    where: {
      slug,
    }
  }

  const url = buildPayloadURL('/api/pages', params);
  const response: PayloadQueryResponse<PayloadPage> = await payloadCMSFetch(url, {
    next: {
      tags: ['pages', `pages-${slug}`],
      revalidate
    }
  });

  return response.docs[0];
}

export async function getPages(limit: number = 100): Promise<PayloadQueryResponse<PayloadPage>> {
  const params: PayloadQueryParams = {
    limit
  }

  const url = buildPayloadURL('/api/pages', params);

  const response: PayloadQueryResponse<PayloadPage> = await payloadCMSFetch(url, {
    next: {
      tags: ['pages'],
      revalidate: 86400
    }
  });

  return response;
}

export async function getSiteSettings(revalidate: number = 86400): Promise<ISiteSettings> {
  const url = buildPayloadURL('/api/globals/site-settings');

  const response: ISiteSettings = await payloadCMSFetch(url, {
    next: {
      tags: ['site-settings'],
      revalidate
    }
  });

  return response;
}

export async function getBlogBySlug(slug: string, revalidate: number = 86400): Promise<IBlog> {
  const params: PayloadQueryParams = {
    where: {
      slug,
      status: {
        not_equals: 'draft'
      }
    },
    limit: 1
  }

  const url = buildPayloadURL('/api/blogs', params);
  const response: PayloadQueryResponse<IBlog> = await payloadCMSFetch(url, {
    next: {
      tags: ['blogs', `blogs-${slug}`],
      revalidate
    }
  });

  return response.docs[0];
}

export async function getBlogs(limit: number = 100, customParams: PayloadQueryParams = {}): Promise<PayloadQueryResponse<IBlog>> {
  const params: PayloadQueryParams = {
    limit,
  }

  const url = buildPayloadURL('/api/blogs', params);
  const response: PayloadQueryResponse<IBlog> = await payloadCMSFetch(url, {
    next: {
      tags: ['blogs'],
    }
  });

  return response;
}