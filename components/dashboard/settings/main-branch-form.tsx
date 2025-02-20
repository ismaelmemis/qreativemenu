'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updateBranchSettings } from '@/lib/schemas';
import { Venue } from '@prisma/client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PiCheckCircle, PiInfo } from 'react-icons/pi';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { currencies } from '@/utils/currencies';
import { Button } from '@/components/ui/button';

import { updateMainBranchSettings } from '@/actions/menu';
import { toast } from 'sonner';
import ImagePickerFormData from '../menu/menu-forms/image-picker-form-data';

export default function MainBranchForm({ venueData }: { venueData: Venue }) {
  const [formDataManual, setFormDataManual] = useState<FormData>(new FormData());

  console.log(venueData.currency);

  // 1. Define your form.
  const form = useForm<z.infer<typeof updateBranchSettings>>({
    resolver: zodResolver(updateBranchSettings),
    defaultValues: {
      branchName: venueData.branchName,
      address: venueData.address || '',
      currency: venueData.currency || '',
      description: venueData.description || '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof updateBranchSettings>) {
    const { branchName, currency, address, description } = values;
    const actionValues = { branchName, currency, address, description };

    console.log('Form Data Manual', formDataManual.get('venueImage'));

    updateMainBranchSettings(actionValues, venueData.id, formDataManual);
    toast(
      <div className="flex items-center">
        <span className="text-emerald-600 text-[15px] flex items-center gap-2">
          <PiCheckCircle className="size-5" /> Ayarlarınız Kaydedildi
        </span>
      </div>
    );
    setFormDataManual(new FormData());
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <>
              <FormItem className="space-y-0.5">
                <FormLabel className="text-base text-[15px]">İşletme Logosu</FormLabel>
                <FormControl>
                  <ImagePickerFormData
                    field={field}
                    setImageInput={setFormDataManual}
                    containImage={true}
                    formName="logo"
                    xFormData={formDataManual}
                    defaultImage={venueData.logo}
                  />
                </FormControl>
                <div className="text-xs text-stone-600 pt-2 flex items-center gap-1">
                  <PiInfo /> Resimler için önerilen çözünürlük 1200x1200px ve önerilen boyut 5MB ve
                  altıdır.
                </div>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="venueImage"
          render={({ field }) => (
            <>
              <FormItem className="space-y-0.5">
                <FormLabel className="text-base text-[15px]">İşletme Fotoğrafı</FormLabel>
                <FormControl>
                  <ImagePickerFormData
                    field={field}
                    setImageInput={setFormDataManual}
                    xFormData={formDataManual}
                    formName="venueImage"
                    containImage={true}
                    defaultImage={venueData.image}
                  />
                </FormControl>
                <div className="text-xs text-stone-600 pt-2 flex items-center gap-1">
                  <PiInfo /> Resimler için önerilen çözünürlük 1200x1200px ve önerilen boyut 5MB ve
                  altıdır.
                </div>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <div className="space-y-1">
          <Label htmlFor="venuename" className="text-[15px]">
            İşletme Adı
          </Label>
          <Input type="text" defaultValue={venueData.name} disabled readOnly />
        </div>
        <FormField
          control={form.control}
          name="branchName"
          render={({ field }) => (
            <>
              <FormItem className="space-y-0.5">
                <FormLabel className="text-base text-[15px]">Şube Adı</FormLabel>
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
          name="address"
          render={({ field }) => (
            <>
              <FormItem className="space-y-0.5">
                <FormLabel className="text-base text-[15px]">Adres</FormLabel>
                <FormControl>
                  <Textarea placeholder="Şubenizin adresini girin..." {...field} />
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
              <FormItem className="space-y-0.5">
                <FormLabel className="text-base text-[15px]">İşletme Tanıtım Yazısı</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-16"
                    placeholder="İşletmenizi tasvir eden kısa tanıtım yazısı girin..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <>
              <FormItem className="space-y-0.5">
                <FormLabel>Para Birimi</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="h-11 placeholder:text-stone-500 ">
                      <SelectValue placeholder="Para Birimi Seç" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => {
                        return (
                          <SelectItem key={currency.label} value={currency.label}>
                            {currency.label} - {currency.value}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <div className="mt-1 flex justify-end">
          <Button type="submit" variant={'primary'} className="text-sm">
            Kaydet
          </Button>
        </div>
      </form>
    </Form>
  );
}
