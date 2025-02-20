import Image from 'next/image';
import { PiCaretRightBold, PiCopy, PiMapPinFill, PiWhatsappLogo } from 'react-icons/pi';
import { FcGoogle } from 'react-icons/fc';
import { AiFillStar } from 'react-icons/ai';
import { PiMapTrifold } from 'react-icons/pi';
import { PiWifiHigh } from 'react-icons/pi';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { db } from '@/lib/db';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { formatPhoneNumber } from '@/utils/phone';

export default async function Info({ params }: { params: { venue: string } }) {
  const venue = await db.venue.findFirst({
    where: {
      slug: params.venue,
    },
    include: {
      menus: {
        where: {
          isActive: true, // Assuming there is an `isActive` field in your menu model
        },
      },
    },
  });

  const whatsapp = venue?.whatsapp ? formatPhoneNumber(venue.whatsapp) : '';
  const mapsLink =
    'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(venue?.address || '');
  const wifiAddress = venue?.wifiAddress;
  const wifiPassword = venue?.wifiPassword;

  const theme = venue?.menus[0].theme;

  return (
    <div className="flex flex-col">
      <div>
        <div className="relative h-48 xs:h-60 2xl:h-[300px]">
          {venue?.image ? (
            <>
              <Image
                src={`/api/uploads/${venue?.image}`}
                fill
                alt="Caprese Salat"
                className="object-cover h-48 xs:h-60 shrink-0"
              />
            </>
          ) : (
            <Image
              src={`/default-restaurant.jpg`}
              fill
              alt="Caprese Salat"
              className="object-cover h-48 xs:h-60 shrink-0"
            />
          )}
        </div>
      </div>
      <div
        className={`flex flex-col gap-0.5 p-3.5 xs:p-5 -mt-5 rounded-t-2xl xs:rounded-t-3xl relative z-10 ${
          theme === 'dark' ? 'bg-stone-800' : 'bg-white'
        }`}
      >
        <div className="flex justify-between items-center">
          <div>
            <h1
              className={`text-[17px] xs:text-3xl leading-tight xs:leading-tight font-semibold ${
                theme === 'dark' && 'text-white'
              }`}
            >
              {venue?.name}
            </h1>
          </div>
          <div className="flex items-center">
            <FcGoogle className="mr-0.5 xs:mr-1.5 size-3 xs:size-4" />
            <AiFillStar className="text-yellow-500 mr-0 xs:mr-0.5 size-3 xs:size-4 " />
            <span
              className={`text-[10px] xs:text-[13px] font-medium text-stone-600 ${
                theme === 'dark' && 'text-white'
              }`}
            >
              4.7
            </span>
          </div>
        </div>
        <div>
          <div className="flex items-center">
            <PiMapPinFill className={`${theme === 'dark' && 'text-white'} size-3 xs:size-4`} />
            <span
              className={`ml-0.5 text-stone-700 text-[9px] xs:text-sm ${
                theme === 'dark' && 'text-white'
              }`}
            >
              {venue?.address}
            </span>
          </div>
        </div>
        <div className="mt-4">
          <p
            className={`font-light text-[11px] xs:text-[14px] 2xl:text-[17px] ${
              theme === 'dark' && 'text-white'
            }`}
          >
            {venue?.description}
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-2 xs:gap-3 pb-20">
          <Link href={mapsLink}>
            <div
              className={`flex gap-3.5 xs:gap-6 items-center p-1 xs:p-2 shadow-[0px_0px_18px_-7px_rgba(0,_0,_0,_0.2)] rounded-lg xs:rounded-2xl cursor-pointer ${
                theme === 'dark' ? 'bg-stone-700/50' : 'bg-white'
              }`}
            >
              <div className="bg-amber-100 p-4 xs:p-7 rounded-lg xs:rounded-xl">
                <PiMapTrifold className="size-3 xs:size-8 text-stone-600" />
              </div>
              <div className="flex-1">
                <h2
                  className={`text-[13px] xs:text-[20px] font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-stone-700'
                  } `}
                >
                  Yol Tarifi Paylaş
                </h2>
              </div>
              <div className="rounded-full p-1 xs:p-2 mr-1 border-2 xs:border-4 border-stone-600/10 border-stone-100 shadow-[0px_0px_18px_-7px_rgba(0,_0,_0,_0.2)]">
                <PiCaretRightBold
                  className={`size-2 xs:size-4 ${
                    theme === 'dark' ? 'text-white' : 'text-stone-600'
                  }`}
                />
              </div>
            </div>
          </Link>

          <Drawer>
            <DrawerTrigger>
              <div
                className={`flex gap-3.5 xs:gap-6 items-center p-1 xs:p-2 shadow-[0px_0px_18px_-7px_rgba(0,_0,_0,_0.2)] rounded-lg xs:rounded-2xl cursor-pointer ${
                  theme === 'dark' ? 'bg-stone-700/50' : 'bg-white'
                }`}
              >
                <div className="bg-sky-100 p-4 xs:p-7 rounded-lg xs:rounded-xl">
                  <PiWifiHigh className="size-3 xs:size-8 text-stone-600" />
                </div>
                <div className="flex-1 flex">
                  <h2
                    className={`text-[13px] xs:text-[20px] font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-stone-700'
                    } `}
                  >
                    Wi-fi Bağlan
                  </h2>
                </div>
                <div className="rounded-full p-1 xs:p-2 mr-1 border-2 xs:border-4 border-stone-600/10 border-stone-100 shadow-[0px_0px_18px_-7px_rgba(0,_0,_0,_0.2)]">
                  <PiCaretRightBold
                    className={`size-2 xs:size-4 ${
                      theme === 'dark' ? 'text-white' : 'text-stone-600'
                    }`}
                  />
                </div>
              </div>
            </DrawerTrigger>
            <DrawerContent
              className={`lg:w-[432px] 2xl:w-[540px] mx-auto ${
                theme === 'dark' && 'bg-stone-950 border border-stone-800'
              }`}
            >
              <div className="p-3.5 xs:p-5 flex flex-col items-center gap-8 mt-10 mb-10 xs:mt-20 xs:mb-20">
                <div className="text-center">
                  <h1
                    className={`text-lg xs:text-2xl font-semibold mb-1 text-stone-800 ${
                      theme === 'dark' && 'text-white'
                    }`}
                  >
                    Wifi Ağ Adı
                  </h1>
                  <h2 className={`text-center ${theme === 'dark' && 'text-white'}`}>
                    {wifiAddress}
                  </h2>
                </div>
                <div className="text-center">
                  <h1
                    className={`text-lg xs:text-2xl font-semibold mb-1 text-stone-800 ${
                      theme === 'dark' && 'text-white'
                    }`}
                  >
                    Wifi Ağ Parolası
                  </h1>
                  <h2 className="text-center"></h2>
                  <div className="relative">
                    <Input
                      readOnly
                      className={`pe-5 xs:pe-9 w-48 xs:w-80 border border-orange-600 text-xs ${
                        theme === 'dark' && 'text-white'
                      }`}
                      value={wifiPassword || ''}
                      placeholder=""
                      type="text"
                    />
                    <button
                      className="absolute inset-y-0 end-0 flex h-full w-32 items-center justify-center rounded-e-lg border border-transparent text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label="Subscribe"
                    >
                      <PiCopy className="text-stone-500" />{' '}
                      <span className="text-[10px] xs:text-[13px] ml-1 text-stone-500">
                        Şifreyi Kopyala
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
          <Link href={`https://wa.me/${whatsapp}`}>
            <div
              className={`flex gap-3.5 xs:gap-6 items-center p-1 xs:p-2 shadow-[0px_0px_18px_-7px_rgba(0,_0,_0,_0.2)] rounded-2xl cursor-pointer ${
                theme === 'dark' ? 'bg-stone-700/50' : 'bg-white'
              }`}
            >
              <div className="bg-green-100 p-4 xs:p-7 rounded-xl">
                <PiWhatsappLogo className="size-3 xs:size-8 text-stone-600" />
              </div>
              <div className="flex-1">
                <h2
                  className={`text-[13px] xs:text-[20px] font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-stone-700'
                  } `}
                >
                  Whatsapp Hattı
                </h2>
              </div>
              <div className="rounded-full p-1 xs:p-2 mr-1 border-2 xs:border-4 border-stone-600/10 border-stone-100 shadow-[0px_0px_18px_-7px_rgba(0,_0,_0,_0.2)]">
                <PiCaretRightBold
                  className={`size-2 xs:size-4 ${
                    theme === 'dark' ? 'text-white' : 'text-stone-600'
                  }`}
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
