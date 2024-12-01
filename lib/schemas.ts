import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Lütfen geçerli bir e-posta adresi girin'),
  password: z.string().min(1, 'Şifre alanı boş bırakılamaz'),
});

export const registerSchema = z.object({
  name: z.string().min(1, 'Ad Soyad alanını boş bırakamazsınız'),
  email: z.string().email('Lütfen geçerli bir e-posta adresi girin'),
  password: z
    .string()
    .min(8, 'Şifre en az 8 en fazla 20 karakter olmalıdır')
    .max(20, 'Şifre en az 8 en fazla 20 karakter olmalıdır'),
});
