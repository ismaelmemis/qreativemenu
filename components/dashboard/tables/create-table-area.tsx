'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { createTableAreaSchema } from '@/lib/schemas';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { PiSquaresFour } from 'react-icons/pi';
import { createTableArea } from '@/actions/menu';

export default function CreateTableArea({ venueId }: { venueId: string }) {
  const [open, setOpen] = useState(false);

  // 1. Define your form with initial values
  const form = useForm<z.infer<typeof createTableAreaSchema>>({
    resolver: zodResolver(createTableAreaSchema),
    defaultValues: {
      name: '',
    },
  });

  function onSubmit(values: z.infer<typeof createTableAreaSchema>) {
    createTableArea(values, venueId);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={'primary'}
          className="text-[14px] font-medium h-9 bg-white border border-stone-200 text-stone-800 hover:bg-stone-50"
        >
          <PiSquaresFour /> Masa Alanı Ekle
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b border-border px-6 py-4 text-base font-medium text-stone-800">
            Masa Alanı Ekle
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-0.5 px-5">
                  <FormLabel className="text-[15px]">
                    Masa Alanı Adı <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Alt Salon" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className="border-t border-border py-4 sm:items-center px-5">
          <Button
            type="button"
            variant={'primary'}
            className="text-sm"
            onClick={form.handleSubmit(onSubmit)}
          >
            Kaydet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
