import { auth } from '@/auth';
import ContactForm from '@/components/dashboard/settings/contact-form';
import MainBranchForm from '@/components/dashboard/settings/main-branch-form';
import WifiForm from '@/components/dashboard/settings/wifi-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { db } from '@/lib/db';
import { PiBuildings, PiLockKey, PiMapPinPlus, PiSparkleFill, PiStorefront } from 'react-icons/pi';

export default async function AccountVenueSettings() {
  const session = await auth();
  const user = session?.user;

  const venue = await db.venue.findFirst({
    where: {
      userId: user?.id,
      isActive: true,
    },
    include: {
      menus: true,
    },
  });

  return (
    <div className="py-8 flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Mekan Ayarları</h2>
        </div>
      </div>
      <div className="flex gap-8">
        <section className="mt-8 flex-1">
          <Tabs defaultValue="venuesettings">
            <TabsList className="mb-3 h-auto -space-x-px bg-background p-0 shadow-sm shadow-black/5 rtl:space-x-reverse">
              <TabsTrigger
                value="venuesettings"
                className="relative overflow-hidden rounded-none border border-stone-200 py-2 px-4 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active] data-[state=active]:after:bg-orange-600 text-stone-500 hover:text-stone-700"
              >
                <PiStorefront className="mr-1" /> İşletme Ayarları
              </TabsTrigger>
              <TabsTrigger
                value="branches"
                className="relative overflow-hidden rounded-none border border-stone-200 py-2 px-4 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active] data-[state=active]:after:bg-orange-600 text-stone-500 hover:text-stone-700"
              >
                <PiMapPinPlus className="mr-1" />
                Şubeler
              </TabsTrigger>
            </TabsList>
            <TabsContent value="venuesettings">
              <main className="flex flex-col gap-6 mt-6">
                <div className="flex flex-1">
                  <div className="w-3/12">
                    <h2 className="text-lg font-medium mb-2">Ana Şube Bilgileri</h2>
                    <p className="text-[13px] text-stone-700">
                      İşletmelerinizle ilgili detayları ve bilgileri düzenleyin
                    </p>
                  </div>
                  <div className="w-9/12">
                    <div className="bg-white rounded-md shadow-[-2px_11px_36px_0px_rgba(0,_0,_0,_0.05)] w-full px-6 py-6">
                      {venue && <MainBranchForm venueData={venue} />}
                      {/* <div className="flex flex-col gap-6">
                        <div className="space-y-1">
                          <Label htmlFor="categoryname" className="text-[15px]">
                            İşletme Logosu
                          </Label>
                          <input type="file" className="hidden" />
                          <div className="border border-dashed rounded-lg cursor-pointer px-[3px] border-stone-300 w-[140px] h-[124px] flex items-center justify-center flex-col">
                            <PiUploadSimple className="text-orange-700 size-6 mb-2" />
                            <h3 className="font-medium">Yükle</h3>
                            <span className="text-stone-400 text-xs text-center">
                              Sadece .jpg .jpeg ve .png dosya uzantıları
                            </span>
                          </div>
                          <div className="text-xs text-stone-600 pt-2 flex items-center gap-1">
                            <PiInfo /> Resimler için önerilen çözünürlük 1200x1200px ve önerilen
                            boyut 5MB ve altıdır.
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="categoryname" className="text-[15px]">
                            İşletme Adı
                          </Label>
                          <Input type="text" value="Daniel Gallego's" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="branchname" className="text-[15px]">
                            Şube Adı
                          </Label>
                          <Input type="text" value="Merkez Şube" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="adress" className="text-[15px]">
                            Adres
                          </Label>
                          <Textarea
                            name="address"
                            value={'Beyoğlu cad. Alemdar sk. No:4 Taksim/İstanbul'}
                          />
                        </div>
                        <div className="mt-1 flex justify-end">
                          <Button type="button" variant={'primary'} className="text-sm">
                            Kaydet
                          </Button>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="flex flex-1">
                  <div className="w-3/12">
                    <h2 className="text-lg font-medium mb-2">Telefon Bilgileri</h2>
                    <p className="text-[13px] text-stone-700">
                      Menünüzdeki Whatsapp Hattını kullanmak istiyorsanız lütfen bir Whatsapp
                      Numarası girin.
                    </p>
                  </div>
                  <div className="w-9/12">
                    <div className="bg-white rounded-md shadow-[-2px_11px_36px_0px_rgba(0,_0,_0,_0.05)] w-full px-6 py-6">
                      {venue && <ContactForm venueData={venue} />}
                    </div>
                  </div>
                </div>
                <div className="flex flex-1">
                  <div className="w-3/12">
                    <h2 className="text-lg font-medium mb-2">Şube Wifi Bilgiler</h2>
                    <p className="text-[13px] text-stone-700">
                      İşletmenizin Wi-Fi bilgilerini paylaşara müşterilerinizin internete
                      bağlanmasını sağlayabilirsiniz
                    </p>
                  </div>
                  <div className="w-9/12">
                    <div className="bg-white rounded-md shadow-[-2px_11px_36px_0px_rgba(0,_0,_0,_0.05)] w-full px-6 py-6">
                      {venue && <WifiForm venueData={venue} />}
                    </div>
                  </div>
                </div>
              </main>
            </TabsContent>
            <TabsContent value="branches">
              <div className="bg-white rounded-md shadow-[-2px_11px_36px_0px_rgba(0,_0,_0,_0.05)] w-full px-6 py-6">
                <div className="flex flex-col items-center justify-center gap-0.5 py-24 2xl:py-36">
                  <PiBuildings className="size-7 text-stone-500/90" />
                  <h3 className="text-stone-500/90 text-sm">
                    Herhangi bir şubeniz bulunmamaktadır.
                  </h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button type="button" variant={'primary'} className="text-sm mt-3">
                        Şube Ekle
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="flex flex-col gap-0 p-0 pt-8">
                      <div className="flex flex-col items-center gap-2">
                        <DialogHeader className="mb-2 flex flex-col">
                          <DialogTitle className="flex text-red-500 items-center gap-2 font-medium text-[18px]">
                            <div className="rounded-full bg-red-100 w-8 h-8 flex items-center justify-center">
                              <PiLockKey />
                            </div>
                            Yetkiniz bulunmamaktadır
                          </DialogTitle>
                        </DialogHeader>
                        <div className="text-center  text-[14px]">
                          Çoklu menü oluşturabilmek için paketinizi yükseltin veya
                          destek@qreativemenu.com iletişime geçin
                        </div>
                        <div className="mr-4 mb-6 mt-2 shadow-sm px-3.5 py-2 rounded-lg border border-stone-200/50 cursor-pointer">
                          <p className="font-semibold flex gap-1.5 items-center">
                            <PiSparkleFill className=" text-blue-600" />{' '}
                            <span className="text-[14px] tracking-normal bg-gradient-to-r from-blue-700 to-violet-700 bg-clip-text text-transparent">
                              Premium Pakete Yükselt
                            </span>
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
}
