import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PiPlus, PiUploadSimple, PiInfo } from 'react-icons/pi';

export default function CreateCategory() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary" className="text-sm h-8 bg-orange-600">
          <PiPlus /> Kategori Ekle
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b border-border px-6 py-4 text-base font-medium text-stone-800">
            Kategori Oluştur
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-5 py-4">
          <div className="space-y-0.5 px-5">
            <Label htmlFor="categoryname" className="text-[15px]">
              Kategori Adı <span className="text-red-600">*</span>
            </Label>
            <Input id={'categoryname'} type="text" placeholder="Başlangıçlar..." />
          </div>
          <div className="space-y-0.5 px-5">
            <Label htmlFor="categoryname" className="text-[15px]">
              Kategori Açıklaması
            </Label>
            <Textarea placeholder="Kategori Açıklaması Girin..." />
          </div>
          <div className="space-y-0.5 px-5">
            <Label htmlFor="categoryname" className="text-[15px]">
              Kategori Resmi
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
              <PiInfo /> Resimler için önerilen çözünürlük 1200x1200px ve önerilen boyut 5MB ve
              altıdır.
            </div>
          </div>
        </form>
        <DialogFooter className="border-t border-border py-4 sm:items-center px-5">
          <DialogClose asChild>
            <Button type="button" variant={'primary'} className="text-sm">
              Kaydet
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
