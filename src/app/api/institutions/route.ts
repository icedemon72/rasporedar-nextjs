import { NextRequest } from 'next/server';
import { proxyToExpress } from '@/lib/fetch/express';
import { revalidateTag } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const res = await proxyToExpress(req, '/institutions');

  if (res.ok) {
    const refreshToken = req.cookies.get('refresh_token')?.value;

    if (refreshToken) {
      revalidateTag(`institutions-${refreshToken}`);
    } else {
      console.warn('No refresh_token cookie found; skipping tag revalidation');
    }
  }

  return res;
}