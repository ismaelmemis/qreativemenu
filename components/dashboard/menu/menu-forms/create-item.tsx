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
import MultipleSelector, { Option } from '@/components/ui/multiselect';
import { PiPlus, PiUploadSimple, PiInfo } from 'react-icons/pi';

const keyIngredients: Option[] = [
  { value: 'farm-to-kitchen', label: 'Tarladan Mutfağa' },
  { value: 'organic', label: 'Organik Ürünler' },
  { value: 'vegan', label: 'Vegan Ürünler' },
  { value: 'milk-products', label: 'Süt Ürünleri' },
];

const allergens: Option[] = [
  { value: 'gluten', label: 'Glüten içeriç' },
  { value: 'egg', label: 'Yumurta' },
  { value: 'milk', label: 'Süt ürünleri' },
  { value: 'peanut', label: 'Yerfıstığı' },
];

export default function CreateMenuItem() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary" className="text-sm h-8 bg-orange-600">
          <PiPlus /> Ürün Ekle
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
        <div className="overflow-y-auto">
          <DialogHeader className="contents space-y-0 text-left">
            <DialogTitle className="border-b border-border px-6 py-4 text-base font-medium text-stone-800">
              Ürün Oluştur
            </DialogTitle>
          </DialogHeader>
          <form className="space-y-5 py-4">
            <div className="space-y-0.5 px-5">
              <Label htmlFor="productname" className="text-[15px]">
                Ürün Adı <span className="text-red-600">*</span>
              </Label>
              <Input id={'productname'} type="text" placeholder="Domates Çorbası" />
            </div>
            <div className="space-y-0.5 px-5">
              <Label htmlFor="categoryname" className="text-[15px]">
                Ürün Açıklaması
              </Label>
              <Textarea placeholder="Ürün Açıklaması Girin..." />
            </div>
            <div className="space-y-0.5 px-5">
              <Label htmlFor="categoryname" className="text-[15px]">
                Ürün Resmi
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
            <div className="space-y-0.5 px-5 flex gap-3">
              <div>
                <Label htmlFor={'price'}>Fiyat</Label>
                <div className="flex rounded-lg shadow-sm shadow-black/5">
                  <span className="-z-10 inline-flex items-center rounded-s-lg border border-input bg-stone-100 px-3 text-sm text-stone-800">
                    ₺
                  </span>
                  <Input
                    id={'price'}
                    className="-ms-px rounded-s-none shadow-none h-9 w-[80px]"
                    placeholder=""
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-0.5 px-5">
              <Label htmlFor="keyingredients" className="text-[15px]">
                Anahtar İçerikler
              </Label>
              <MultipleSelector
                commandProps={{
                  label: 'Anahtar İçerik Seç',
                }}
                defaultOptions={keyIngredients}
                placeholder="Anahtar İçerik Seç"
                hideClearAllButton
                hidePlaceholderWhenSelected
                emptyIndicator={<p className="text-center text-sm">Sonuç bulunamadı</p>}
              />
            </div>
            <div className="space-y-0.5 px-5">
              <Label htmlFor="allergens" className="text-[15px]">
                Alerjenler
              </Label>
              <MultipleSelector
                commandProps={{
                  label: 'Alerjen seç',
                }}
                defaultOptions={allergens}
                placeholder="Alerjen seç"
                hideClearAllButton
                hidePlaceholderWhenSelected
                emptyIndicator={<p className="text-center text-sm">Sonuç bulunamadı</p>}
              />
            </div>
            <div className="space-y-0.5 px-5 flex gap-3">
              <div className="">
                <Label htmlFor={'calorie'}>Kalori</Label>
                <div className="flex rounded-lg shadow-sm shadow-black/5">
                  <span className="-z-10 inline-flex items-center rounded-s-lg border border-input bg-stone-100 px-3 text-sm text-stone-800">
                    cal
                  </span>
                  <Input
                    id={'calorie'}
                    className="-ms-px rounded-s-none shadow-none h-9 w-[80px]"
                    placeholder=""
                    type="text"
                  />
                </div>
              </div>
              <div className="">
                <Label htmlFor={'calorie'}>Hazırlanma Süresi</Label>
                <div className="flex rounded-lg shadow-sm shadow-black/5">
                  <Input
                    id={'calorie'}
                    className="-ms-px rounded-s-lg rounded-e-none shadow-none h-9 w-[80px]"
                    placeholder=""
                    type="text"
                  />
                  <span className="-z-10 inline-flex items-center rounded-s-none rounded-e-lg border border-input border-l-0 bg-stone-100 px-3 text-sm text-stone-800">
                    min (dk)
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
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
