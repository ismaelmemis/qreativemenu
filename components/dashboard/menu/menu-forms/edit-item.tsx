'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import MultipleSelector, { Option } from '@/components/ui/multiselect';
import { createMenuItemSchema } from '@/lib/schemas';
import ImagePicker from './image-picker';
import { PiCheckCircle, PiPencil } from 'react-icons/pi';
import { editMenuItem } from '@/actions/menu';
import { toast } from 'sonner';

const keyIngredients: Option[] = [
  { value: 'farm-to-kitchen', label: 'Tarladan Mutfağa' },
  { value: 'organic', label: 'Organik Ürünler' },
  { value: 'vegan', label: 'Vegan Ürünler' },
  { value: 'milk-products', label: 'Süt Ürünleri' },
  { value: 'sugar-free', label: 'Şekersiz' },
  { value: 'traditional', label: 'Yöresel' },
];

const allergens: Option[] = [
  { value: 'gluten', label: 'Glüten içerir' },
  { value: 'egg', label: 'Yumurta' },
  { value: 'milk', label: 'Süt ürünleri' },
  { value: 'peanut', label: 'Yerfıstığı' },
  { value: 'treenuts', label: 'Kuruyemişler' },
  { value: 'fish', label: 'Balık' },
  { value: 'crustaceans', label: 'Kabuklu Deniz Ürünleri' },
  { value: 'mollusks', label: 'Yumuşakçalar' },
  { value: 'mustard', label: 'Hardal' },
  { value: 'lupin', label: 'Lupin' },
];

function findLabel(ingredient: string) {
  const keyIngredientsItem = keyIngredients.find((item) => {
    return item.value === ingredient;
  });

  return keyIngredientsItem?.label;
}

