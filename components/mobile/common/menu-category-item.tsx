import Link from 'next/link';
import Image from 'next/image';
import { PiBowlFood } from 'react-icons/pi';

export default function MenuCategoryItem({
  image,
  categoryName,
  link,
  menuId,
  theme = 'light',
}: {
  image: string;
  categoryName: string;
  link: string | undefined;
  menuId: string;
  theme?: string;
}) {
  const globalTheme: string = theme;

  return (
    <Link href={`${menuId}/${link}`}>
      <div
        className={`rounded-xl xs:rounded-2xl border shadow-sm relative ${
          globalTheme === 'dark'
            ? 'text-white border-stone-600/60 bg-stone-600/30'
            : 'border-stone-100 bg-white'
        }  `}
      >
        <div className="relative h-20 xs:h-32 2xl:h-44 rounded-xl xs:rounded-2xl">
          {image ? (
            <Image
              src={`/api/uploads/${image}`}
              alt="makarna kategori"
              className="object-cover rounded-t-lg xs:rounded-t-2xl"
              fill
            />
          ) : (
            <div className="bg-orange-600/20 h-20 xs:h-32 2xl:h-44 rounded-t-lg xs:rounded-t-2xl flex items-center justify-center">
              <PiBowlFood className="text-orange-700 size-12" />
            </div>
          )}
        </div>
        <div className="py-1 xs:py-1.5 2xl:py-2 px-4">
          <h2 className="text-[12px] xs:text-[16px] font-normal tracking-wide text-center text-stone">
            {categoryName}
          </h2>
        </div>
      </div>
    </Link>
  );
}
