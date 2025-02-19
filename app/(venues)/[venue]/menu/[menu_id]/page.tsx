import { Prisma } from '@prisma/client';
type JsonArray = Prisma.JsonArray;

/* eslint-disable @typescript-eslint/no-explicit-any */
import MenuCategoryItem from '@/components/mobile/common/menu-category-item';
import { db } from '@/lib/db';

import Image from 'next/image';
import Link from 'next/link';
import MenuHeader from '@/components/mobile/common/menu-header';

async function getMenu(menuId: string) {
  const menu = await db.menu.findUnique({
    where: {
      id: menuId,
    },
    include: {
      category: {
        // To include related Categories and their related MenuItems
        include: {
          menuItem: true,
        },
      },
      campaign: true,
    },
  });

  return menu;
}

export default async function Menu({ params }: { params: { venue: string; menu_id: string } }) {
  const menu = await getMenu(params.menu_id);
  const theme = menu?.theme;

  const featuredCampaign = menu?.campaign.find((campaign) => {
    return campaign.featured === true;
  });

  const menuViewData = menu?.menuView as JsonArray;

  const venueData = await db.venue.findFirst({
    where: {
      slug: params.venue,
    },
  });

  return (
    <>
      <MenuHeader
        globalTheme={theme ?? ''}
        logo={venueData?.logo ?? ''}
        venueName={venueData?.name ?? ''}
      />
      <div className={`flex flex-col ${theme === 'dark' ? 'bg-stone-900' : 'bg-stone-100'}`}>
        <div
          className={`p-2.5 xs:p-5  min-h-screen pb-32 rounded-t-2xl ${
            theme === 'dark' ? 'bg-stone-800' : 'bg-stone-100'
          }`}
        >
          {featuredCampaign && (
            <div
              className={`${
                theme === 'dark'
                  ? 'bg-stone-700/40 border border-stone-600/20 rounded-xl xs:rounded-2xl'
                  : 'bg-stone-100'
              }`}
            >
              <Link href={`/${venueData?.slug}/campaigns`}>
                <div className="rounded-xl xs:rounded-2xl bg-stone-900 h-24 xs:h-44 2xl:h-56 relative px-3 py-3 xs:px-5 xs:py-5 2xl:py-8">
                  <div className="w-full h-full absolute bg-gradient-to-r from-stone-900/60 to-stone-800/30 left-0 top-0 rounded-2xl z-10"></div>
                  <div className="relative z-20 w-64">
                    <h1 className="text-white font-bold text-[14px] xs:text-[25px] leading-tight">
                      Hafta Sonu Şöleni!
                    </h1>
                    <p className="text-white mt-0.5 xs:mt-1.5 mb-3 w-36 xs:w-60 text-[9px] xs:text-[15px] font-normal 2xl:leading-relaxed">
                      Cumartesi - Pazar günleri karışık pizzalarımızda %40 indirim fırsatını
                      kaçırmayın!
                    </p>
                  </div>
                  <div className="z-20 text-white absolute bottom-2.5 right-5 xs:right-6 xs:bottom-4 top flex justify-end">
                    <div className="rounded-md xs:rounded-lg px-2 py-[3px] xs:px-2.5 mt-2 text-[9px] xs:text-[14px] 2xl:text-[15px] bg-orange-600 border border-orange-700 -mr-3">
                      Kampanyaları Gör
                    </div>
                  </div>
                  <Image
                    src={`/api/uploads/${featuredCampaign?.coverImg}`}
                    alt="kampanya pizza"
                    fill
                    className="rounded-2xl object-cover"
                  />
                </div>
              </Link>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3 xs:gap-5 mt-3.5 xs:mt-5">
            {menuViewData
              ? menuViewData.map((item: any) => {
                  if (item.droppable) {
                    return (
                      <MenuCategoryItem
                        key={item.id}
                        categoryName={item.text}
                        link={item.text.toLowerCase()}
                        image={item.data.image}
                        menuId={params.menu_id}
                        theme={theme ?? 'light'}
                      />
                    );
                  }
                })
              : ''}
          </div>
        </div>
      </div>
    </>
  );
}
