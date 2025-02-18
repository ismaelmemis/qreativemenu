'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updatePasswordSettings } from '@/lib/schemas';
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
import { updatePasswordAction } from '@/actions/menu';
import { useState } from 'react';
import { PiCheckCircle } from 'react-icons/pi';
import { toast } from 'sonner';

export default function PasswordChangeForm({ userId }: { userId: string }) {
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // 1. Define your form.
  const form = useForm<z.infer<typeof updatePasswordSettings>>({
    resolver: zodResolver(updatePasswordSettings),
    defaultValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof updatePasswordSettings>) {
    const message = await updatePasswordAction(values, userId);
    if (message) {
      setPasswordError(message?.error);
    }

    toast(
      <div className="flex items-center">
        <span className="text-emerald-600 text-[15px] flex items-center gap-2">
          <PiCheckCircle className="size-5" /> Şifreniz Değiştirildi
        </span>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <>
              <FormItem className="space-y-0.5">
                <FormLabel className="text-base text-[15px]">Şifreniz</FormLabel>
                <FormControl>
                  <FormControl>
                    <Input type="password" placeholder="************" {...field} />
                  </FormControl>
                </FormControl>

                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <>
              <FormItem className="space-y-0.5">
                <FormLabel className="text-base text-[15px]">Yeni Şifre</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="yeni şifrenizi girin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <>
              <FormItem className="space-y-0.5">
                <FormLabel className="text-base text-[15px]">Yeni Şifre Tekrarı</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="yeni şifrenizi tekrar girin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        {passwordError && (
          <div className="bg-red-200 border-red-500 text-red-700 p-2 rounded-lg text-sm">
            {passwordError}
          </div>
        )}

        <div className="mt-1 flex justify-end">
          <Button type="submit" variant={'primary'} className="text-sm">
            Kaydet
          </Button>
        </div>
      </form>
    </Form>
  );
}
