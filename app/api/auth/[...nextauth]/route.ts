import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { supabaseAdmin } from '@/lib/supabase';
import crypto from 'crypto';

function verifyPassword(password: string, hash: string): boolean {
  try {
    // hash format: algorithm:iterations:salt:hash
    const parts = hash.split(':');
    if (parts.length !== 4) return false;
    const [, iterStr, salt, storedHash] = parts;
    const iterations = parseInt(iterStr, 10);
    const derived = crypto
      .pbkdf2Sync(password, salt, iterations, 64, 'sha512')
      .toString('hex');
    return crypto.timingSafeEqual(
      Buffer.from(derived, 'hex'),
      Buffer.from(storedHash, 'hex')
    );
  } catch {
    return false;
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        if (!supabaseAdmin) {
          console.warn('Supabase not configured — login unavailable.');
          return null;
        }

        try {
          const { data, error } = await supabaseAdmin
            .from('users')
            .select('id, email, first_name, last_name, password_hash')
            .eq('email', credentials.email.toLowerCase())
            .single();

          if (error || !data) return null;

          const valid = verifyPassword(credentials.password, data.password_hash);
          if (!valid) return null;

          return {
            id: data.id,
            email: data.email,
            name: `${data.first_name} ${data.last_name}`.trim(),
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as typeof session.user & { id: string }).id = token.id as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
