import { NextRequest } from 'next/server';
import { proxyToExpress } from '@/lib/fetch/express';
import { revalidateTag } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function DELETE(req: NextRequest,  { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await proxyToExpress(req, `/institutions/${id}`);

  if (res.ok) {
    const refreshToken = req.cookies.get('refresh_token')?.value;
    revalidateTag(`institution-${id}`)
    if (refreshToken) {
      revalidateTag(`institutions-${refreshToken}`);
    } else {
      console.warn('No refresh_token cookie found; skipping tag revalidation');
    }
  }

  return res;
}

export async function PATCH(req: NextRequest,  { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await proxyToExpress(req, `/institutions/${id}`);

  if (res.ok) {
    const refreshToken = req.cookies.get('refresh_token')?.value;
    revalidateTag(`institution-${id}`)
    
    if (refreshToken) {
      revalidateTag(`institutions-${refreshToken}`);
    } else {
      console.warn('No refresh_token cookie found; skipping tag revalidation');
    }
  }

  return res;
}