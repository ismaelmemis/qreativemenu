'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updateBranchContactSettings } from '@/lib/schemas';
import { Venue } from '@prisma/client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { updateBranchContact } from '@/actions/menu';
import { toast } from 'sonner';
import { PiCheckCircle } from 'react-icons/pi';

export default function ContactForm({ venueData }: { venueData: Venue }) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof updateBranchContactSettings>>({
    resolver: zodResolver(updateBranchContactSettings),
    defaultValues: {
      email: venueData?.email || undefined,
      telephone: venueData.phone || undefined,
      whatsapp: venueData.whatsapp || undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof updateBranchContactSettings>) {
    updateBranchContact(values, venueData.id);
    toast(
      <div className="flex items-center">
        <span className="text-emerald-600 text-[15px] flex items-center gap-2">
          <PiCheckCircle className="size-5" /> Ayarlarınız Kaydedildi
        </span>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <>
              <FormItem className="space-y-0.5">
                <FormLabel className="text-base text-[15px]">İşletme Mail Adresi</FormLabel>
                <FormControl>
                  <FormControl>
                    <Input placeholder="E-Posta Adresi girin..." {...field} />
                  </FormControl>
                </FormControl>

                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="telephone"
          render={({ field }) => (
            <>
              <FormItem className="space-y-0.5">
                <FormLabel className="text-base text-[15px]">Telefon Numarası</FormLabel>
                <FormControl>
                  <Input placeholder="+90 525 525 50 50" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <>
              <FormItem className="space-y-0.5">
                <FormLabel className="text-base text-[15px]">Whatsapp Numarası</FormLabel>
                <FormControl>
                  <Input placeholder="+90 525 525 50 50" {...field} />
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
