'use client';

import { useEffect, useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updateQR } from '@/lib/schemas';

import { ColorPicker } from '@/components/dashboard/qr/color-picker';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { PiCheck, PiCheckCircle, PiCopy, PiDownload, PiInfo, PiLightbulb } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import QRCodeStyling, { CornerDotType, CornerSquareType, DotType, Options } from 'qr-code-styling';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { updateQRAction } from '@/actions/menu';
import ImagePickerQR from '../menu/menu-forms/image-picker-qr';
import { toast } from 'sonner';

const qrCodePatternItems = [
  { value: 'square' as DotType, label: 'Kare', image: '/qr/squared.jpeg' },
  { value: 'rounded' as DotType, label: 'Yuvarlak', image: '/qr/rounded.jpeg' },
  { value: 'dots' as DotType, label: 'Noktalı', image: '/qr/dotted.jpeg' },
  { value: 'classy' as DotType, label: 'Elips', image: '/qr/ellipse.jpeg' },
  { value: 'extra-rounded' as DotType, label: 'Ekstra Yuvarlak', image: '/qr/extrarounded.jpeg' },
];

const qrCodeCornerItems = [
  { value: 'square' as CornerSquareType, label: 'Kare', image: '/qr/square-frame.jpeg' },
  { value: 'dot' as CornerSquareType, label: 'Yuvarlak', image: '/qr/round-frame.jpeg' },
  {
    value: 'extra-rounded' as CornerSquareType,
    label: 'Yuvarlatılmış',
    image: '/qr/rounded-frame.jpeg',
  },
];

const qrCodeCornerDotItems = [
  { value: 'square' as CornerDotType, label: 'Kare', image: '/qr/squared-dot.jpeg' },
  { value: 'dot' as CornerDotType, label: 'Nokta', image: '/qr/rounded-dot.jpeg' },
];

const qrCodeLogo = [
  { value: '', label: 'Logo Yok', image: '/qr/logo/no-logo.jpeg' },
  { value: '/qr/logo/facebook.svg', label: 'Facebook', image: '/qr/logo/facebook.svg' },
  { value: '/qr/logo/instagram.svg', label: 'Instagram', image: '/qr/logo/instagram.svg' },
  { value: '/qr/logo/whatsapp.svg', label: 'Whatsapp', image: '/qr/logo/whatsapp.svg' },
  { value: '/qr/logo/youtube.svg', label: 'Youtube', image: '/qr/logo/youtube.svg' },
  { value: '/qr/logo/messenger.svg', label: 'Messenger', image: '/qr/logo/messenger.svg' },
  { value: '/qr/logo/pinterest.svg', label: 'Pinterest', image: '/qr/logo/pinterest.svg' },
];

