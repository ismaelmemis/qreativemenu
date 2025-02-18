import * as z from 'zod';
import { zfd } from 'zod-form-data';

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

export const createCategorySchema = z.object({
  menuId: z.string(),
  name: z.string().min(1, { message: 'Kategori Adı boş bırakılamaz.' }),
  description: z.string().optional(),
  image: zfd
    .file()
    .refine((file) => file.size < 3000000, {
      message: "Dosyanın boyutu 5MB'dan fazla olamaz.",
    })
    .refine((file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type), {
      message: 'Dosyanın formatı jpg, jpeg veya png olmalıdır.',
    })
    .optional(),
});

export const createMenuItemSchema = z.object({
  menuId: z.string(),
  name: z.string().min(1, { message: 'Ürün Adı boş bırakılamaz.' }),
  category: z.string().min(1, { message: 'En az bir kategori seçmelisiniz' }),
  description: z.string().optional(),
  image: zfd
    .file()
    .refine((file) => file.size < 3000000, {
      message: "Dosyanın boyutu 5MB'dan fazla olamaz.",
    })
    .refine((file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type), {
      message: 'Dosyanın formatı jpg, jpeg veya png olmalıdır.',
    })
    .optional(),
  price: z.string().optional(),
  keyingredients: z.string().optional(),
  allergens: z.string().optional(),
  time: z.string().optional(),
  calorie: z.string().optional(),
});

export const editMenuSettings = z.object({
  name: z.string().min(1, { message: 'Menü Adı boş bırakılamaz.' }),
  theme: z.string().optional(),
  coverImage: zfd
    .file()
    .refine((file) => file.size < 3000000, {
      message: "Dosyanın boyutu 3MB'dan fazla olamaz.",
    })
    .refine((file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type), {
      message: 'Dosyanın formatı jpg, jpeg veya png olmalıdır.',
    })
    .optional(),
  coverVideo: zfd
    .file()
    .refine((file) => file.size < 10000000, {
      message: "Dosyanın boyutu 10MB'dan fazla olamaz.",
    })
    .refine((file) => ['video/mp4', 'video/ogg'].includes(file.type), {
      message: 'Dosyanın formatı mp4 veya ogg olmalıdır.',
    })
    .optional(),
  coverLogo: zfd
    .file()
    .refine((file) => file.size < 3000000, {
      message: "Dosyanın boyutu 3MB'dan fazla olamaz.",
    })
    .refine((file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type), {
      message: 'Dosyanın formatı jpg, jpeg veya png olmalıdır.',
    })
    .optional(),
});

export const createCampaignSchema = z.object({
  name: z.string().min(1, { message: 'Kampanya Başlığı boş bırakılamaz.' }),
  description: z.string().min(1, { message: 'Kampanya Detayı boş bırakılamaz.' }),
  featured: z.boolean().optional(),
  image: zfd
    .file()
    .refine((file) => file.size < 3000000, {
      message: "Dosyanın boyutu 3MB'dan fazla olamaz.",
    })
    .refine((file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type), {
      message: 'Dosyanın formatı jpg, jpeg veya png olmalıdır.',
    })
    .optional(),
  coverImg: zfd
    .file()
    .refine((file) => file.size < 3000000, {
      message: "Dosyanın boyutu 3MB'dan fazla olamaz.",
    })
    .refine((file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type), {
      message: 'Dosyanın formatı jpg, jpeg veya png olmalıdır.',
    })
    .optional(),
});

export const updateCampaignSchema = z.object({
  name: z.string().min(1, { message: 'Kampanya Başlığı boş bırakılamaz.' }),
  description: z.string().min(1, { message: 'Kampanya Detayı boş bırakılamaz.' }),
  featured: z.boolean().optional(),
  image: zfd
    .file()
    .refine((file) => file.size < 3000000, {
      message: "Dosyanın boyutu 3MB'dan fazla olamaz.",
    })
    .refine((file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type), {
      message: 'Dosyanın formatı jpg, jpeg veya png olmalıdır.',
    })
    .optional(),
  coverImg: zfd
    .file()
    .refine((file) => file.size < 3000000, {
      message: "Dosyanın boyutu 3MB'dan fazla olamaz.",
    })
    .refine((file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type), {
      message: 'Dosyanın formatı jpg, jpeg veya png olmalıdır.',
    })
    .optional(),
});

