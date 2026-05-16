import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Skip API routes
  if (path.startsWith('/api')) {
    return NextResponse.next();
  }

  // Skip sign-in page
  if (path === '/sign-in') {
    return NextResponse.next();
  }

  if (path === '/activate') {
    return NextResponse.next();
  }

  if (path === '/reset-password') {
    return NextResponse.next();
  }

  // Skip share page
  if (path.startsWith('/share')) {
    return NextResponse.next();
  }

  // Check if it's an admin route
  if (path.startsWith('/admin')) {
    const isAuthenticatedCookie = request.cookies.get('isAuthenticated')?.value;
    const isAuthenticated = isAuthenticatedCookie === 'true';

    if (!isAuthenticated) {
      return NextResponse.redirect(
        new URL(`/sign-in?from=${encodeURIComponent(path)}`, request.url)
      );
    }

    // Add security headers to response
    const response = NextResponse.next();

    // Security headers
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=()'
    );

    // Content Security Policy - allow iframes on monitor pages
    const isMonitorPage =
      path.startsWith('/admin/monitor') || path.includes('/monitor');
    const cspValue = isMonitorPage
      ? "default-src 'self'; frame-src 'self' http://localhost:3001 https://*.grafana.net; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;"
      : "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;";

    response.headers.set('Content-Security-Policy', cspValue);

    return response;
  }
  // Apply next-intl middleware for locale handling
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - api (API routes - handled by rewrites)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, images, fonts (static assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|templates|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|otf|html|xls)).*)',
  ],
};
