import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPaths = ['/app'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  const token = request.cookies.get('access_token')?.value;

  if (isProtected && !token) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Optionally, you could refresh/set cookie here if you want

  // Allow request
  return NextResponse.next();
}
