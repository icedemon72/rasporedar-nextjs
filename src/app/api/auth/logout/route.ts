import { NextRequest } from 'next/server';
import { proxyToExpress } from '@/lib/fetch/express';
import { revalidateTag } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const res = await proxyToExpress(req, '/logout');

  return res;
}