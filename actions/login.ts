'use server';

import * as z from 'zod';

import { signIn } from '@/auth';
import { loginSchema } from '@/lib/schemas';
import { AuthError } from 'next-auth';

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/dashboard',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Kullanıcı veya şifre hatalı' };
        default:
          return { error: 'Bir şeyler ters gitti.' };
      }
    }
    throw error;
  }
};
