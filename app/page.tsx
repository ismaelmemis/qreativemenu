import Logo from '@/components/assets/logo';

import { Figtree } from 'next/font/google';

const figtree = Figtree({
  subsets: ['latin-ext'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export default function Home() {
  return (
    <main className={`${figtree.className} min-h-screen flex flex-col justify-center items-center`}>
      <div className="flex items-center justify-center">
        <Logo />
        <h1 className="font-semibold text-[26px] ml-2">QReative Menü</h1>
      </div>
    </main>
  );
}
