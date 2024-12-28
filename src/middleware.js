import { NextResponse } from 'next/server';

export function middleware(req) {
  const response = NextResponse.next();

  // Add CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*'); // Change '*' to a specific domain in production
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );

  // Handle preflight (OPTIONS) requests
  if (req.method === 'OPTIONS') {
    response.headers.set('Content-Length', '0');
    return new Response(null, {
      headers: response.headers,
      status: 204,
    });
  }

  return response;
}


export const config = {
    matcher: ['/api/:path*'], // Adjust paths as needed
};
