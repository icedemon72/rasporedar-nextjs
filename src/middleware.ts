import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getApiURL } from './utils/docker';

const API_BASE_URL = getApiURL() || 'http://localhost:3001';

// Protected routes that require authentication - updated for /app/app/ structure
const protectedRoutes = ['/app'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  if (isProtectedRoute) {
    // Get cookies from the request
    const cookieHeader = request.headers.get('cookie') || ''

    try {
      const response = await fetch(`${API_BASE_URL}/me`, {
        headers: {
          Cookie: cookieHeader,
        },
        credentials: 'include',
      })

      if (!response.ok && response.status === 401) {
        const refreshResponse = await fetch(`${API_BASE_URL}/refresh`, {
          method: 'POST',
          headers: {
            Cookie: cookieHeader,
          },
          credentials: 'include',
        })

        if (!refreshResponse.ok) {
          const loginUrl = new URL('/login', request.url)
          loginUrl.searchParams.set('redirectTo', pathname)
          return NextResponse.redirect(loginUrl)
        }
      }
    } catch (error) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirectTo', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}
 
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
