'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updateBranchWifiSettings } from '@/lib/schemas';
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
import { updateBranchWifi } from '@/actions/menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PiCheckCircle } from 'react-icons/pi';
import { toast } from 'sonner';

const encryptionTypes = [
  { id: 'WPA', value: 'WPA' },
  { id: 'WEP', value: 'WEP' },
  { id: 'WPA-EAP', value: 'WPA-EAP' },
  { id: 'None', value: 'None' },
];

export default function WifiForm({ venueData }: { venueData: Venue }) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof updateBranchWifiSettings>>({
    resolver: zodResolver(updateBranchWifiSettings),
    defaultValues: {
      name: venueData?.wifiAddress || undefined,
      password: venueData?.wifiPassword || undefined,
      encryption: venueData?.wifiProtocol || 'WPA',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof updateBranchWifiSettings>) {
    updateBranchWifi(values, venueData.id);

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
          name="name"
          render={({ field }) => (
            <>
              <FormItem className="space-y-0.5">
                <FormLabel className="text-base text-[15px]">Ağ Adı</FormLabel>
                <FormControl>
                  <FormControl>
                    <Input placeholder="Örneğin Wi-Fi Adı" {...field} />
                  </FormControl>
                </FormControl>

                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <>
              <FormItem className="space-y-0.5">
                <FormLabel className="text-base text-[15px]">Ağ Şifresi</FormLabel>
                <FormControl>
                  <Input placeholder="Örneğin Kablosuz Ağ Şifresi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="encryption"
          render={({ field }) => (
            <>
              <FormItem className="space-y-0.5">
                <FormLabel className="text-base text-[15px]">Şifreleme Tipi</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="h-11 placeholder:text-stone-500 w-72">
                      <SelectValue placeholder="Şifreleme Tipi Seç" />
                    </SelectTrigger>
                    <SelectContent className="w-72">
                      {encryptionTypes.map((enc) => {
                        return (
                          <SelectItem key={enc.id} value={enc.value}>
                            {enc.value}
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