function findAllergensLabel(allergen: string) {
  const keyIngredientsItem = allergens.find((item) => {
    return item.value === allergen;
  });

  return keyIngredientsItem?.label;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EditItem({ menuId, node }: { menuId: string; node: any }) {
  const [open, setOpen] = useState(false);
  const [selectedKeyIngredients, setSelectedKeyIngredients] = useState<Option[]>([]);
  const [selectedAllergens, setSelectedAllergens] = useState<Option[]>([]);
  const [imageInput, setImageInput] = useState<FormData>(new FormData());

  const form = useForm<z.infer<typeof createMenuItemSchema>>({
    resolver: zodResolver(createMenuItemSchema),
  });

  function onSubmit(values: z.infer<typeof createMenuItemSchema>) {
    const { name, description, price, menuId, category, time, calorie } = values;
    const actionValues = { name, description, price, menuId, category, calorie, time };

    editMenuItem(actionValues, node.id, selectedKeyIngredients, selectedAllergens, imageInput);

    setOpen(false);

    toast(
      <div className="flex items-center">
        <span className="text-emerald-600 text-[15px] flex items-center gap-2">
          <PiCheckCircle className="size-5" /> Kategoriniz Güncellendi
        </span>
      </div>
    );
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const convertedIngredients = node.data.ingredients.map((ingredient: any) => ({
      value: ingredient,
      label: findLabel(ingredient),
    }));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const convertedAllergens = node.data.allergens.map((ingredient: any) => ({
      value: ingredient,
      label: findAllergensLabel(ingredient),
    }));

    setSelectedKeyIngredients(convertedIngredients);
    setSelectedAllergens(convertedAllergens);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <PiPencil className="size-4 text-orange-400" />
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
        <div className="overflow-y-auto">
          <DialogHeader className="contents space-y-0 text-left">
            <DialogTitle className="border-b border-border px-6 py-4 text-base font-medium text-stone-800">
              Ürün Düzenle
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="menuId"
                defaultValue={menuId}
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormControl>
                        <Input type="hidden" {...field} />
                      </FormControl>
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                defaultValue={node.text}
                render={({ field }) => (
                  <>
                    <FormItem className="space-y-0.5 px-5">
                      <FormLabel>
                        Ürün Adı <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Çoban Salatası..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                defaultValue={node.data.description}
                name="description"
                render={({ field }) => (
                  <>
                    <FormItem className="space-y-0.5 px-5">
                      <FormLabel>Ürün Açıklaması</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Ürün Açıklaması Girin..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <>
                    <FormItem className="space-y-0.5 px-5">
                      <FormLabel>Kategori Resmi</FormLabel>
                      <FormControl>
                        <ImagePicker
                          field={field}
                          setImageInput={setImageInput}
                          defaultImage={node.data.image}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                defaultValue={node.data.price}
                render={({ field }) => (
                  <>
                    <FormItem className="space-y-0.5 px-5">
                      <FormLabel>Fiyat</FormLabel>
                      <FormControl>
                        <div className="flex rounded-lg shadow-sm shadow-black/5">
                          <span className="-z-10 inline-flex items-center rounded-s-lg border border-input bg-stone-100 px-3 text-sm text-stone-800">
                            ₺
                          </span>
                          <Input
                            id={'price'}
                            className="-ms-px rounded-s-none shadow-none h-9 w-[80px]"
                            placeholder=""
                            type="text"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="keyingredients"
                render={({}) => (
                  <>
                    <FormItem className="space-y-0.5 px-5">
                      <FormLabel>Anahtar İçerikler</FormLabel>
                      <FormControl>
                        <MultipleSelector
                          commandProps={{
                            label: 'Anahtar İçerik Seç',
                          }}
                          value={selectedKeyIngredients}
                          defaultOptions={keyIngredients}
                          placeholder="Anahtar İçerik Seç"
                          hideClearAllButton
                          hidePlaceholderWhenSelected
                          emptyIndicator={<p className="text-center text-sm">Sonuç bulunamadı</p>}
                          onChange={(options) => {
                            setSelectedKeyIngredients(options);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="allergens"
                render={({ field }) => (
                  <>
                    <FormItem className="space-y-0.5 px-5">
                      <FormLabel>Alerjenler</FormLabel>
                      <FormControl>
                        <MultipleSelector
                          commandProps={{
                            label: 'Alerjenler',
                          }}
                          value={selectedAllergens}
                          field={field}
                          defaultOptions={allergens}
                          placeholder="Alerjen seç"
                          hideClearAllButton
                          hidePlaceholderWhenSelected
                          emptyIndicator={<p className="text-center text-sm">Sonuç bulunamadı</p>}
                          onChange={(options) => {
                            setSelectedAllergens(options);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <div className="space-y-0.5 px-5 flex gap-3 pb-20">
                <FormField
                  control={form.control}
                  name="calorie"
                  defaultValue={node?.data?.calories?.toString() || ''}
                  render={({ field }) => (
                    <>
                      <FormItem className="">
                        <FormLabel>Kalori</FormLabel>
                        <FormControl>
                          <div className="flex rounded-lg shadow-sm shadow-black/5">
                            <span className="-z-10 inline-flex items-center rounded-s-lg border border-input bg-stone-100 px-3 text-sm text-stone-800">
                              cal
                            </span>
                            <Input
                              {...field}
                              id={'calorie'}
                              className="-ms-px rounded-s-none shadow-none h-9 w-[80px]"
                              placeholder=""
                              type="number"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time"
                  defaultValue={node?.data?.preparationTime?.toString() || ''}
                  render={({ field }) => (
                    <>
                      <FormItem className="">
                        <FormLabel>Hazırlanma Süresi</FormLabel>
                        <FormControl>
                          <div className="flex rounded-lg shadow-sm shadow-black/5">
                            <Input
                              {...field}
                              id={'time'}
                              className="-ms-px rounded-s-lg rounded-e-none shadow-none h-9 w-[80px]"
                              placeholder=""
                              type="number"
                            />
                            <span className="-z-10 inline-flex items-center rounded-s-none rounded-e-lg border border-input border-l-0 bg-stone-100 px-3 text-sm text-stone-800">
                              min (dk)
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
              </div>
              <div className="flex fixed bottom-0 bg-white w-full border-t border-border pt-4 pb-4 justify-end sm:items-end px-5">
                <Button type="submit" variant={'primary'} className="text-sm">
                  Kaydet
                </Button>
              </div>
            </form>
          </Form>
          {/* <form className="space-y-5 py-4">
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
                <Label htmlFor={'time'}>Hazırlanma Süresi</Label>
                <div className="flex rounded-lg shadow-sm shadow-black/5">
                  <Input
                    id={'time'}
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
          </form> */}
        </div>
        {/* <DialogFooter className="border-t border-border py-4 sm:items-center px-5">
          <DialogClose asChild></DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
