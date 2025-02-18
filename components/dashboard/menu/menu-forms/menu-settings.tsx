'use client';

import Image from 'next/image';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';

import { editMenuSettings } from '@/lib/schemas';

const themeItems = [
  { value: 'light', label: 'Light', image: '/light-theme.png' },
  { value: 'dark', label: 'Dark', image: '/dark-theme.png' },
];

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Check, Minus } from 'lucide-react';
import { PiInfo } from 'react-icons/pi';
import VideoPicker from './video-picker';
import { updateMenuSettings } from '@/actions/menu';
import ImagePickerFormData from './image-picker-form-data';
import { Button } from '@/components/ui/button';

export default function MenuSettings({
  menuId,
  name,
  coverImg,
  coverLogo,
  coverVideo,
  theme,
}: {
  menuId: string;
  name: string | undefined;
  coverImg: string | undefined;
  coverLogo: string | undefined;
  coverVideo: string | undefined;
  theme: string | undefined;
}) {
  const [formDataManual, setFormDataManual] = useState<FormData>(new FormData());
  console.log(menuId);

  const form = useForm<z.infer<typeof editMenuSettings>>({
    resolver: zodResolver(editMenuSettings),
    defaultValues: {
      theme: theme,
    },
  });

  console.log('Cover Image', coverImg);

  function onSubmit(values: z.infer<typeof editMenuSettings>) {
    const { name, theme } = values;
    const actionValues = { name, theme };
    console.log(actionValues);
    updateMenuSettings(actionValues, menuId, formDataManual);
    setFormDataManual(new FormData());
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          defaultValue={name}
          name="name"
          render={({ field }) => (
            <>
              <FormItem className="space-y-0.5">
                <FormLabel className="text-[15px] mb-0.5">
                  Menü Adı <span className="text-red-600">*</span>
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
          name="theme"
          render={({ field }) => (
            <>
              <FormItem className="space-y-0.5">
                <FormLabel className="text-[15px]">Menü Teması</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value); // Update the form value
                    }}
                    defaultValue={field.value}
                    className="flex gap-3"
                  >
                    {themeItems.map((item) => (
                      <label key={`${item.value}`}>
                        <RadioGroupItem
                          id={`${item.value}`}
                          className="peer sr-only after:absolute after:inset-0"
                          value={`${item.value}`}
                        />
                        <Image
                          src={item.image}
                          alt={item.label}
                          width={100}
                          height={82}
                          className="relative cursor-pointer overflow-hidden rounded-lg border border-input shadow-sm shadow-black/5 outline-offset-2 transition-colors peer-[:focus-visible]:outline peer-[:focus-visible]:outline-2 peer-[:focus-visible]:outline-ring/70 peer-data-[disabled]:cursor-not-allowed peer-data-[state=checked]:border-ring peer-data-[state=checked]:border-orange-600 peer-data-[state=checked]:bg-accent peer-data-[disabled]:opacity-50"
                        />
                        <span className="group mt-2 flex items-center gap-1 peer-data-[state=unchecked]:text-muted-foreground/70">
                          <Check
                            size={16}
                            strokeWidth={2}
                            className="peer-data-[state=unchecked]:group-[]:hidden"
                            aria-hidden="true"
                          />
                          <Minus
                            size={16}
                            strokeWidth={2}
                            className="peer-data-[state=checked]:group-[]:hidden"
                            aria-hidden="true"
                          />
                          <span className="text-[15px] font-semibold">{item.label}</span>
                        </span>
                      </label>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <>
              <FormItem className="space-y-0.5">
                <FormLabel className="text-[15px] mb-0.5">Açılış Arkaplan Resmi</FormLabel>
                <FormControl>
                  <ImagePickerFormData
                    field={field}
                    setImageInput={setFormDataManual}
                    xFormData={formDataManual}
                    defaultImage={coverImg}
                    formName="coverImage"
                  />
                </FormControl>
                <FormMessage />
                <div className="text-xs text-stone-600 pt-2 flex items-center gap-1">
                  <PiInfo /> Resimler için önerilen çözünürlük 1200x1200px ve önerilen boyut 5MB ve
                  altıdır.
                </div>
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="coverVideo"
          render={({ field }) => (
            <>
              <FormItem className="space-y-0.5">
                <FormLabel className="text-[15px] mb-0.5">Açılış Videosu</FormLabel>
                <FormControl>
                  <VideoPicker
                    field={field}
                    setImageInput={setFormDataManual}
                    formName={'coverVideo'}
                    defaultImage={coverVideo}
                  />
                </FormControl>
                <FormMessage />
                <div className="text-xs text-stone-600 pt-2 flex items-center gap-1">
                  <PiInfo /> 9:16 video ölçüsü önerilir. Video yüklenmediyse menü açılışında
                  arkaplan resmi gösterilir
                </div>
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="coverLogo"
          render={({ field }) => (
            <>
              <FormItem className="space-y-0.5">
                <FormLabel className="text-[15px] mb-0.5">Açılış Arkaplan Logosu</FormLabel>
                <FormControl>
                  <ImagePickerFormData
                    defaultImage={coverLogo}
                    field={field}
                    setImageInput={setFormDataManual}
                    xFormData={formDataManual}
                    formName={'coverLogo'}
                  />
                </FormControl>
                <FormMessage />
                <div className="text-xs text-stone-600 pt-2 flex items-center gap-1">
                  <PiInfo /> Resimler için önerilen çözünürlük 1200x1200px ve önerilen boyut 5MB ve
                  altıdır.
                </div>
              </FormItem>
            </>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" variant={'primary'} className="text-sm">
            Kaydet
          </Button>
        </div>
      </form>
    </Form>
  );
}
