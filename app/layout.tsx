import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';

const font = DM_Sans({
  subsets: ['latin-ext'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'QReative Menu',
  description: '"Menünüz her an cebinizde!"',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>{children}</body>
    </html>
  );
}
