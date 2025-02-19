import { auth } from '@/auth';
import { ShineBorder } from '@/components/ui/shine-border';
import { db } from '@/lib/db';
import { FaBatteryFull, FaSignal, FaWifi } from 'react-icons/fa';
import InternalFrame from '@/components/view/internal-frame';
import QRViewer from '@/components/dashboard/qr/qr-viewer';
import { Options } from 'qr-code-styling';
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

  const user = await db.user.findUnique({
    where: { id: session?.user.id },
    include: {
      venues: true,
    },
  });

  const venue = user?.venues[0];

  const venueData = await db.venue.findFirst({
    where: {
      id: venue?.id,
    },
    include: {
      qrCode: true,
    },
  });

  const menuQRCode = venueData?.qrCode.find((code) => code.purpose === 'MENU_VIEW');
  return (
    <div className="py-8 flex flex-col">
      <div>
        <h3 className="mb-1 text-[13px]">{dateFormat}</h3>
        <h2 className="text-2xl font-semibold">Merhaba! {session?.user.name} 👋</h2>
      </div>
      <div className="flex gap-8">
        <section className="mt-8 flex-1">
          <ShineBorder
            className="relative flex w-full overflow-hidden rounded-lg border bg-background md:shadow-xl"
            color={['#A07CFE', '#FE8FB5', '#FFBE7B']}
          >
            <div className="flex w-full justify-between">
              <div className="flex flex-col justify-between">
                <div className="flex flex-col items-start">
                  <h2 className="text-[22px] flex font-medium gap-2">
                    <span className="">🎉</span> Tebrikler{' '}
                  </h2>
                  <h2 className="text-[16px] text-stone-700">
                    <span className="font-medium text-orange-700">{venue?.name}</span> için QR
                    Menünüz otomatik olarak oluşturuldu.
                  </h2>
                </div>
                <div>
                  {/* <Button className="bg-[#DB4437] text-white after:flex-1 text-[15px] py-5 rounded-xl hover:bg-[#DB4437]/90">
                    Menünüzü oluşturmaya başlayın{' '}
                    <ChevronRight
                      className="opacity-60 transition-transform group-hover:translate-x-0.5"
                      size={16}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </Button> */}
                </div>
              </div>
              <div className="flex">
                <QRViewer settings={menuQRCode?.settings as Options} />
                {/* <div className="relative size-40 border border-stone-200 shadow-md rounded-lg">
                  <Image
                    src={'/qreativemenu.png'}
                    alt="qreative-qr"
                    className="size-40 rounded-xl"
                    fill
                  />
                </div> */}
              </div>
            </div>
          </ShineBorder>
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
        </section>
        <aside>
          <div className="sticky mt-8 top-[120px] flex h-[calc(100vh-235px)] max-h-[525px] w-[265px] flex-col overflow-hidden rounded-[36px] border-[10px] border-black bg-white text-gray-900">
            <div className="flex h-[24px] w-full items-start justify-center px-2">
              <div className="flex flex-1 items-center justify-center text-xs font-semibold pt-0.5">
                21:59
              </div>
              <div className="h-[18px] w-[112px] rounded-b-[16px] bg-black relative">
                <div className="absolute rounded-lg w-10 h-0.5 bg-stone-800 top-1.5 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute rounded-full size-0.5 bg-blue-700 top-[5px] left-20"></div>
              </div>
              <div className="flex-1 flex items-center gap-1 pt-0.5">
                <FaSignal className="size-3 ml-1" />
                <FaWifi className="size-3" />
                <FaBatteryFull className="size-3.5" />
              </div>
            </div>
            <div className="flex-1">
              <InternalFrame src={`${venue?.slug}`} title={''} />
            </div>
            <div className="flex flex-col items-center border-t border-gray-100 bg-stone-50 px-5 pb-1 pt-2">
              <div className="h-[3px] w-[90px] rounded-lg bg-stone-900"></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
