import { PayloadQueryParams } from "@/types/payload";

export function buildPayloadURL(base: string, params: PayloadQueryParams = {}): string {
  const url = new URL(base, process.env.PAYLOAD_CMS_URL);
  const searchParams = url.searchParams;

  if (params.where) {
    for (const field in params.where) {
      const value = params.where[field];
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        for (const operator in value) {
          const val = value[operator as keyof typeof value];
          if (Array.isArray(val)) {
            val.forEach((v) => {
              searchParams.append(`where[${field}][${operator}][]`, String(v));
            });
          } else {
            searchParams.append(`where[${field}][${operator}]`, String(val));
          }
        }
      } else {
        searchParams.append(`where[${field}][equals]`, String(value));
      }
    }
  }

  const reserved = ['where'];
  for (const key in params) {
    if (!reserved.includes(key)) {
      searchParams.set(key, String(params[key]));
    }
  }

  const queryString = searchParams.toString();
  return `${base}${queryString ? '?' + queryString : ''}`;
}
