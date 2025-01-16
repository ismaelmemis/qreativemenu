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
import { PiBookOpenText, PiListPlus } from 'react-icons/pi';

export function CreateMenuForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'primary'} className="text-[14px] font-medium">
          <PiListPlus /> Yeni Menü
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 pt-8">
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
      </DialogContent>
    </Dialog>
  );
}
