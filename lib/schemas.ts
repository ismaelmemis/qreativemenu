import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Geçersiz e-posta adresi'),
  password: z.string().min(1, 'Şifre alanı boş bırakılamaz'),
});
