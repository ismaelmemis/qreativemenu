import { db } from '@/lib/db';
import Image from 'next/image';

export default async function Languages({ params }: { params: { venue: string } }) {
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

  const theme = venue?.menus[0].theme;

  return (
    <div
      className={`flex flex-col min-h-screen justify-between ${
        theme === 'dark' ? 'bg-stone-900' : 'bg-white'
      }`}
    >
      <header className="flex flex-row w-full p-3 xs:p-5 items-center">
        <div className=" object-cover w-full text-center h-[35px] xs:h-[55px] flex-1 relative">
          {venue?.logo ? (
            <>
              <Image
                src={`/api/uploads/${venue?.logo}`}
                alt="logo-venue"
                fill
                className="object-contain h-[35px] xs:h-[55px]"
              />
            </>
          ) : (
            <div className="xs:h-[55px]  h-full xs:text-2xl font-semibold flex items-center justify-center text-orange-700">
              <h1>{venue?.name}</h1>
            </div>
          )}
        </div>
      </header>
      <div className={`flex-1 rounded-t-2xl  ${theme === 'dark' ? 'bg-stone-800' : 'bg-stone-50'}`}>
        <div className="flex flex-col justify-end rounded-tl-2xl">
          <h1
            className={`text-[30px] 2xl:text-[36px] font-semibold text-center mb-1 pt-0 xs:pt-10 pb-4 2xl:pb-16 ${
              theme === 'dark' && 'text-white'
            }`}
          ></h1>
        </div>
        <div className="p-3 xs:p-5 flex flex-col gap-1.5 xs:gap-3 mt-8">
          <div
            className={`flex items-center justify-between rounded-xl xs:rounded-3xl p-2 xs:p-3 shadow-[0px_0px_18px_-7px_rgba(0,_0,_0,_0.2)] cursor-pointer border-2 border-stone-600/10 bg-gradient-to-br  ${
              theme === 'dark' ? 'from-stone-600/20 to-stone-600/30' : 'from-white to-stone-50'
            } border border-orange-600`}
          >
            <div className="flex flex-row gap-4 xs:gap-8 items-center ">
              <div
                className={`rounded-full border-2 xs:border-4 ${
                  theme === 'dark' ? 'border-stone-700' : 'border-stone-600/10'
                } bg-white shadow-[0px_0px_18px_-7px_rgba(0,_0,_0,_0.2)] relative`}
              >
                <Image
                  src="/turkiye-flag.svg"
                  className="w-6 h-6 xs:w-12 xs:h-12"
                  alt="turkish flag"
                  width={100}
                  height={100}
                />
              </div>
              <div>
                <h2
                  className={`text-[15px] xs:text-[22px] font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-stone-700'
                  } `}
                >
                  TR - Türkçe
                </h2>
              </div>
            </div>
          </div>
          <div
            className={`flex items-center justify-between rounded-xl xs:rounded-3xl p-2 xs:p-3 shadow-[0px_0px_18px_-7px_rgba(0,_0,_0,_0.2)] border-2 border-stone-600/10 bg-gradient-to-br  ${
              theme === 'dark' ? 'from-stone-800/40 to-stone-800/40' : 'from-stone-200 to-stone-300'
            }`}
          >
            <div className="flex flex-row gap-4 xs:gap-8 items-center ">
              <div
                className={`rounded-full border-4 ${
                  theme === 'dark' ? 'border-stone-700' : 'border-stone-600/10'
                } bg-white shadow-[0px_0px_18px_-7px_rgba(0,_0,_0,_0.2)] relative`}
              >
                <Image
                  src="/united-kingdom.png"
                  className="w-6 h-6 xs:w-12 xs:h-12"
                  alt="turkish flag"
                  width={100}
                  height={100}
                />
              </div>
              <div>
                <h2
                  className={`text-[15px] xs:text-[22px] font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-stone-400'
                  } `}
                >
                  EN - İngilizce
                </h2>
              </div>
            </div>
          </div>
          <div
            className={`flex items-center justify-between rounded-xl xs:rounded-3xl p-2 xs:p-3 shadow-[0px_0px_18px_-7px_rgba(0,_0,_0,_0.2)] border-2 border-stone-600/10 bg-gradient-to-br  ${
              theme === 'dark' ? 'from-stone-800/40 to-stone-800/40' : 'from-stone-200 to-stone-300'
            }`}
          >
            <div className="flex flex-row gap-4 xs:gap-8 items-center ">
              <div
                className={`rounded-full border-4 ${
                  theme === 'dark' ? 'border-stone-700' : 'border-stone-600/10'
                } bg-white shadow-[0px_0px_18px_-7px_rgba(0,_0,_0,_0.2)] relative`}
              >
                <Image
                  src="/germany.png"
                  className="w-6 h-6 xs:w-12 xs:h-12"
                  alt="german flag"
                  width={100}
                  height={100}
                />
              </div>
              <div>
                <h2
                  className={`text-[15px] xs:text-[22px] font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-stone-400'
                  } `}
                >
                  DE - Deutsch
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
