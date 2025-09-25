import { NextRequest, NextResponse } from 'next/server';
import { proxyToExpress } from '@/lib/fetch/express';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const res = await proxyToExpress(req, '/logout');

  const nextRes = new NextResponse(JSON.stringify({ message: 'Logged out' }), {
    status: res.status,
    headers: { 'Content-Type': 'application/json' }
  });
  nextRes.cookies.set('access_token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    expires: new Date(0),
  });

  nextRes.cookies.set('refresh_token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    expires: new Date(0),
  });

  return nextRes;
}