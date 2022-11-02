import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.includes("/auth/login")) {
    const auth = request.cookies.get("auth");
    const locale = request.cookies.get("NEXT_LOCALE") ?? "en";
    const url = new URL(`/${locale}/posts`, request.url);

    if (auth) {
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.includes("/auth/register")) {
    const auth = request.cookies.get("auth");
    const locale = request.cookies.get("NEXT_LOCALE") ?? "en";
    const url = new URL(`/${locale}/posts`, request.url);

    if (auth) {
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/posts")) {
    const auth = request.cookies.get("auth");
    const locale = request.cookies.get("NEXT_LOCALE") ?? "en";
    const url = new URL(`/${locale}/auth/login`, request.url);

    if (!auth) {
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/post")) {
    const auth = request.cookies.get("auth");
    const locale = request.cookies.get("NEXT_LOCALE") ?? "en";
    const url = new URL(`/${locale}/auth/login`, request.url);

    if (!auth) {
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}
