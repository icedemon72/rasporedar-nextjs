import { NextRequest } from 'next/server';
import { proxyToExpress } from '@/lib/fetch/express';
import { revalidateTag } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string, subject: string }> }) {
  const { id, subject } = await params;
  const res = await proxyToExpress(req, `/institutions/${id}/subjects/${subject}`);

  if (res.ok) {
    revalidateTag(`subjects-institution-${id}`)
  }

  return res;
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string, subject: string }> }) {
  const { id, subject } = await params;
  const res = await proxyToExpress(req, `/institutions/${id}/subjects/${subject}`);

  if (res.ok) {
    revalidateTag(`subjects-institution-${id}`)
  }

  return res;
}