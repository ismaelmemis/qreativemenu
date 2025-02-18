import Image from 'next/image';
import Link from 'next/link';

import { db } from '@/lib/db';

import { RiArrowRightLine } from 'react-icons/ri';
import MenuHeader from '@/components/mobile/common/menu-header';
import { PiBowlFood } from 'react-icons/pi';

export default async function Category({
  params,
}: {
  params: { venue: string; menu_id: string; category_slug: string };
}) {
  console.log('SLUG:', params.category_slug);

  const category = await db.category.findFirst({
    where: {
      menuId: params.menu_id,
      slug: params.category_slug,
    },
    include: {
      menuItem: true,
    },
  });

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

  console.log('TEMA:', theme);

  return (
    <>
      <MenuHeader
        globalTheme={theme ?? ''}
        logo={venueData?.logo ?? ''}
        venueName={venueData?.name ?? ''}
      />
      <div className={`flex flex-col ${theme === 'dark' ? 'bg-stone-900' : 'bg-stone-100'}`}>
        <div
          className={`flex flex-col gap-2.5 xs:gap-4 p-2.5 xs:p-5 min-h-screen pb-32 rounded-t-2xl ${
            theme === 'dark' ? 'bg-stone-800' : 'bg-stone-50'
          }`}
        >
          {category?.menuItem.map((item) => {
            return (
              <Link
                key={item.id}
                href={`/${params.venue}/menu/${params.menu_id}/${params.category_slug}/${item.id}`}
              >
                <div
                  className={`rounded-lg xs:rounded-2xl flex p-1 xs:p-2 shadow-[0px_0px_18px_-7px_rgba(0,_0,_0,_0.4)] gap-1.5 xs:gap-3 ${
                    theme === 'dark' ? 'bg-stone-600/30' : 'bg-white'
                  }`}
                >
                  <div className="relative min-w-16 min-h-16 xs:min-w-28 xs:min-h-28 2xl:min-w-32 2xl:min-h-32">
                    {item.image ? (
                      <Image
                        src={`/uploads/${item.image}`}
                        alt="product"
                        fill
                        className="rounded-md xs:rounded-xl flex-shrink-0 size-14 xs:size-28 2xl:min-w-32 2xl:min-h-32 object-cover"
                      />
                    ) : (
                      <div className="rounded-md xs:rounded-xl size-14 xs:size-28 2xl:min-w-32 2xl:min-h-32 bg-orange-600/20 flex justify-center items-center">
                        <PiBowlFood className="text-orange-700 size-12" />
                      </div>
                    )}
                  </div>
                  <div className="flex w-full">
                    <div className="flex flex-col justify-between">
                      <div className="flex gap-1">
                        <div className="flex flex-col justify-between">
                          <h1
                            className={`text-[11px] leading-snug xs:leading-snug xs:text-xl font-semibold xs:mb-0.5 ${
                              theme === 'dark' && 'text-white'
                            }`}
                          >
                            {item.name}
                          </h1>
                          <p
                            className={`text-[7px] xs:text-[13px] 2xl:text-[15px] font-base ${
                              theme === 'dark' && 'text-white'
                            }`}
                          >
                            {item.description?.slice(0, 85)}...
                          </p>
                        </div>
                        <div>
                          <RiArrowRightLine
                            className={`size-3.5 xs:size-5 mr-1 xs:mt-1 ${
                              theme === 'dark' && 'text-white'
                            }`}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span
                          className={`${
                            theme === 'dark' && 'text-white'
                          } text-[10px] xs:text-[16px] font-medium`}
                        >
                          {item?.price?.toString() || ''}
                          <span className="font-normal">₺</span>
                        </span>
                        <div className="flex">
                          {/* <div
                          className={`rounded-full border  p-0.5 mr-2 ${
                            theme === 'dark' ? 'border-white' : 'border-stone-500'
                          }`}
                        >
                          <RiLeafLine
                            className={`text-stone-500 size-3.5 ${
                              theme === 'dark' && 'text-white'
                            }`}
                          />
                        </div> */}
                          {/* <div
                          className={`rounded-full border  p-0.5 mr-2 ${
                            theme === 'dark' ? 'border-white' : 'border-stone-500'
                          }`}
                        >
                          <LuSalad
                            className={`text-stone-500 size-3.5 ${
                              theme === 'dark' && 'text-white'
                            }`}
                          />
                        </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
