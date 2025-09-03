import { NextRequest, NextResponse } from 'next/server';
import { proxyToExpress } from '@/lib/fetch/express';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  // Proxy logout to Express
  const res = await proxyToExpress(req, '/logout');

  // Prepare NextResponse to clear cookies in the browser
  const nextRes = new NextResponse(JSON.stringify({ message: 'Logged out' }), {
    status: res.status,
    headers: { 'Content-Type': 'application/json' }
  });

  // Clear cookies from browser (from Next.js side)
  nextRes.cookies.set('access_token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    expires: new Date(0), // Expire immediately
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