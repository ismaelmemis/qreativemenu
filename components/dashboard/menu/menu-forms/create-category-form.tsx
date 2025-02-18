'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createCategorySchema } from '@/lib/schemas';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { createCategory } from '@/actions/menu';
import ImagePicker from './image-picker';
import { PiCheckCircle, PiInfo, PiPlus } from 'react-icons/pi';
import { toast } from 'sonner';

export function CreateCategoryForm({ menuId }: { menuId: string }) {
  const [open, setOpen] = useState(false);
  const [imageInput, setImageInput] = useState<FormData>(new FormData());

  // 1. Define your form.
  const form = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof createCategorySchema>) {
    const actionValues = { ...values, image: values?.image?.name };

    createCategory(actionValues, imageInput);

    setOpen(false);

    toast(
      <div className="flex items-center">
        <span className="text-emerald-600 text-[15px] flex items-center gap-2">
          <PiCheckCircle className="size-5" /> Yeni Kategori Eklendi
        </span>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 py-4">
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
              render={({ field }) => (
                <>
                  <FormItem className="space-y-0.5 px-5">
                    <FormLabel>
                      Kategori Adı <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Başlangıçlar..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <>
                  <FormItem className="space-y-0.5 px-5">
                    <FormLabel>Kategori Açıklaması</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Kategori Açıklaması Girin..." {...field} />
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
                      <ImagePicker field={field} setImageInput={setImageInput} />
                    </FormControl>
                    <div className="text-xs text-stone-600 pt-2 flex items-center gap-1">
                      <PiInfo /> Resimler için önerilen çözünürlük 1200x1200px ve önerilen boyut 5MB
                      ve altıdır.
                    </div>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <div className="flex border-t border-border pt-4 justify-end sm:items-end px-5">
              <Button type="submit" variant={'primary'} className="text-sm">
                Kaydet
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
