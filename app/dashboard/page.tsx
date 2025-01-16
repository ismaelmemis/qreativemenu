// import Link from 'next/link';
// import Image from 'next/image';

import { auth } from '@/auth';
// import { PiEye } from 'react-icons/pi';

export default async function Dashboard() {
  const session = await auth();

  const today = Date.now();
  const dateFormat = new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(today);

  return (
    <div className="py-8 flex flex-col">
      <div>
        <h3 className="mb-1 text-[13px]">{dateFormat}</h3>
        <h2 className="text-2xl font-semibold">Merhaba! {session?.user.name} 👋</h2>
      </div>
      <div className="flex mt-6">
        <div className="w-3/4 flex flex-col">
          {/* <div className="rounded-lg bg-white p-5 text-xl border border-stone-100 flex justify-between ">
            <div className="flex flex-col justify-between">
              <div>
                <div className="text-[23px] text-stone-900 font-semibold mb-2 bg-gradient-to-r from-stone-800 to-stone-900 bg-clip-text text-transparent flex items-center gap-1">
                  QR Menünüz kullanıma hazır!
                </div>
                <div>
                  <p className="text-[15px] font-light leading-normal max-w-[400px]">
                    Menünüzü önizlemek için yandaki QR Kodunu okutun veya <br /> aşağıdaki önizleme
                    butonuna tıklayın.
                  </p>
                </div>
              </div>
              <div className="flex mt-4">
                <Link
                  className="rounded-lg bg-orange-600 hover:bg-orange-600/90 flex items-center gap-2 px-3 py-[1px]"
                  href="#"
                >
                  <PiEye className="text-white size-4" />
                  <span className="text-white font-medium text-[13px]">Önizleme</span>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div>
                <Image
                  className="absolute -left-[88px] top-0.5"
                  src="/menu-dash-mockup.png"
                  alt="mockup"
                  width={78}
                  height={78}
                />
              </div>
              <div className="rounded-lg border border-stone-150 0 p-2.5 shadow-md">
                <Image src="/qreativemenu.png" alt="QReative Menu" width={135} height={135} />
              </div>
            </div>
          </div> */}
          {/* <div className="flex gap-5 mt-5">
            <div className=" flex-1 rounded-xl 2xl:min-h-52 bg-white shadow-md border-2 border-orange-600/50 px-6 py-6">
              <div className="flex items-center justify-between">
                <h1 className="font-base font-medium text-zinc-700">Toplam Menü Okutma</h1>
                <PiBookOpenUser className="size-6 text-stone-600" />
              </div>
              <div className="mt-8">
                <div className="flex items-center gap-2">
                  <h2 className="text-4xl font-semibold text-zinc-700">0</h2>{' '}
                  <PiTrendUp className="size-7 text-orange-600/50" />
                </div>

                <p className="text-sm text-zinc-500">%0 Geçen aya göre artış</p>
              </div>
            </div>
            <div className="flex-1 rounded-xl 2xl:min-h-52 bg-white shadow-sm border border-2 border-emerald-600/50   px-6 py-6">
              <div className="flex items-center justify-between">
                <h1 className="font-base font-medium text-zinc-700">En çok tıklanan Ürün</h1>
                <PiForkKnife className="size-6 text-stone-600" />
              </div>
              <div className="mt-8">
                <div className="flex items-center gap-2">
                  <h2 className="text-4xl font-semibold text-zinc-700">0</h2>{' '}
                  <PiTrendUp className="size-7 text-orange-600/50" />
                </div>

                <p className="text-sm text-zinc-500">Henüz belirsiz</p>
              </div>
            </div>
          </div> */}
        </div>
        <div className="w-1/4"></div>
      </div>
    </div>
  );
}
