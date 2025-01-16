import Link from 'next/link';

import CreateCampaign from '@/components/dashboard/menu/menu-forms/create-campaign';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FaBatteryFull, FaSignal, FaWifi } from 'react-icons/fa';
import { PiArchive, PiBroadcast, PiPercent } from 'react-icons/pi';
import { Switch } from '@/components/ui/switch';
import CampaignDropdown from '@/components/dashboard/menu/dropdowns/campaign-dropdown';

export default function Campaigns() {
  return (
    <div className="py-8 flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Kampanyalar</h2>
        </div>
        <CreateCampaign />
      </div>
      <div className="flex gap-8">
        <section className="mt-8 flex-1">
          <Tabs defaultValue="campaigns">
            <TabsList className="mb-3 h-auto -space-x-px bg-background p-0 shadow-sm shadow-black/5 rtl:space-x-reverse">
              <TabsTrigger
                value="campaigns"
                className="relative overflow-hidden rounded-none border border-stone-200 py-2 px-4 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active] data-[state=active]:after:bg-orange-600 text-stone-500 hover:text-stone-700"
              >
                <PiPercent className="mr-1" /> Kampanyalar
              </TabsTrigger>
              <TabsTrigger
                value="archive"
                className="relative overflow-hidden rounded-none border border-stone-200 py-2 px-4 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active] data-[state=active]:after:bg-orange-600 text-stone-500 hover:text-stone-700"
              >
                <PiArchive className="mr-1" /> Arşivler
              </TabsTrigger>
            </TabsList>
            <TabsContent value="campaigns">
              <section className="bg-white rounded-md shadow-[-2px_11px_36px_0px_rgba(0,_0,_0,_0.05)] w-full px-6 py-6">
                <div className="rounded-xl border border-stone-200/70 shadow-sm p-5 flex justify-between relative">
                  <div>
                    <h2 className="font-medium text-lg text-stone-950 leading-snug">
                      Haftasonu Şöleni
                    </h2>
                    <div className="text-[13px] text-stone-600 flex items-center">
                      <strong className="font-semibold">Durumu:</strong>{' '}
                      <span className="ml-1">Aktif</span>
                      <PiBroadcast className="ml-0.5 text-emerald-500 font-bold" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-3">
                      <Button variant="alternative" className="text-sm h-8" asChild>
                        <Link href="#">Düzenle</Link>
                      </Button>
                      <Switch
                        checked
                        className="h-5 w-8 [&_span]:size-4 [&_span]:data-[state=checked]:translate-x-3 rtl:[&_span]:data-[state=checked]:-translate-x-3 ml-2 data-[state=checked]:bg-green-400"
                      />
                      <CampaignDropdown />
                    </div>
                  </div>
                </div>
              </section>
            </TabsContent>
            <TabsContent value="archive">
              <section className="bg-white rounded-md shadow-[-2px_11px_36px_0px_rgba(0,_0,_0,_0.05)] w-full px-6 py-6"></section>
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
            <div className="flex-1"></div>
            <div className="flex flex-col items-center border-t border-gray-100 bg-stone-50 px-5 pb-1 pt-4">
              <div className="h-[3px] w-[90px] rounded-lg bg-stone-900"></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
