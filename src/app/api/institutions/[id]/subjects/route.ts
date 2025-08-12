import { NextRequest, NextResponse } from 'next/server';
import { proxyToExpress } from '@/lib/fetch/express';
import { revalidateTag } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await proxyToExpress(req, `/institutions/${id}/subjects`);

  if (res.ok) {
    revalidateTag(`subjects-institution-${id}`)
  }

  return res;
}