import { DM_Sans } from 'next/font/google';

const font = DM_Sans({
  subsets: ['latin-ext'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className={font.className}>{children}</div>;
}
