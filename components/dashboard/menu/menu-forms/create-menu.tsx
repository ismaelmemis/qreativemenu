import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PiBookOpenText, PiListPlus, PiLockKey, PiSparkleFill } from 'react-icons/pi';

export function CreateMenuForm() {
  const premium: boolean = false;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'primary'} className="text-[14px] font-medium">
          <PiListPlus /> Yeni Menü
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 pt-8">
        {premium ? (
          <>
            <div className="flex flex-col items-center gap-2">
              <div
                className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-transparent bg-orange-600/20"
                aria-hidden="true"
              >
                <PiBookOpenText className="opacity-80 text-orange-700" size={22} strokeWidth={2} />
              </div>
              <DialogHeader className="mb-2">
                <DialogTitle className="sm:text-center font-medium text-[22px]">
                  Menünüze ne isim vermek istersiniz?
                </DialogTitle>
                <DialogDescription className="sm:text-center text-stone-700 text-[15px]">
                  Yeni menünüze yeni bir isim verin ve oluşturun
                </DialogDescription>
              </DialogHeader>
            </div>
            <form className="space-y-5 mt-2">
              <div className="space-y-0.5 px-5">
                <Label htmlFor="menuname" className="text-[15px]">
                  Menü Adı <span className="text-red-600">*</span>
                </Label>
                <Input id={'menuname'} type="text" placeholder="Bamboo Cafe..." />
              </div>
              <DialogFooter className="border-t border-border py-4 sm:items-center px-5">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    İptal Et
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="button" variant={'primary'} className="text-sm">
                    Menü Oluştur
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </>
        ) : (
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
              Çoklu menü oluşturabilmek için paketinizi yükseltin veya destek@qreativemenu.com
              iletişime geçin
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
        )}
      </DialogContent>
    </Dialog>
  );
}
