'use client';

import { startTransition, useState } from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { features } from '@/data/features';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PhoneInput } from '@/components/ui/phone-input';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import CountrySelect from '../ui/country-select';
import { onboard } from '@/actions/onboard';
import RegionSelect from '../ui/region-select';
import { ArrowRight } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Checkbox } from '../ui/checkbox';

const onboardSchema = z.object({
  venuename: z.string().min(1, 'İşletme adı boş olamaz'),
  phone: z.string().refine(isValidPhoneNumber, { message: 'Telefon numarası boş olamaz' }),
  country: z.string().min(1, 'Lütfen ülke seçiniz'),
  region: z.string().optional(),
  tablecount: z.string().optional(),
  features: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'En az bir özellik seçmelisiniz.',
  }),
});

export default function OnboardForm({ id }: { id: string }) {
  const [step, setStep] = useState('first');

  const form = useForm<z.infer<typeof onboardSchema>>({
    resolver: zodResolver(onboardSchema),
    defaultValues: {
      venuename: '',
      phone: '',
      country: '',
      region: '',
      tablecount: 'all',
      features: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof onboardSchema>) => {
    if (step === 'second') {
      startTransition(async () => {
        onboard(values, id);
      });
    }
  };

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(step);
    const result = await form.trigger(['venuename', 'phone', 'country']);
    if (result) {
      // console.log(step);
      setStep('second');
      return false;
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-8 flex flex-col flex-1 justify-between"
      >
        <div className={`${step === 'second' && 'invisible h-0'} space-y-8`}>
          <FormField
            name="venuename"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col items-start space-y-0">
                <FormLabel className="text-sm text-stone-700 mb-1.5">
                  İşletmenizin adı nedir?
                </FormLabel>
                <FormControl className="w-full">
                  <Input className="h-10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel className="text-left text-stone-700">Telefon Numaranız nedir?</FormLabel>
                <FormControl className="w-full">
                  <PhoneInput defaultCountry="TR" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel className="text-left text-stone-700">Hangi Ülkedesiniz?</FormLabel>
                <FormControl className="w-full">
                  <CountrySelect className="h-10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel className="text-left text-stone-700">Hangi Şehirdesiniz?</FormLabel>
                <FormControl className="w-full">
                  <RegionSelect
                    countryCode={form.getValues('country')}
                    className="h-10"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className={`${step === 'first' && 'invisible h-0'} flex-1`}>
          <FormField
            control={form.control}
            name="tablecount"
            render={({ field }) => (
              <FormItem className={`${step === 'first' && 'invisible h-0'} space-y-3`}>
                <FormLabel className="text-left text-stone-700">
                  İşletmenizdeki masa adeti nedir?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="small" />
                      </FormControl>
                      <FormLabel className="font-normal">5 - 20 adet Masa</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="medium" />
                      </FormControl>
                      <FormLabel className="font-normal">20 - 50 adet Masa</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="large" />
                      </FormControl>
                      <FormLabel className="font-normal">50&apos; den fazla</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="features"
            render={() => (
              <FormItem className={`${step === 'first' && 'h-0'} mt-8`}>
                <div className="mb-5">
                  <FormLabel className="text-left text-stone-700">
                    İşletmenizde hangi tür yemek veya içecek servisleri sunulmaktadır?
                  </FormLabel>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-[450px]">
                  {features.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="features"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter((value) => value !== item.id)
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{item.label}</FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h5 className="text-sm font-semibold text-stone-800  w-[79px]">
              Adım {`${step === 'first' ? '2 de 1' : '2 de 2'}`}
            </h5>
            <div className="flex space-x-4">
              <ol role="list" className="ml-8 flex items-center space-x-5">
                <li>
                  <a
                    className={`block h-2.5 w-2.5 rounded-full bg-orange-600 hover:bg-orange-900  ${
                      step === 'first' && 'outline-orange-200 outline outline-[3px]'
                    }`}
                  >
                    <span className="sr-only">Adım 1</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-current="step"
                    className={`relative flex items-center justify-center ${
                      step === 'second' &&
                      'h-2.5 w-2.5 rounded-full bg-orange-600 hover:bg-orange-900 outline-orange-200 outline outline-[3px]'
                    }`}
                  >
                    {step === 'first' && (
                      <span
                        aria-hidden="true"
                        className="relative block h-2.5 w-2.5 rounded-full bg-gray-200 hover:bg-gray-400"
                      />
                    )}
                    <span className="sr-only">Adım 2</span>
                  </a>
                </li>
              </ol>
            </div>
          </div>
          {step === 'first' ? (
            <>
              <>
                <Button
                  type="button"
                  onClick={handleContinue}
                  className="text-sm"
                  variant={'primary'}
                >
                  Devam Et
                  <ArrowRight />
                </Button>
              </>
            </>
          ) : (
            <>
              <Button className="text-sm" variant={'primary'}>
                Deneme Sürümünü Başlat
              </Button>
            </>
          )}
        </div>
      </form>
    </Form>
  );
}
