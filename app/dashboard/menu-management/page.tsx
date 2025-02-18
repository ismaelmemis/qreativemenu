import Link from 'next/link';

import { auth } from '@/auth';

import { Button } from '@/components/ui/button';
import { PiArchive, PiBroadcast, PiForkKnife } from 'react-icons/pi';
import { FaSignal } from 'react-icons/fa';
import { FaBatteryFull } from 'react-icons/fa';
import { FaWifi } from 'react-icons/fa';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreateMenuForm } from '@/components/dashboard/menu/menu-forms/create-menu';
import MenuDropdown from '@/components/dashboard/menu/dropdowns/menu-dropdown';
import { db } from '@/lib/db';
import InternalFrame from '@/components/view/internal-frame';
import MenuActiveSwitcher from '@/components/dashboard/menu/menu-forms/menu-active-switcher';

export default async function MenuManagement() {
  const session = await auth();

  const user = await db.user.findUnique({
    where: { id: session?.user.id },
    include: {
      venues: {
        include: {
          menus: {
            include: {
              category: {
                include: {
                  menuItem: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const menus = user?.venues.flatMap((venue) => venue.menus);

  return (
    <div className="py-8 flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Menü Yönetimi</h2>
        <CreateMenuForm />
      </div>
      <div className="flex gap-8">
        <section className="mt-8 flex-1">
          <Tabs defaultValue="menus">
            <TabsList className="mb-3 h-auto -space-x-px bg-background p-0 shadow-sm shadow-black/5 rtl:space-x-reverse">
              <TabsTrigger
                value="menus"
                className="relative overflow-hidden rounded-none border border-stone-200 py-2 px-4 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active] data-[state=active]:after:bg-orange-600 text-stone-500 hover:text-stone-700"
              >
                <PiForkKnife className="mr-1" /> Menüler
              </TabsTrigger>
              <TabsTrigger
                value="archive"
                className="relative overflow-hidden rounded-none border border-stone-200 py-2 px-4 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active] data-[state=active]:after:bg-orange-600 text-stone-500 hover:text-stone-700"
              >
                <PiArchive className="mr-1" />
                Arşivlenen
              </TabsTrigger>
            </TabsList>
            <TabsContent value="menus">
              <section className="flex flex-col gap-3 bg-white rounded-md shadow-[-2px_11px_36px_0px_rgba(0,_0,_0,_0.05)] w-full px-6 py-6">
                {menus?.map((menu) => {
                  return (
                    <div
                      key={menu.id}
                      className="rounded-xl border border-stone-200/70 shadow-sm p-5 flex justify-between relative"
                    >
                      <div
                        className={`absolute size-2 ${
                          menu.isActive ? 'bg-green-400' : 'bg-red-400'
                        } rounded-full right-4 top-5`}
                      ></div>
                      <div className="flex flex-col gap-3 justify-between">
                        <div>
                          <h2 className="font-medium text-lg text-stone-950 leading-snug">
                            {menu.name}
                          </h2>
                          <div className="text-[13px] text-stone-600 flex items-center">
                            <strong className="font-semibold">Durumu:</strong>{' '}
                            <span className="ml-1">
                              {menu.isActive ? 'Yayında' : 'Yayında Değil'}
                            </span>
                            <PiBroadcast
                              className={`ml-0.5 ${
                                menu.isActive ? 'text-green-400' : 'text-red-400'
                              } font-bold`}
                            />
                          </div>
                        </div>
                        <div className="text-[13px] font-medium text-stone-700">
                          {menu.category.length} Kategori -{' '}
                          {menu.category.reduce((curr, acc) => curr + acc.menuItem.length, 0)} Ürün
                        </div>
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-3">
                          <Button variant="alternative" className="text-sm" asChild>
                            <Link href={`menu-management/${menu.id}`}>Menüyü Düzenle</Link>
                          </Button>
                          <MenuActiveSwitcher menuId={menu.id} isActive={menu.isActive} />
                          {/* <Switch
                            checked
                            className="h-5 w-8 [&_span]:size-4 [&_span]:data-[state=checked]:translate-x-3 rtl:[&_span]:data-[state=checked]:-translate-x-3 ml-2 data-[state=checked]:bg-green-400"
                          /> */}
                          <MenuDropdown menuId={menu.id} archived={menu?.archived} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </section>
            </TabsContent>
            <TabsContent value="archive">
              <section className="bg-white rounded-md shadow-[-2px_11px_36px_0px_rgba(0,_0,_0,_0.05)] w-full px-6 py-6">
                <div className="flex flex-col items-center justify-center gap-0.5 py-24 2xl:py-36">
                  <PiArchive className="size-7 text-stone-500/90" />
                  <h3 className="text-stone-500/90 text-sm">Arşivlenmiş menü bulunmamaktadır.</h3>
                </div>
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
              <InternalFrame src="/danielgallegos" title={''} />
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
