import { customFetch } from '@/lib/fetcher';
import { cookies } from 'next/headers';

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function getSession() {
  return { accessToken };
}

export async function getUserFromCookie() {
  const cookieStore = await cookies();
  const token = accessToken || cookieStore.get('access_token')?.value;
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (!token && !refreshToken) return null;

  const res = await customFetch(`${process.env.API_URL}/me`, {
    credentials: 'include',
    next: {
      revalidate: 300,
      tags: ['sessions', `session-${token}`],
    },
  });

  console.log(res);

  if (!res.ok) return null;

  return res.json();
}