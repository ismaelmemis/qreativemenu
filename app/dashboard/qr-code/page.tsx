'use client';

import { useState } from 'react';

import { ColorPicker } from '@/components/dashboard/qr/color-picker';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { PiCopy, PiDownload, PiInfo, PiLightbulb, PiUploadSimple } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const qrCodePatternItems = [
  { value: 'squared', label: 'Kare', image: '/qr/squared.jpeg' },
  { value: 'rounded', label: 'Yuvarlak', image: '/qr/rounded.jpeg' },
  { value: 'dotted', label: 'Noktalı', image: '/qr/dotted.jpeg' },
  { value: 'ellipse', label: 'Elips', image: '/qr/ellipse.jpeg' },
  { value: 'extrarounded', label: 'Ekstra Yuvarlak', image: '/qr/extrarounded.jpeg' },
];

const qrCodeCornerItems = [
  { value: 'roundframe', label: 'Yuvarlak', image: '/qr/round-frame.jpeg' },
  { value: 'squareframe', label: 'Kare', image: '/qr/square-frame.jpeg' },
  { value: 'roundedframe', label: 'Yuvarlatılmış', image: '/qr/rounded-frame.jpeg' },
];

const qrCodeCornerDotItems = [
  { value: 'roundcornerdot', label: 'Logo Yok', image: '/qr/rounded-dot.jpeg' },
  { value: 'squarecornerdot', label: 'Kare', image: '/qr/squared-dot.jpeg' },
];

const qrCodeLogo = [
  { value: 'nologo', label: 'Logo Yok', image: '/qr/logo/no-logo.jpeg' },
  { value: 'facebook', label: 'Facebook', image: '/qr/logo/facebook.svg' },
  { value: 'instagram', label: 'Instagram', image: '/qr/logo/instagram.svg' },
  { value: 'whatsapp', label: 'Whatsapp', image: '/qr/logo/whatsapp.svg' },
  { value: 'youtube', label: 'Youtube', image: '/qr/logo/youtube.svg' },
  { value: 'messenger', label: 'Messenger', image: '/qr/logo/messenger.svg' },
  { value: 'pinterest', label: 'Pinterest', image: '/qr/logo/pinterest.svg' },
];

export default function QRCode() {
  const [selectedBgColor, setSelectedBgColor] = useState('#FFFFFF');
  const [selectedColor, setSelectedColor] = useState('#000000');

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
              <form className="mt-4 flex flex-col">
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
                  <RadioGroup className="flex gap-7 mt-1.5" defaultValue="1">
                    {qrCodePatternItems.map((item) => (
                      <label key={`${item.value}`}>
                        <RadioGroupItem
                          id={`${item.value}`}
                          value={item.value}
                          className="peer sr-only after:absolute after:inset-0"
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
                  <Label className="text-[15px]">Köşe Stilini Seç</Label>
                  <RadioGroup className="flex gap-7 mt-1.5" defaultValue="1">
                    {qrCodeCornerItems.map((item) => (
                      <label key={`${item.value}`}>
                        <RadioGroupItem
                          id={`${item.value}`}
                          value={item.value}
                          className="peer sr-only after:absolute after:inset-0"
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
                  <Label className="text-[15px]">Köşe Stilini Seç</Label>
                  <RadioGroup className="flex gap-7 mt-1.5" defaultValue="1">
                    {qrCodeCornerDotItems.map((item) => (
                      <label key={`${item.value}`}>
                        <RadioGroupItem
                          id={`${item.value}`}
                          value={item.value}
                          className="peer sr-only after:absolute after:inset-0"
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
                  <RadioGroup className="flex gap-5 mt-1.5" defaultValue="1">
                    {qrCodeLogo.map((item) => (
                      <label key={`${item.value}`}>
                        <RadioGroupItem
                          id={`${item.value}`}
                          value={item.value}
                          className="peer sr-only after:absolute after:inset-0"
                        />
                        <Image
                          src={item.image}
                          alt={item.label}
                          width={50}
                          height={50}
                          className="relative cursor-pointer overflow-hidden rounded-lg border border-input shadow-sm shadow-black/5 outline-offset-2 transition-colors peer-[:focus-visible]:outline peer-[:focus-visible]:outline-2 peer-[:focus-visible]:outline-ring/70 peer-data-[disabled]:cursor-not-allowed peer-data-[state=checked]:border-orange-600 peer-data-[state=checked]:bg-stone-50 peer-data-[disabled]:opacity-50 p-2"
                        />
                      </label>
                    ))}
                  </RadioGroup>
                  <div className="flex items-center gap-4 mt-3 mb-2 w-[470px]">
                    <Separator className="flex-1" />
                    <span className="text-muted-foreground text-sm">veya</span>
                    <Separator className="flex-1" />
                  </div>
                </div>
                <div className="space-y-0.5">
                  <input type="file" className="hidden" />
                  <div className="border border-dashed rounded-lg cursor-pointer px-[3px] border-stone-300 w-[140px] h-[124px] flex items-center justify-center flex-col">
                    <PiUploadSimple className="text-orange-700 size-6 mb-2" />
                    <h3 className="font-medium">Yükle</h3>
                    <span className="text-stone-400 text-xs text-center">
                      Sadece .jpg .jpeg ve .png dosya uzantıları
                    </span>
                  </div>
                  <div className="text-xs text-stone-600 pt-2 flex items-center gap-1">
                    <PiInfo /> Resimler için önerilen çözünürlük 1200x1200px ve önerilen boyut 5MB
                    ve altıdır.
                  </div>
                </div>
                <div className="flex justify-end mr-6 mt-6">
                  <Button type="button" variant={'primary'} className="text-sm">
                    Kaydet
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="w-2/5 rounded-lg bg-stone-50 py-5 px-6 max-w-[480px]">
            <div className="flex flex-col justify-center items-center gap-6">
              <div className="relative size-40 border border-stone-200 shadow-md rounded-lg">
                <Image
                  src={'/qreativemenu.png'}
                  alt="qreative-qr"
                  className="size-40 rounded-xl"
                  fill
                />
              </div>
              <div className="flex gap-3">
                <Button type="button" variant={'primary'} className="text-sm">
                  <PiDownload /> QR Kodu İndir
                </Button>
                <Button type="button" variant={'ghost'} className="text-sm h-9">
                  <PiCopy /> Linki Kopyala
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
                    value={'https://qreativemenu.com/danielgallegos'}
                  />
                  <Button type="button" variant={'ghost'} className="text-sm h-9">
                    <PiCopy /> Linki Kopyala
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
