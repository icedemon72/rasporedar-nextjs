import { NextRequest, NextResponse } from 'next/server';
import { getBlogs } from '@/lib/payloadcms/payloadcms';

export async function GET(req: NextRequest) {
  const page = Number(req.nextUrl.searchParams.get('page') || '1');
  const limit = Number(req.nextUrl.searchParams.get('limit') || '6');

  const response = await getBlogs(limit, page, { where: { status: 'published' } });
  return NextResponse.json(response);
}