import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PiBookOpenTextLight, PiForkKnife, PiGear } from 'react-icons/pi';

import { FaBatteryFull, FaSignal, FaWifi } from 'react-icons/fa';
import CreateCategory from '@/components/dashboard/menu/menu-forms/create-category';
import CreateItem from '@/components/dashboard/menu/menu-forms/create-item';

import InternalFrame from '@/components/view/internal-frame';
import { db } from '@/lib/db';
import MenuTree from '@/components/dashboard/menu/menu-tree';
import MenuSettings from '@/components/dashboard/menu/menu-forms/menu-settings';

export default async function MenuEditor({ params }: { params: { ['menu_id']: 'string' } }) {
  const { menu_id }: { menu_id: string } = params;

  const venue = await db.venue.findFirst({
    where: {
      menus: {
        some: {
          id: menu_id, // Replace 'menuId' with the actual ID you're looking for
        },
      },
    },
  });

  const menu = await db.menu.findUnique({
    where: {
      id: menu_id,
    },
    include: {
      category: {
        // To include related Categories and their related MenuItems
        include: {
          menuItem: true,
        },
      },
    },
  });

  const categoryData = menu?.category.map((cat) => {
    return {
      id: cat.id,
      name: cat.name,
    };
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jsonMenu: any = menu?.menuView ?? [];

  return (
    <div className="py-8 flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">{menu?.name}</h2>
          {/* <h3 className="text-lg font-medium text-stone-600 leading-tight">Standart Menü</h3> */}
        </div>
      </div>
      <div className="flex gap-8">
        <section className="mt-8 flex-1">
          <Tabs defaultValue="menucontent">
            <TabsList className="mb-3 h-auto -space-x-px bg-background p-0 shadow-sm shadow-black/5 rtl:space-x-reverse">
              <TabsTrigger
                value="menucontent"
                className="relative overflow-hidden rounded-none border border-stone-200 py-2 px-4 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active] data-[state=active]:after:bg-orange-600 text-stone-500 hover:text-stone-700"
              >
                <PiForkKnife className="mr-1" /> Menü İçeriği
              </TabsTrigger>
              <TabsTrigger
                value="menusettings"
                className="relative overflow-hidden rounded-none border border-stone-200 py-2 px-4 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active] data-[state=active]:after:bg-orange-600 text-stone-500 hover:text-stone-700"
              >
                <PiGear className="mr-1" /> Menü Ayarları
              </TabsTrigger>
            </TabsList>
            <TabsContent value="menucontent">
              <section className="bg-white rounded-md shadow-[-2px_11px_36px_0px_rgba(0,_0,_0,_0.05)] w-full px-6 py-6">
                <div className="flex justify-end gap-2">
                  <CreateCategory menuId={menu_id} />
                  {menu?.category.length === 0 ? (
                    ''
                  ) : (
                    <CreateItem menuId={menu_id} categoryData={categoryData} />
                  )}
                </div>
                <div className="mt-6">
                  {menu?.category.length === 0 ? (
                    <div className="flex flex-col items-center justify-center pt-24 pb-32 gap-1">
                      <PiBookOpenTextLight className="size-7 text-stone-500/90" />
                      <h3 className="text-stone-500/90 text-sm">
                        Menünüzü oluşturmak için ilk kategorinizi ekleyin
                      </h3>
                    </div>
                  ) : (
                    <MenuTree data={jsonMenu} menuId={menu_id} />
                  )}
                </div>
              </section>
            </TabsContent>
            <TabsContent value="menusettings">
              <section className="bg-white rounded-md shadow-[-2px_11px_36px_0px_rgba(0,_0,_0,_0.05)] w-full px-6 py-6">
                <MenuSettings
                  menuId={menu_id}
                  name={menu?.name}
                  theme={menu?.theme ?? undefined}
                  coverImg={menu?.coverImage ?? undefined}
                  coverLogo={menu?.coverLogo ?? undefined}
                  coverVideo={menu?.coverVideo ?? undefined}
                />
              </section>
            </TabsContent>
          </Tabs>
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
              <InternalFrame src={`/${venue?.slug}/menu/${menu_id}`} data={jsonMenu} title={''} />
            </div>
            <div className="flex flex-col items-center border-t border-gray-100 bg-stone-50 px-5 pb-1 pt-4">
              <div className="h-[3px] w-[90px] rounded-lg bg-stone-900"></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
