'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { createTableSchema } from '@/lib/schemas';

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

import { PiPicnicTable, PiChair } from 'react-icons/pi';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createTable } from '@/actions/menu';

import { Venue } from '@prisma/client';

type TableArea = {
  id: string;
  name: string;
};

export default function CreateTableArea({
  tableAreas,
  venue,
}: {
  tableAreas: TableArea[];
  venue: Venue;
}) {
  const [open, setOpen] = useState(false);

  // 1. Define your form with initial values
  const form = useForm<z.infer<typeof createTableSchema>>({
    resolver: zodResolver(createTableSchema),
    defaultValues: {
      name: '',
      capacity: 1, // Provide an initial value for capacity
    },
  });

  function onSubmit(values: z.infer<typeof createTableSchema>) {
    createTable(values, venue);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={'primary'}
          className="text-[14px] font-medium h-9 bg-white border border-stone-200 text-stone-800 hover:bg-stone-50"
        >
          <PiPicnicTable /> Masa Ekle
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b border-border px-6 py-4 text-base font-medium text-stone-800">
            Yeni Masa Ekle
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
                    Masa Adı <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Masa 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tableArea"
              render={({ field }) => (
                <>
                  <FormItem className="space-y-0.5 px-5">
                    <FormLabel>
                      Masa Alanı Adı <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="h-11 placeholder:text-stone-500 ">
                          <SelectValue placeholder="Masa Alanı Seç" />
                        </SelectTrigger>
                        <SelectContent>
                          {tableAreas.map((area) => {
                            return (
                              <SelectItem key={area.id} value={area.id}>
                                {area.name}
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
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem className="space-y-0.5 px-5">
                  <FormLabel className="text-[15px]">
                    Masa Kapasitesi <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex rounded-lg shadow-sm shadow-black/5">
                      <span className="-z-10 inline-flex items-center rounded-s-lg border border-input bg-stone-100 px-3 text-sm text-stone-800">
                        <PiChair className="size-4" />
                      </span>
                      <Input
                        min={1}
                        type="number"
                        className="-ms-px rounded-s-none shadow-none h-9 w-[80px]"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        value={field.value || ''} // Ensure value is never undefined
                      />
                    </div>
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