export default function QRCodeGenerator({
  settings,
  qrCodeId,
  qrCodeImage,
  venueSlug,
}: {
  settings: Options;
  qrCodeId: string;
  qrCodeImage: string;
  venueSlug: string;
}) {
  const [imageInput, setImageInput] = useState<FormData>(new FormData());

  console.log(qrCodeImage);

  const [selectedBgColor, setSelectedBgColor] = useState(
    settings?.backgroundOptions?.color || '#FFFFFF'
  );
  const [selectedColor, setSelectedColor] = useState(settings?.dotsOptions?.color || '#000000');
  const [selectedPattern, setSelectedPattern] = useState<DotType>(
    settings?.dotsOptions?.type ?? 'square'
  );
  const [selectedCornerSquare, setSelectedCornerSquare] = useState<CornerSquareType>(
    settings?.cornersSquareOptions?.type ?? 'square'
  );
  const [selectedCornerDot, setSelectedCornerDot] = useState<CornerDotType>(
    settings?.cornersDotOptions?.type ?? 'square'
  );

  const [selectedImage, setSelectedImage] = useState(settings?.image ?? '');

  const [copied, setCopied] = useState(false);
  const [copied2, setCopied2] = useState(false);

  console.log('qr-code-image', qrCodeImage);

  console.log('AYARLAR', settings);

  // 1. Define your form.
  const form = useForm<z.infer<typeof updateQR>>({
    resolver: zodResolver(updateQR),
  });

  const [options, setOptions] = useState<Options>(settings);
  console.log('Ayarlar', settings);

  // const [fileExt, setFileExt] = useState<FileExtension>('svg');
  const [qrCode, setQrCode] = useState<QRCodeStyling>(new QRCodeStyling(settings));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (qrCodeImage) {
      qrCodeLogo[7] = {
        value: `/api/qr/${qrCodeImage}`,
        label: 'Custom',
        image: `/api/qr/${qrCodeImage}`,
      };
    }
    setQrCode(new QRCodeStyling(settings));
  }, []);

  useEffect(() => {
    if (ref.current) {
      qrCode?.append(ref.current);
    }
  }, [qrCode, ref]);

  useEffect(() => {
    if (!qrCode) return;
    qrCode?.update(options);
  }, [qrCode, options]);

  useEffect(() => {
    setOptions((prevOpt) => {
      return {
        ...prevOpt,
        backgroundOptions: {
          color: selectedBgColor,
        },
      };
    });
  }, [selectedBgColor]);

  useEffect(() => {
    setOptions((prevOpt) => {
      return {
        ...prevOpt,
        dotsOptions: {
          color: selectedColor,
        },
      };
    });
  }, [selectedColor]);

  useEffect(() => {
    setOptions((prevOpt) => {
      return {
        ...prevOpt,
        dotsOptions: {
          type: selectedPattern,
        },
      };
    });
  }, [selectedPattern]);

  useEffect(() => {
    setOptions((prevOpt) => {
      return {
        ...prevOpt,
        cornersSquareOptions: {
          type: selectedCornerSquare,
        },
      };
    });
  }, [selectedCornerSquare]);

  useEffect(() => {
    setOptions((prevOpt) => {
      return {
        ...prevOpt,
        cornersDotOptions: {
          type: selectedCornerDot,
        },
      };
    });
  }, [selectedCornerDot]);

  useEffect(() => {
    setOptions((prevOpt) => {
      if (selectedImage === '') {
        return {
          ...prevOpt,
          image: undefined,
        };
      }

      return {
        ...prevOpt,
        image: `${selectedImage}`,
      };
    });
  }, [selectedImage]);

  useEffect(() => {
    qrCodeLogo[7] = {
      value: `/api/qr/${qrCodeImage}`,
      label: 'Custom',
      image: `/api/qr/${qrCodeImage}`,
    };
  }, [qrCodeImage]);

  const onDownloadClick = () => {
    if (!qrCode) return;
    qrCode.download({
      extension: 'svg',
    });
  };

  function handleSubmit() {
    if (imageInput.get('file')) {
      const file = imageInput.get('file');
      if (file instanceof File) {
        console.log(file.name);
        qrCodeLogo[7] = {
          value: `/api/qr/${file.name}`,
          label: 'Custom',
          image: `/api/qr/${file.name}`,
        };

        setOptions((prevOpt) => {
          return {
            ...prevOpt,
            image: `/api/qr/${file.name}`,
          };
        });
      }
    }

    updateQRAction(options, imageInput, qrCodeId);

    toast(
      <div className="flex items-center">
        <span className="text-emerald-600 text-[15px] flex items-center gap-2">
          <PiCheckCircle className="size-5" /> QR Kodunuz Güncellendi
        </span>
      </div>
    );
  }

  const valueToCopy = `https://qreativemenu.com/${venueSlug}`;

  const handleCopy = async () => {
    console.log('Kopyalandı...');

    try {
      await navigator.clipboard.writeText(valueToCopy);
      setCopied(true);
      console.log('Set Copy triggered...');
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleCopy2 = async () => {
    console.log('Kopyalandı...');

    try {
      await navigator.clipboard.writeText(valueToCopy);
      setCopied2(true);
      console.log('Set Copy triggered...');
      setTimeout(() => setCopied2(false), 2000); // Reset copied state after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="py-8 flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">QR Kod Düzenleyici</h2>
        </div>
      </div>
      <main className="bg-white rounded-md shadow-[-2px_11px_36px_0px_rgba(0,_0,_0,_0.05)] w-full px-6 py-6 mt-6">
        <div className="flex justify-between">
          <div className="w-3/5">
            <div>
              <h2 className="text-lg font-semibold">QR Kod Şablonu</h2>

              <div className="flex gap-3">
                <div className="flex flex-col">
                  <Label className="text-[15px] mb-1.5">Arkaplan Rengi seç</Label>
                  <ColorPicker initialColor={selectedBgColor} onChange={setSelectedBgColor} />
                </div>
                <div className="flex flex-col">
                  <Label className="text-[15px] mb-1.5">QR Kod Rengi seç</Label>
                  <ColorPicker initialColor={selectedColor} onChange={setSelectedColor} />
                </div>
              </div>
              <div className="mt-6">
                <Label className="text-[15px]">Desen Seç</Label>
                <RadioGroup className="flex gap-7 mt-1.5" defaultValue={options.dotsOptions?.type}>
                  {qrCodePatternItems.map((item) => (
                    <label key={`${item.value}`}>
                      <RadioGroupItem
                        id={`${item.value}`}
                        value={item.value}
                        className="peer sr-only after:absolute after:inset-0"
                        onClick={() => setSelectedPattern(item.value)}
                      />
                      <Image
                        src={item.image}
                        alt={item.label}
                        width={60}
                        height={60}
                        className="relative cursor-pointer overflow-hidden rounded-lg border border-input shadow-sm shadow-black/5 outline-offset-2 transition-colors peer-[:focus-visible]:outline peer-[:focus-visible]:outline-2 peer-[:focus-visible]:outline-ring/70 peer-data-[disabled]:cursor-not-allowed peer-data-[state=checked]:border-orange-600 peer-data-[state=checked]:bg-stone-50 peer-data-[disabled]:opacity-50 p-2"
                      />
                      <span className="group mt-2 flex items-center justify-center gap-1 peer-data-[state=unchecked]:text-stone-700/20">
                        <span className="text-[13px] font-medium">{item.label}</span>
                      </span>
                    </label>
                  ))}
                </RadioGroup>
              </div>
              <div className="mt-5">
                <Label className="text-[15px]">Köşe Kare Stilini Seç</Label>
                <RadioGroup
                  className="flex gap-7 mt-1.5"
                  defaultValue={options?.cornersSquareOptions?.type}
                >
                  {qrCodeCornerItems.map((item) => (
                    <label key={`${item.value}`}>
                      <RadioGroupItem
                        id={`${item.value}`}
                        value={item.value}
                        className="peer sr-only after:absolute after:inset-0"
                        onClick={() => setSelectedCornerSquare(item.value)}
                      />
                      <Image
                        src={item.image}
                        alt={item.label}
                        width={60}
                        height={60}
                        className="relative cursor-pointer overflow-hidden rounded-lg border border-input shadow-sm shadow-black/5 outline-offset-2 transition-colors peer-[:focus-visible]:outline peer-[:focus-visible]:outline-2 peer-[:focus-visible]:outline-ring/70 peer-data-[disabled]:cursor-not-allowed peer-data-[state=checked]:border-orange-600 peer-data-[state=checked]:bg-stone-50 peer-data-[disabled]:opacity-50 p-2"
                      />
                      <span className="group mt-2 flex items-center justify-center gap-1 peer-data-[state=unchecked]:text-stone-700/20">
                        <span className="text-[13px] font-medium">{item.label}</span>
                      </span>
                    </label>
                  ))}
                </RadioGroup>
              </div>
              <div className="mt-5">
                <Label className="text-[15px]">Köşe Nokta Stilini Seç</Label>
                <RadioGroup
                  className="flex gap-7 mt-1.5"
                  defaultValue={options?.cornersDotOptions?.type}
                >
                  {qrCodeCornerDotItems.map((item) => (
                    <label key={`${item.value}`}>
                      <RadioGroupItem
                        id={`${item.value}`}
                        value={item.value}
                        className="peer sr-only after:absolute after:inset-0"
                        onClick={() => setSelectedCornerDot(item.value)}
                      />
                      <Image
                        src={item.image}
                        alt={item.label}
                        width={60}
                        height={60}
                        className="relative cursor-pointer overflow-hidden rounded-lg border border-input shadow-sm shadow-black/5 outline-offset-2 transition-colors peer-[:focus-visible]:outline peer-[:focus-visible]:outline-2 peer-[:focus-visible]:outline-ring/70 peer-data-[disabled]:cursor-not-allowed peer-data-[state=checked]:border-orange-600 peer-data-[state=checked]:bg-stone-50 peer-data-[disabled]:opacity-50 p-2"
                      />
                      <span className="group mt-2 flex items-center justify-center gap-1 peer-data-[state=unchecked]:text-stone-700/20">
                        <span className="text-[13px] font-medium">{item.label}</span>
                      </span>
                    </label>
                  ))}
                </RadioGroup>
              </div>
              <div className="mt-5">
                <Label className="text-[15px]">Logo Ekle</Label>
                <RadioGroup className="flex gap-5 mt-1.5" defaultValue={options?.image}>
                  {qrCodeLogo.map((item) => (
                    <label key={`${item.value}`}>
                      <RadioGroupItem
                        id={`${item.value}`}
                        value={item.value}
                        className="peer sr-only after:absolute after:inset-0"
                        onClick={() => setSelectedImage(item.value)}
                      />
                      <Image
                        src={item.image}
                        alt={item.label}
                        width={50}
                        height={50}
                        className="relative w-[50px] h-[50px] cursor-pointer overflow-hidden rounded-lg border border-input shadow-sm shadow-black/5 outline-offset-2 transition-colors peer-[:focus-visible]:outline peer-[:focus-visible]:outline-2 peer-[:focus-visible]:outline-ring/70 peer-data-[disabled]:cursor-not-allowed peer-data-[state=checked]:border-orange-600 peer-data-[state=checked]:bg-stone-50 peer-data-[disabled]:opacity-50 p-2 object-contain"
                      />
                    </label>
                  ))}
                </RadioGroup>
                <div className="flex items-center gap-4 mt-3 mb-2 w-[540px]">
                  <Separator className="flex-1" />
                  <span className="text-muted-foreground text-sm">veya</span>
                  <Separator className="flex-1" />
                </div>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <>
                        <FormItem className="space-y-0.5">
                          <FormLabel>QR Resmi</FormLabel>
                          <FormControl>
                            <ImagePickerQR
                              field={field}
                              setImageInput={setImageInput}
                              containImage={true}
                              defaultImage={qrCodeImage}
                            />
                          </FormControl>
                          <div className="text-xs text-stone-600 pt-2 flex items-center gap-1">
                            <PiInfo /> Resimler için önerilen çözünürlük 1200x1200px ve önerilen
                            boyut 5MB ve altıdır.
                          </div>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                  <div className="flex justify-end mr-6 mt-6">
                    <Button
                      onClick={handleSubmit}
                      type="button"
                      variant={'primary'}
                      className="text-sm"
                    >
                      Kaydet
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
          <div className="w-2/5 rounded-lg bg-stone-50 py-5 px-6 max-w-[480px]">
            <div className="flex flex-col justify-center items-center gap-6">
              <div
                style={{ backgroundColor: selectedBgColor }}
                className={`relative w-40 h-40 border border-stone-200 shadow-md rounded-lg`}
              >
                {/* <Image
                  src={'/qreativemenu.png'}
                  alt="qreative-qr"
                  className="size-40 rounded-xl"
                  fill
                /> */}
                <div
                  ref={ref}
                  className={`rounded-lg flex items-center justify-center bg-[${selectedBgColor}] max-w-[150px] max-h-[150px] mx-auto mt-1 p-2`}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={onDownloadClick}
                  variant={'primary'}
                  className="text-sm"
                >
                  <PiDownload /> QR Kodu İndir
                </Button>
                <Button
                  onClick={handleCopy2}
                  type="button"
                  variant={'ghost'}
                  className="text-sm h-9"
                >
                  {copied2 ? (
                    <>
                      <PiCheck /> Link Kopyalandı
                    </>
                  ) : (
                    <>
                      <PiCopy /> Linki Kopyala
                    </>
                  )}
                </Button>
              </div>
              <div className="border border-orange-600 p-3 rounded-lg bg-orange-600/10 mt-6 max-w-[450px]">
                <div className="flex items-center gap-1">
                  <PiLightbulb className="text-orange-700 size-3.5" />
                  <span className="text-sm font-medium text-orange-700">İpucu</span>
                </div>
                <div>
                  <p className="text-[13px] mt-2 text-stone-800">
                    Aşağıdaki linki sosyal medya hesaplarınızda paylaşıp daha fazla müşterilere
                    ulaşabilirsiniz.
                  </p>
                </div>
                <div className="flex items-center mt-4 gap-2">
                  <Input
                    disabled
                    className="h-9 bg-stone-100 text-stone-500 md:text-[12px]"
                    value={`https://qreativemenu.com/${venueSlug}`}
                  />
                  <Button
                    onClick={handleCopy}
                    type="button"
                    variant={'ghost'}
                    className="text-sm h-9"
                  >
                    {copied ? (
                      <>
                        <PiCheck /> Link Kopyalandı
                      </>
                    ) : (
                      <>
                        <PiCopy /> Linki Kopyala
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