export const createTableAreaSchema = z.object({
  name: z.string().min(1, { message: 'Masa Adı Alanı boş bırakılamaz.' }),
});

export const createTableSchema = z.object({
  name: z.string().min(1, { message: 'Masa Adı boş bırakılamaz.' }),
  tableArea: z.string().optional(),
  capacity: z.number().min(1, { message: 'Masa Kapasitesi negatif olamaz.' }),
});

export const updateBranchSettings = z.object({
  logo: zfd
    .file()
    .refine((file) => file.size < 3000000, {
      message: "Dosyanın boyutu 3MB'dan fazla olamaz.",
    })
    .refine((file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type), {
      message: 'Dosyanın formatı jpg, jpeg veya png olmalıdır.',
    })
    .optional(),
  venueImage: zfd
    .file()
    .refine((file) => file.size < 3000000, {
      message: "Dosyanın boyutu 3MB'dan fazla olamaz.",
    })
    .refine((file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type), {
      message: 'Dosyanın formatı jpg, jpeg veya png olmalıdır.',
    })
    .optional(),
  branchName: z.string().min(1, { message: 'Sube Adı boş bırakılamaz.' }),
  description: z.string().optional(),
  address: z.string().optional(),
  currency: z.string().optional(),
});

export const updateBranchContactSettings = z.object({
  email: z.string().email('Lütfen geçerli bir e-posta adresi girin').optional(),
  telephone: z
    .string()
    .regex(/^[0-9+\-\s()]*$/, 'Lütfen geçerli bir telefon numarası girin')
    .min(10, 'Telefon numarası en az 10 karakter olmalıdır')
    .max(20, 'Telefon numarası en fazla 20 karakter olmalıdır')
    .optional(),
  whatsapp: z
    .string()
    .regex(/^[0-9+\-\s()]*$/, 'Lütfen geçerli bir telefon numarası girin')
    .min(10, 'Telefon numarası en az 10 karakter olmalıdır')
    .max(20, 'Telefon numarası en fazla 20 karakter olmalıdır')
    .optional(),
});

export const updateBranchWifiSettings = z.object({
  name: z.string().optional(),
  password: z.string().optional(),
  encryption: z.string().optional(),
});

export const updateProfileSettings = z.object({
  image: zfd
    .file()
    .refine((file) => file.size < 3000000, {
      message: "Dosyanın boyutu 3MB'dan fazla olamaz.",
    })
    .refine((file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type), {
      message: 'Dosyanın formatı jpg, jpeg veya png olmalıdır.',
    })
    .optional(),
  username: z.string().min(1, { message: 'Kullanıcı adı boş bırakılamaz.' }),
});

export const updatePasswordSettings = z
  .object({
    password: z.string().min(1, 'Şifre alanı boş bırakılamaz'),
    newPassword: z
      .string()
      .min(8, 'Şifre en az 8 en fazla 20 karakter olmalıdır')
      .max(20, 'Şifre en az 8 en fazla 20 karakter olmalıdır'),
    confirmPassword: z
      .string()
      .min(8, 'Şifre en az 8 en fazla 20 karakter olmalıdır')
      .max(20, 'Şifre en az 8 en fazla 20 karakter olmalıdır'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Yeni şifre ve onay şifresi eşleşmiyor',
    path: ['confirmPassword'],
  });

export const updateQR = z.object({
  image: zfd
    .file()
    .refine((file) => file.size < 3000000, {
      message: "Dosyanın boyutu 3MB'dan fazla olamaz.",
    })
    .refine((file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type), {
      message: 'Dosyanın formatı jpg, jpeg veya png olmalıdır.',
    })
    .optional(),
});
