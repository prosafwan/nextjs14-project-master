// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  const isAuthenticated = false; // Replace with real auth logic
  if (!isAuthenticated && request.url.includes('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
