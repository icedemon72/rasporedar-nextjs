import { NextRequest, NextResponse } from 'next/server';
import { fetchWithAuthServer } from '../auth/auth-server';

export async function proxyToExpress(req: NextRequest, targetPath: string) {
  try {
    const url = new URL(req.url);
    const queryString = url.searchParams.toString();
    const fullPath = queryString ? `${targetPath}?${queryString}` : targetPath;

    const body = ['GET', 'HEAD'].includes(req.method)
      ? undefined
      : await req.text();

    const headers = new Headers(req.headers);

    if (!headers.has('Content-Type') && body) {
      headers.set('Content-Type', 'application/json');
    }

    const expressRes = await fetchWithAuthServer(fullPath, {
      method: req.method,
      headers,
      body,
    });

    const contentType = expressRes.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const json = await expressRes.json();
      return NextResponse.json(json, {
        status: expressRes.status,
        headers: expressRes.headers,
      });
    } else {
      const text = await expressRes.text();
      return new NextResponse(text, {
        status: expressRes.status,
        headers: expressRes.headers,
      });
    }

  } catch (error: any) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}