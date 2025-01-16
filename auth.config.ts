import { type DefaultSession } from 'next-auth';
import NextAuth, { User as NextAuthUser, Session } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

import type { NextAuthConfig } from 'next-auth';

import { loginSchema } from './lib/schemas';
import { getUserByEmail } from './lib/data';
import { compareSync } from 'bcrypt-ts';

interface UserWithRole extends NextAuthUser {
  role: string;
  plan: string;
}

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedFields = loginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        const user = await getUserByEmail(email);

        if (!user || !user.password) {
          return null;
        }

        const passwordMatch = compareSync(password, user.password);

        if (!passwordMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const protectedRoutes = ['/dashboard'];

      if (!isLoggedIn && protectedRoutes.includes(nextUrl.pathname)) {
        return Response.redirect(new URL('/login', nextUrl));
      }

      if (isLoggedIn && nextUrl.pathname.startsWith('/login')) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },
    jwt({ token, user }) {
      // console.log(token, 'token');
      if (user) {
        token.role = (user as UserWithRole).role;
        token.plan = (user as UserWithRole).plan;
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.sub ?? '';
      session.user.role = token.role;
      session.user.plan = token.plan;

      return session;
    },
  },
} satisfies NextAuthConfig;
