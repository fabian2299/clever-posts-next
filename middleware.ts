import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.includes("/login")) {
    const auth = request.cookies.get("auth");

    if (auth) {
      return NextResponse.redirect(new URL("/posts", request.url));
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.includes("/register")) {
    const auth = request.cookies.get("auth");

    if (auth) {
      return NextResponse.redirect(new URL("/posts", request.url));
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/posts")) {
    const auth = request.cookies.get("auth");

    if (!auth) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/post")) {
    const auth = request.cookies.get("auth");

    if (!auth) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}
