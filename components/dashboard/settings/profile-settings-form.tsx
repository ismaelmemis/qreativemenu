'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updateProfileSettingsAction } from '@/actions/menu';
import { updateProfileSettings } from '@/lib/schemas';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import AvatarImagePicker from '../menu/menu-forms/avatar-image-picker';
import { User } from '@prisma/client';
import { toast } from 'sonner';
import { PiCheckCircle } from 'react-icons/pi';

export default function ProfileSettingsForm({ user }: { user: User }) {
  const [imageInput, setImageInput] = useState<FormData>(new FormData());

  // 1. Define your form.
  const form = useForm<z.infer<typeof updateProfileSettings>>({
    resolver: zodResolver(updateProfileSettings),
    defaultValues: {
      username: user.name || undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof updateProfileSettings>) {
    const { username } = values;
    const formValues = { username };

    console.log(imageInput);

    updateProfileSettingsAction(formValues, imageInput, user.id);

    toast(
      <div className="flex items-center">
        <span className="text-emerald-600 text-[15px] flex items-center gap-2">
          <PiCheckCircle className="size-5" /> Ayarlarınız kaydedildi
        </span>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <>
              <FormItem className="space-y-4">
                <FormLabel className="text-base text-[15px] mb-2">Profil Resmi</FormLabel>
                <div className="flex gap-14 items-center">
                  <FormControl>
                    {/* <ImagePicker
                    field={field}
                    setImageInput={setImageInput}
                    containImage={true}
                    defaultImage={venueData.logo}
                  /> */}
                    <AvatarImagePicker
                      field={field}
                      setImageInput={setImageInput}
                      defaultImage={user.image}
                    />
                  </FormControl>
                  <p className="text-[14px] w-72 text-stone-600 text-left">
                    Önerilen boyut: <span className="text-orange-600">300px X 300px</span>{' '}
                    Desteklenen biçim: jpg, jpeg, png Maksimum boyut:{' '}
                    <span className="text-orange-600">2mb</span>
                  </p>
                </div>
                <FormMessage />
              </FormItem>
            </>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <>
              <FormItem className="space-y-0.5">
                <FormLabel className="text-base text-[15px]">Kullanıcı Adı</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <div className="space-y-1">
          <Label htmlFor="venuename" className="text-[15px]">
            Kullanıcı E-Posta Adresi
          </Label>
          <Input type="text" disabled readOnly value={user?.email ?? ''} />
        </div>
        <div className="mt-1 flex justify-end">
          <Button type="submit" variant={'primary'} className="text-sm">
            Kaydet
          </Button>
        </div>
      </form>
    </Form>
  );
}
