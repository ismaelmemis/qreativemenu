/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';

import { Figtree } from 'next/font/google';

const figtree = Figtree({
  subsets: ['latin-ext'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

import Image from 'next/image';

import { Dialog } from '@headlessui/react';
import { RiSearchLine } from 'react-icons/ri';
import { PiX } from 'react-icons/pi';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { PiEmpty } from 'react-icons/pi';

export default function SearchComponent({
  globalTheme,
  venueName,
  logo,
}: {
  globalTheme: string;
  venueName: string;
  logo: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(globalTheme);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className={`w-8 h-8 xs:w-12 xs:h-12 flex items-center justify-center rounded-full border ${
          theme === 'dark' ? 'border-stone-600' : 'border-stone-200'
        } cursor-pointer`}
      >
        <RiSearchLine
          className={`${theme === 'dark' ? 'text-stone-100' : 'text-stone-600'} size-3.5 xs:size-5`}
        />
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 transition ease-out"
      >
        <div
          className={`fixed flex flex-col inset-0 w-full lg:w-[432px] 2xl:w-[540px] mx-auto items-center justify-center ${
            theme === 'dark' ? 'bg-stone-900' : 'bg-white'
          } `}
        >
          <header
            className={`flex flex-row w-full p-3 xs:p-5 items-center ${
              theme === 'dark' ? 'bg-stone-900' : 'bg-white'
            } `}
          >
            <div className="flex"></div>
            <div className=" object-cover w-full h-[35px] xs:h-[55px] flex-1 relative">
              {logo ? (
                <Image
                  src={`/uploads/${logo}`}
                  alt="logo-venue"
                  fill
                  className="object-contain h-[35px] xs:h-[55px] pl-[32px] xs:pl-[48px]"
                />
              ) : (
                <div className="xs:h-[55px] pl-[32px] xs:pl-[48px] h-full xs:text-2xl font-semibold flex items-center justify-center text-orange-700">
                  <h1 className={`${figtree.className}`}>{venueName}</h1>
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <div
                onClick={() => setIsOpen(false)}
                className={`w-8 h-8 xs:w-12 xs:h-12 flex items-center justify-center rounded-full border ${
                  theme === 'dark' ? 'border-stone-600' : 'border-stone-200'
                } cursor-pointer`}
              >
                <PiX
                  className={`${
                    theme === 'dark' ? 'text-stone-100' : 'text-stone-600'
                  } size-3.5 xs:size-5`}
                />
              </div>
            </div>
          </header>
          <div></div>
          <div
            className={`flex flex-col flex-1 rounded-t-2xl w-full p-3 xs:p-5  ${
              theme === 'dark' ? 'bg-stone-800' : 'bg-stone-50'
            }`}
          >
            <div className="relative">
              <button
                type="submit"
                className="absolute left-3 top-0 bottom-4 mt-2 xs:mt-3.5 mr-4 z-50"
              >
                <PiMagnifyingGlass className="text-stone-600 size-3.5 xs:size-5" />
              </button>
              <input
                className="border-2 relative border-stone-200 w-full bg-white h-8 xs:h-12 shadow-[0px_0px_18px_-7px_rgba(0,_0,_0,_0.2)] pl-6 xs:pl-10 pr-2 rounded-md xs:rounded-lg text-[10px] xs:text-sm focus:border-stone-300 focus:outline-none"
                type="search"
                name="search"
                placeholder="Menüde ara..."
              />
            </div>
            <div className="mt-0 xs:mt-5 flex flex-col flex-1 justify-center items-center">
              <PiEmpty className="text-stone-400 size-6 xs:size-10 mx-auto" />
              <p className="text-stone-400 mx-auto text-[12px] xs:text-md w-[120px] text-center leading-snug mt-1">
                Aramanızla eşleşen bir ürün bulunamadı
              </p>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
