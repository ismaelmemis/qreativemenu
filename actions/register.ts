'use server';

import * as z from 'zod';
import { hashSync } from 'bcrypt-ts';
import { db } from '@/lib/db';

import { registerSchema } from '@/lib/schemas';
import { getUserByEmail } from '@/lib/data';
import { addDays } from '@/lib/dates';

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = hashSync(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'E-Posta zaten kayıtlı. Lütfen farklı bir e-posta adresiyle hesap oluşturun' };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      subscription: {
        create: {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          plan: 'FREE',
        },
      },
    },
  });

  return {
    success: 'Hesap Oluşturuldu. Yönlendiriliyorsunuz...',
    email: email,
    password: password,
  };
};
