import { Figtree } from 'next/font/google';

const figtree = Figtree({
  subsets: ['latin-ext'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export default function MobileLayout({ children }: { children: React.ReactNode; params: string }) {
  return (
    <main className="bg-stone-800/30">
      <div
        className={`${figtree.className} mx-auto min-h-screen lg:w-[432px] 2xl:w-[540px] relative `}
      >
        {children}
      </div>
    </main>
  );
}
