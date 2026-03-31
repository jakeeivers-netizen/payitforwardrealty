import { NextRequest } from 'next/server';
import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabase';

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const iterations = 100000;
  const hash = crypto
    .pbkdf2Sync(password, salt, iterations, 64, 'sha512')
    .toString('hex');
  return `pbkdf2:${iterations}:${salt}:${hash}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, password } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return Response.json(
        { error: 'First name, last name, email, and password are required.' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return Response.json(
        { error: 'Password must be at least 8 characters.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    if (!supabaseAdmin) {
      return Response.json(
        { error: 'User registration is not available — database not configured.' },
        { status: 503 }
      );
    }

    const passwordHash = hashPassword(password);

    const { error } = await supabaseAdmin.from('users').insert({
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim() || null,
      password_hash: passwordHash,
      created_at: new Date().toISOString(),
    });

    if (error) {
      if (error.code === '23505') {
        return Response.json(
          { error: 'An account with this email already exists.' },
          { status: 409 }
        );
      }
      console.error('Supabase insert error:', error);
      return Response.json(
        { error: 'Failed to create account. Please try again.' },
        { status: 500 }
      );
    }

    return Response.json({ success: true, message: 'Account created successfully.' });
  } catch (error) {
    console.error('Register API error:', error);
    return Response.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
