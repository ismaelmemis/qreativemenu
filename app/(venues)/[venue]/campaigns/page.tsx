import Image from 'next/image';
import { db } from '@/lib/db';
import Link from 'next/link';
import { PiPercentBold } from 'react-icons/pi';

export default async function Campaigns({ params }: { params: { venue: string } }) {
  const venueData = await db.venue.findFirst({
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

  const theme = venueData?.menus[0].theme;

  const logo = venueData?.logo;

  const activeMenu = await db.menu.findFirst({
    where: {
      venueId: venueData?.id,
      isActive: true,
    },
  });

  const campaigns = await db.campaign.findMany({
    where: {
      menuId: activeMenu?.id,
      archived: false,
      isActive: true,
    },
  });

  console.log('Campaings', campaigns);

  return (
    <div
      className={`flex flex-col min-h-screen justify-between ${
        theme === 'dark' ? 'bg-stone-900' : 'bg-white'
      }`}
    >
      <header className="flex flex-row w-full p-3 xs:p-5 items-center">
        <div className=" object-cover w-full text-center h-[35px] xs:h-[55px] flex-1 relative">
          {logo ? (
            <Image
              src={`/uploads/${logo}`}
              alt="logo-venue"
              fill
              className="object-contain h-[35px] xs:h-[55px]"
              priority
            />
          ) : (
            <div className="xs:h-[55px] h-full xs:text-2xl font-semibold flex items-center justify-center text-orange-700">
              <h1>{venueData?.name}</h1>
            </div>
          )}
        </div>
      </header>
      <div className={`flex-1 rounded-t-2xl  ${theme === 'dark' ? 'bg-stone-800' : 'bg-stone-50'}`}>
        <div
          className={`p-2.5 xs:p-5 min-h-screen pb-32 rounded-lg xs:rounded-2xl flex flex-col gap-2 xs:gap-3 ${
            theme === 'dark' ? 'bg-stone-800' : 'bg-stone-100'
          }`}
        >
          {campaigns.map((campaign) => (
            <Link key={campaign.id} href={'#'}>
              <div
                className={`rounded-lg xs:rounded-2xl flex p-1 xs:p-2 shadow-[0px_0px_18px_-7px_rgba(0,_0,_0,_0.4)] gap-2 xs:gap-3 ${
                  theme === 'dark' ? 'bg-stone-600/30' : 'bg-white'
                }`}
              >
                <div className="relative min-w-16 min-h-16 xs:min-w-28 xs:min-h-28 2xl:size-32">
                  {campaign?.image ? (
                    <Image
                      src={`/uploads/${campaign.image}`}
                      alt="product"
                      fill
                      className="rounded-lg xs:rounded-xl flex-shrink-0 size-14 xs:size-28 2xl:min-w-32 2xl:min-h-32 object-cover"
                    />
                  ) : (
                    <div className="bg-orange-600/20 rounded-lg xs:rounded-xl size-14 min-w-16 min-h-16 xs:size-28 2xl:min-w-32 2xl:min-h-32 flex items-center justify-between">
                      <PiPercentBold className="text-orange-700 mx-auto size-4 xs:size-8" />
                    </div>
                  )}
                </div>
                <div className="flex flex-1 gap-2">
                  <div className="flex flex-col justify-between">
                    <div className="flex">
                      <div className="flex flex-col">
                        <h1
                          className={`text-[12px] xs:text-xl font-semibold mb-0 xs:mb-0.5  ${
                            theme === 'dark' && 'text-white'
                          }`}
                        >
                          {campaign?.name}
                        </h1>
                        <p
                          className={`text-[8px] xs:text-[13px] 2xl:text-[15px] font-base  ${
                            theme === 'dark' && 'text-white'
                          }`}
                        >
                          {campaign?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
