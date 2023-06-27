import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import validateToken from '@/verify-token';

export async function middleware(request: NextRequest) {    
    try {
        if(!(await validateToken(request)))
        {
            return new NextResponse
            (
                JSON.stringify({ success: false, message: 'authentication failed' }),
                { status: 401, headers: { 'content-type': 'application/json' } },
            );
        }
    }
    catch(err){
        return new NextResponse
        (
            JSON.stringify({ success: false, message: 'authentication failed' }),
            { status: 401, headers: { 'content-type': 'application/json' } },
        );
    }
}
 
export const config = {
  matcher: '/api/:path*',
};