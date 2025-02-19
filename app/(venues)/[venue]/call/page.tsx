import Notifications from '@/components/mobile/notifications';
import { db } from '@/lib/db';
import Image from 'next/image';

type SearchParams = {
  table?: string;
};

export default async function CallPage({
  params,
  searchParams,
}: {
  params: { venue: string };
  searchParams: SearchParams;
}) {
  let table;

  if (searchParams.table) {
    const tableId = searchParams.table;

    table = await db.table.findFirst({
      where: {
        id: tableId,
      },
    });
  }

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
            className={`text-[17px] xs:text-[30px] 2xl:text-[36px] font-semibold text-center mb-1 pt-10 pb-4 2xl:pb-16 ${
              theme === 'dark' && 'text-white'
            }`}
          >
            {table ? table.name : 'Masa Adı Tanımlanmamış'}
          </h1>
        </div>
        <Notifications
          tableId={table?.id}
          tableName={table?.name}
          venueId={table?.venueId ?? undefined}
          menuTheme={theme ?? 'light'}
        />
        <div className="relative h-[195px] xs:h-[270px] 2xl:h-[320px] mb-16">
          <Image src="/servicecall.png" alt="waiter with tray" fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}
