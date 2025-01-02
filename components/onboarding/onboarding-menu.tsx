'use client';

import { Input } from '@/components/ui/input';
import { ImageUpload } from '@/components/onboarding/image-upload';

import { ChevronDown, ChevronUp, Image } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';

import { onboardingStepOne } from '@/actions/onboard';

export function OnboardingMenu({
  username,
  venuename,
  venueId,
}: {
  username: string;
  venuename: string | undefined;
  venueId: string | undefined;
}) {
  const [productMode, setProductMode] = useState(false);

  const [firstCategory, setFirstCategory] = useState('Kategori Başlığı 1');
  const [firstCategoryDescription, setFirstCategoryDescription] = useState('Kategori Açıklaması 1');
  const [firstCategoryImage, setFirstCategoryImage] = useState('');

  const [secondCategory, setSecondCategory] = useState('Kategori Başlığı 2');
  const [secondCategoryDescription, setSecondCategoryDescription] =
    useState('Kategori Açıklaması 2');
  const [secondCategoryImage, setSecondCategoryImage] = useState('');

  const [firstProduct, setFirstProduct] = useState('Ürün Başlığı 1');
  const [firstProductDescription, setFirstProductDescription] = useState('Ürün Açıklaması 1');
  const [firstProductImage, setFirstProductImage] = useState('');

  const [secondProduct, setSecondProduct] = useState('Ürün Başlığı 2');
  const [secondProductDescription, setSecondProductDescription] = useState('Ürün Açıklaması 2');
  const [secondProductImage, setSecondProductImage] = useState('');

  const onboardingStepOneAction = onboardingStepOne.bind(null, venuename, venueId);

  return (
    <>
      <div className="w-3/5 flex-1 flex flex-col mt-12">
        <div className="">
          <h1 className="text-[30px] font-semibold text-stone-800">
            Merhaba {username} 👋 Menünü Oluştur
          </h1>
          <p className="text-stone-600 text-[16px] leading-relaxed mt-1">
            İlk kategorinizi tanımlayalım ardından ürünlerinizi isim, resim ve fiyat bilgileri ile
            ekleyelim. Elbette dilediğiniz zaman yönetim panelinizden menülerinize yeni kategoriler
            ve ürünler ekleyebilirsiniz.
          </p>
        </div>
        <div className="mt-8">
          {/* Accordion Area */}
          <div>
            <div className="rounded-sm flex px-4 py-3 justify-between bg-white items-center">
              <div className="flex items-center gap-3">
                <ImageUpload setCategoryImage={setFirstCategoryImage} />
                <div>
                  <Input
                    onChange={(e) => setFirstCategory(e.target.value)}
                    type="text"
                    value={firstCategory}
                    className="border-none md:text-base font-medium p-0 h-6 outline-none focus-visible:ring-0 shadow-none"
                  />
                  {/* <h2 className="font-medium mb-1">Kategori Başlığı 1</h2> */}
                  <Input
                    onChange={(e) => setFirstCategoryDescription(e.target.value)}
                    className="border-none p-0 h-6 outline-none focus-visible:ring-0 md:text-sm text-stone-600 shadow-none"
                    value={firstCategoryDescription}
                  />
                </div>
              </div>
              <div>
                <ChevronDown className="cursor-pointer" />
              </div>
            </div>
            <div className="w-11/12 flex flex-col ml-auto">
              <div className="rounded-sm flex flex-1 px-4 py-2.5 mt-2 justify-between bg-white items-center">
                <div className="flex items-center gap-3">
                  <ImageUpload setCategoryImage={setFirstProductImage} />
                  <div>
                    <Input
                      onChange={(e) => setFirstProduct(e.target.value)}
                      type="text"
                      value={firstProduct}
                      className="border-none md:text-base font-medium p-0 h-6 outline-none focus-visible:ring-0 shadow-none"
                    />
                    <Input
                      onChange={(e) => setFirstProductDescription(e.target.value)}
                      className="border-none p-0 h-6 outline-none focus-visible:ring-0 md:text-sm text-stone-600 shadow-none"
                      value={firstProductDescription}
                    />
                  </div>
                </div>
                <div></div>
              </div>
              <div className="rounded-sm flex flex-1 px-4 py-2.5 mt-2 justify-between bg-white items-center">
                <div className="flex items-center gap-3">
                  <ImageUpload setCategoryImage={setSecondProductImage} />
                  <div>
                    <Input
                      onChange={(e) => setSecondProduct(e.target.value)}
                      type="text"
                      value={secondProduct}
                      className="border-none md:text-base font-medium p-0 h-6 outline-none focus-visible:ring-0 shadow-none"
                    />
                    <Input
                      onChange={(e) => setSecondProductDescription(e.target.value)}
                      className="border-none p-0 h-6 outline-none focus-visible:ring-0 md:text-sm text-stone-600 shadow-none"
                      value={secondProductDescription}
                    />
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <div className="rounded-sm flex px-4 py-3 justify-between bg-white items-center">
              <div className="flex items-center gap-3">
                <ImageUpload setCategoryImage={setSecondCategoryImage} />
                <div>
                  <Input
                    onChange={(e) => setSecondCategory(e.target.value)}
                    type="text"
                    value={secondCategory}
                    className="border-none md:text-base font-medium p-0 h-7 outline-none focus-visible:ring-0"
                  />
                  {/* <h2 className="font-medium mb-1">Kategori Başlığı 2</h2> */}
                  <Input
                    onChange={(e) => setSecondCategoryDescription(e.target.value)}
                    className="border-none p-0 h-6 outline-none focus-visible:ring-0 md:text-sm text-stone-600 shadow-none"
                    value={secondCategoryDescription}
                  />
                </div>
              </div>
              <div>
                <ChevronUp className="cursor-pointer" />
              </div>
            </div>
            {/* <div className="w-11/12 flex flex-col ml-auto">
              <div className="rounded-sm flex flex-1 px-4 py-2.5 mt-2 justify-between bg-white items-center">
                <div className="flex items-center gap-3">
                  <ImageUpload />
                  <div>
                    <h2 className="font-medium mb-1">Ürün Başlığı 1</h2>
                    <p className="text-sm text-stone-600">Ürün Açıklaması 1</p>
                  </div>
                </div>
                <div></div>
              </div>
              <div className="rounded-sm flex flex-1 px-4 py-2.5 mt-2 justify-between bg-white items-center">
                <div className="flex items-center gap-3">
                  <ImageUpload />
                  <div>
                    <h2 className="font-medium mb-1">Ürün Başlığı 1</h2>
                    <p className="text-sm text-stone-600">Ürün Açıklaması 1</p>
                  </div>
                </div>
                <div></div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="flex justify-end">
          <form action={onboardingStepOneAction}>
            <Button type="submit" variant={'primary'} className="mt-8">
              Devam Et
            </Button>
          </form>
        </div>
      </div>
      <div className="w-2/5 flex mt-7 2xl:mt-28 justify-end relative">
        <Switch
          checked={productMode}
          onCheckedChange={(checked: boolean) => setProductMode(checked)}
          className="absolute left-[76px] top-2"
        />
        <div className="mobile-phone relative">
          <div className="brove">
            <span className="speaker"></span>
          </div>
          <div className="screen">
            <header className="mx-auto bg-white h-[92px]">
              <h1 className="text-center pt-10 text-[22px] text-orange-600 font-semibold">
                {venuename || 'Mekan Adı'}
              </h1>
            </header>
            {/* PRODUCT MODE */}
            {productMode ? (
              <div className="flex flex-col gap-y-3 p-3">
                <div className="bg-white flex flex-1 rounded-md p-2">
                  <div
                    className={`rounded-md ${
                      !firstProductImage && 'border border-stone-200'
                    } flex items-center justify-center border-stone-300 w-[115px] h-[110px]`}
                  >
                    {firstProductImage ? (
                      <img
                        className="rounded-md object-cover w-full h-full"
                        src={firstProductImage}
                      />
                    ) : (
                      <Image className="text-stone-600" />
                    )}
                  </div>
                  <div className=" ml-3 flex flex-col justify-between">
                    <div className="flex">
                      <div className="bg-amber-200/80 py-1 px-2.5 flex rounded-lg text-[12px] font-medium">
                        {firstCategory}
                      </div>
                    </div>
                    <div className="">
                      <h1 className="font-semibold text-[17px] leading-tight">{firstProduct}</h1>
                    </div>
                    <div className="pricing">80₺</div>
                  </div>
                </div>
                <div className="bg-white flex flex-1 rounded-md p-2">
                  <div
                    className={`rounded-md ${
                      !secondProductImage && 'border border-stone-200'
                    } flex items-center justify-center border-stone-300 w-[115px] h-[110px]`}
                  >
                    {secondProductImage ? (
                      <img
                        className="rounded-md object-cover w-full h-full"
                        src={secondProductImage}
                      />
                    ) : (
                      <Image className="text-stone-600" />
                    )}
                  </div>
                  <div className=" ml-3 flex flex-col justify-between">
                    <div className="flex">
                      <div className="bg-amber-200/80 py-1 px-2.5 flex rounded-lg text-[12px] font-medium">
                        {firstCategory}
                      </div>
                    </div>
                    <div className="">
                      <h1 className="font-semibold text-[17px] leading-tight">{secondProduct}</h1>
                    </div>
                    <div className="pricing">80₺</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex gap-x-3 p-3">
                <div className="flex-1 rounded-md bg-white">
                  <div
                    className={`rounded-sm ${
                      !firstCategoryImage && 'border border-stone-300'
                    } m-2 flex justify-center items-center h-32`}
                  >
                    {firstCategoryImage ? (
                      // eslint-disable-next-line jsx-a11y/alt-text
                      <img
                        className="rounded-sm object-cover w-full h-full"
                        src={firstCategoryImage}
                      />
                    ) : (
                      <Image className="text-stone-600" />
                    )}
                  </div>
                  <div className="flex justify-center font-medium text-sm mt-1.5 mb-1.5">
                    <h2 className="uppercase text-xs font-semibold">{firstCategory}</h2>
                  </div>
                </div>
                <div className="flex-1 rounded-md bg-white">
                  <div
                    className={`rounded-sm ${
                      !secondCategoryImage && 'border border-stone-300'
                    } m-2 flex justify-center items-center h-32`}
                  >
                    {secondCategoryImage ? (
                      <img
                        className="rounded-sm object-cover w-full h-full"
                        src={secondCategoryImage}
                      />
                    ) : (
                      <Image className="text-stone-600" />
                    )}
                  </div>
                  <div className="flex justify-center font-medium text-sm mt-1.5 mb-1.5">
                    <h2 className="uppercase text-xs font-semibold">{secondCategory}</h2>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
