import Image from 'next/image';

import { HiFire } from 'react-icons/hi';
import { RiTimerFill } from 'react-icons/ri';

import ProductCarousel from '@/components/mobile/carousel/product-carousel';
import { IoArrowBackOutline } from 'react-icons/io5';

import { EmblaOptionsType } from 'embla-carousel';
import Link from 'next/link';
import { db } from '@/lib/db';
import { keyIngredientsDatatoTR, keyIngredientsIcons } from '@/utils/keyingredients';
import LikeButton from '@/components/mobile/like-button';

const OPTIONS: EmblaOptionsType = { containScroll: false, align: 'start' };

export default async function Product({
  params,
}: {
  params: { venue: string; menu_id: string; category_slug: string; product_id: string };
}) {
  const venueData = await db.venue.findFirst({
    where: {
      slug: params?.venue,
    },
    include: {
      menus: true,
    },
  });

  const theme = venueData?.menus[0]?.theme;

  const item = await db.menuItem.findFirst({
    where: {
      id: params.product_id,
    },
  });

  const categoryData = await db.category.findFirst({
    where: {
      slug: params.category_slug,
      menuId: params.menu_id,
    },
  });

  const menuItems = await db.menuItem.findMany({
    where: {
      categoryId: categoryData?.id,
    },
  });

  const relatedItems = menuItems
    .map((menuItem) => {
      if (menuItem.id !== params.product_id) {
        return {
          id: menuItem.id,
          venue: params.venue,
          categorySlug: params.category_slug,
          menuId: params.menu_id,
          name: menuItem.name,
          price: menuItem?.price?.toString() ?? '',
          image: menuItem.image ?? '',
          rating: 0,
        };
      }
    })
    .filter((item): item is NonNullable<typeof item> => item !== undefined);

  return (
    <div className="flex flex-col">
      <div>
        <div className="relative h-44 xs:h-80">
          <div className="absolute flex justify-between w-full top-3 xs:top-5 left-0 px-3 xs:px-5 items-center z-20">
            <Link href={`/${params.venue}/menu/${params.menu_id}/${params.category_slug}`}>
              <div
                className={`rounded-full justify-between p-1.5 xs:p-3 cursor-pointer ${
                  theme === 'dark' ? 'bg-stone-800' : 'bg-stone-50'
                }`}
              >
                <IoArrowBackOutline
                  className={`size-3 xs:size-5  ${
                    theme === 'dark' ? 'text-white' : 'text-stone-700'
                  }`}
                />
              </div>
            </Link>

            <LikeButton theme={theme || ''} />
          </div>
          {item?.image ? (
            <Image
              src={`/uploads/${item?.image}`}
              fill
              alt={item?.name || ''}
              className="object-cover h-44 xs:h-80 shrink-0"
            />
          ) : (
            <div className="bg-orange-600/20 h-44 xs:h-80"></div>
          )}
        </div>
      </div>
      <div
        className={`flex flex-col gap-2 p-3 xs:p-5 -mt-5 rounded-t-3xl relative z-10  ${
          theme === 'dark' ? 'bg-stone-800' : 'bg-white'
        }`}
      >
        <div className="flex justify-between items-center">
          <h1
            className={`text-[16px] xs:text-[26px] font-semibold ${
              theme === 'dark' && 'text-white'
            }`}
          >
            {item?.name}
          </h1>
          <div className="flex gap-1 items-center">
            <span className="text-[14px] xs:text-[22px] font-semibold">
              {item?.price?.toString() || ''}
            </span>
            <span className="text-[14px] xs:text-[22px]">₺</span>
            {/* <AiFillStar className="text-yellow-500" />
            <span className={`text-[15px] font-medium ${theme === 'dark' && 'text-white'}`}>
              4.8
            </span> */}
          </div>
        </div>
        <div>
          <p
            className={`text-[11px] xs:text-[17px] leading-snug 2xl:leading-normal ${
              theme === 'dark' && 'text-white'
            }`}
          >
            {item?.description}
          </p>
        </div>
        <div className="flex mt-0.5 xs:mt-2 gap-0.5 xs:gap-1.5 items-center">
          <div className="flex items-center">
            <span
              className={`text-[10px] xs:text-[15px] mr-0 xs:mr-1 ${
                theme === 'dark' ? 'text-stone-200' : 'text-stone-500'
              }`}
            >
              Kalori:
            </span>
            <span className="flex items-center font-medium text-[10px] xs:text-[15px]">
              <HiFire className={`size-2.5 xs:size-4 mr-0.5 ${theme === 'dark' && 'text-white'}`} />{' '}
              <span className={`${theme === 'dark' && 'text-white'}`}>{item?.calories}kcal</span>
            </span>
          </div>
          <div className="text-stone-400 text-[10px] xs:text-[15px]"> | </div>
          <div className="flex items-center">
            <span
              className={`text-[10px] xs:text-[15px] mr-0 xs:mr-1 ${
                theme === 'dark' ? 'text-stone-200' : 'text-stone-500'
              }`}
            >
              Süresi:
            </span>
            <span className="flex items-center font-medium text-[10px] xs:text-[15px]">
              <RiTimerFill
                className={`size-2.5 xs:size-4 mr-0.5 ${theme === 'dark' && 'text-white'}`}
              />{' '}
              <span className={`${theme === 'dark' && 'text-white'}`}>
                {item?.preparationTime}dk
              </span>
            </span>
          </div>
        </div>
        <div>
          <h1
            className={`mt-1 xs:mt-2 font-semibold text-[13px] xs:text-lg ${
              theme === 'dark' && 'text-white'
            }`}
          >
            Anahtar İçerikler
          </h1>
          <div className="grid grid-cols-4 gap-1 xs:gap-2 mt-1 xs:mt-2">
            {item?.ingredients.map((ing) => {
              return (
                <div
                  key={ing}
                  className={`flex flex-col justify-center items-center gap-1 rounded-lg xs:rounded-2xl border shadow-sm px-2 py-1.5 xs:px-4 xs:py-3 2xl:min-h-28 ${
                    theme === 'dark' ? 'border-yellow-700' : 'border-stone-200'
                  } `}
                >
                  {/* <PiFarmLight
                    className={`size-7 ${theme === 'dark' ? 'text-white' : 'text-stone-800'} `}
                  /> */}
                  {Object.entries(keyIngredientsIcons).map(
                    ([ingredient, Icon]) =>
                      ingredient === ing && (
                        <Icon
                          key={ing}
                          className={`size-3.5 xs:size-7 ${
                            theme === 'dark' ? 'text-white' : 'text-stone-800'
                          }`}
                        />
                      )
                  )}
                  <h2
                    className={`text-[8px] leading-tight xs:leading-normal xs:text-xs text-center 2xl:text-sm ${
                      theme === 'dark' ? 'text-white' : ''
                    }`}
                  >
                    {keyIngredientsDatatoTR[ing as keyof typeof keyIngredientsDatatoTR]}
                  </h2>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h1
            className={`mt-1 xs:mt-2 font-semibold text-[13px] xs:text-lg ${
              theme === 'dark' && 'text-white'
            }`}
          >
            Alerjenler
          </h1>
          <div className="flex mt-1 xs:mt-2 gap-1">
            <div className="rounded-md xs:rounded-lg h-[18px] xs:h-[24px] leading-[0.75] xs:leading-[1.15]   bg-stone-200 px-2 py-0 xs:py-0.5">
              <span className="text-[8px] xs:text-[14px] text-stone-700">Süt Ürünleri</span>
            </div>
            <div className="rounded-md xs:rounded-lg h-[18px] xs:h-[24px] leading-[0.75] xs:leading-[1.15] bg-stone-200 px-2 py-0 xs:py-0.5">
              <span className="text-[8px] xs:text-[14px] text-stone-700">Domates</span>
            </div>
            <div className="rounded-md xs:rounded-lg h-[18px] xs:h-[24px] leading-[0.75] xs:leading-[1.15] bg-stone-200 px-2 py-0 xs:py-0.5">
              <span className="text-[8px] xs:text-[14px] text-stone-700">Fesleğen</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`${theme === 'dark' ? 'bg-stone-800' : 'bg-white'}`}>
        <h1
          className={`mt-2 ml-3 xs:ml-5 font-semibold text-lg ${theme === 'dark' && 'text-white'}`}
        >
          Benzer Ürünler
        </h1>
        <ProductCarousel slides={relatedItems} options={OPTIONS} theme={theme} />
      </div>
    </div>
  );
}
