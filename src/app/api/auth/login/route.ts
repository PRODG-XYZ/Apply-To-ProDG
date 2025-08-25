import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, generateToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const isValid = await verifyAdmin(username, password);
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' }, 
        { status: 401 }
      );
    }

    const token = await generateToken(username);
    
    const response = NextResponse.json({ 
      success: true,
      message: 'Login successful' 
    });
    
    // Set httpOnly cookie
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Changed from 'strict' to 'lax' for better compatibility
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/' // Explicitly set path
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' }, 
      { status: 500 }
    );
  }
}
