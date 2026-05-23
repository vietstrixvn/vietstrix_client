import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';

  const isBot =
    /facebookexternalhit|Twitterbot|Googlebot|bingbot|crawler|spider|bot/i.test(
      userAgent
    );

  if (isBot) {
    const url = request.nextUrl.clone();
    // Chỉ thêm /en nếu chưa có locale prefix
    if (!url.pathname.startsWith('/en') && !url.pathname.startsWith('/vi')) {
      url.pathname = `/en${url.pathname === '/' ? '' : url.pathname}`;
    }
    return NextResponse.rewrite(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|templates|share|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|otf|html|xls)).*)',
  ],
};
