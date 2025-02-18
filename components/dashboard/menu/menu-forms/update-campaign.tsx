'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updateCampaignSchema } from '@/lib/schemas';
import { Campaign } from '@prisma/client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import ImagePickerFormData from './image-picker-form-data';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { Textarea } from '@/components/ui/textarea';

import { Switch } from '@/components/ui/switch';
import { PiCheckCircle, PiPencilLine } from 'react-icons/pi';
import { updateCampaign } from '@/actions/menu';
import { toast } from 'sonner';

export type CampaignValues = {
  name: string;
  description: string;
  featured: boolean | undefined;
};

export default function UpdateCampaign({ campaign }: { campaign: Campaign }) {
  const [formDataManual, setFormDataManual] = useState<FormData>(new FormData());
  const [open, setOpen] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof updateCampaignSchema>>({
    resolver: zodResolver(updateCampaignSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof updateCampaignSchema>) {
    const { name, description, featured } = values;
    const actionValues: CampaignValues = { name, description, featured };

    updateCampaign(actionValues, campaign.id, formDataManual);

    setOpen(false);

    toast(
      <div className="flex items-center">
        <span className="text-emerald-600 text-[15px] flex items-center gap-2">
          <PiCheckCircle className="size-5" /> Kampanyanız Güncellendi
        </span>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'alternative'} className="text-[14px] font-medium">
          Düzenle <PiPencilLine />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
        <div className="overflow-y-auto pb-16">
          <DialogHeader className="contents space-y-0 text-left">
            <DialogTitle className="border-b border-border px-6 py-4 text-base font-medium text-stone-800">
              Kampanya Oluştur
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 py-4">
              <FormField
                control={form.control}
                name="name"
                defaultValue={campaign.name}
                render={({ field }) => (
                  <>
                    <FormItem className="space-y-0.5 px-5">
                      <FormLabel className="text-[15px]">
                        Kampanya Başlığı <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Hafta Sonu İndirimi..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                defaultValue={campaign.description as string}
                render={({ field }) => (
                  <>
                    <FormItem className="space-y-0.5 px-5">
                      <FormLabel className="text-[15px]">
                        Kampanya Detayı <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea placeholder="Kampanya Detayı Girin..." {...field} />
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
                      <FormLabel className="text-[15px]">Kampanya Görseli</FormLabel>
                      <FormControl>
                        <ImagePickerFormData
                          field={field}
                          setImageInput={setFormDataManual}
                          xFormData={formDataManual}
                          defaultImage={campaign.image}
                          formName="image"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />

              <FormField
                control={form.control}
                name="coverImg"
                render={({ field }) => (
                  <>
                    <FormItem className="space-y-0.5 px-5">
                      <FormLabel className="text-[15px]">Kampanya Kapak Görseli</FormLabel>
                      <FormControl>
                        <ImagePickerFormData
                          field={field}
                          setImageInput={setFormDataManual}
                          xFormData={formDataManual}
                          formName="coverImg"
                          defaultImage={campaign.coverImg}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="featured"
                defaultValue={campaign.featured}
                render={({ field }) => (
                  <>
                    <FormItem className="space-y-0.5 px-5 flex items-center gap-3 pb-6">
                      <FormLabel className="text-[15px]">Öne Çıkan:</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-5 w-8 [&_span]:size-4 [&_span]:data-[state=checked]:translate-x-3 rtl:[&_span]:data-[state=checked]:-translate-x-3"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />

              <div className="flex fixed bottom-0 bg-white w-full border-t border-border justify-end sm:items-end px-5 py-4">
                <Button type="submit" variant={'primary'} className="text-sm">
                  Kaydet
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
