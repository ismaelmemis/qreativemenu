/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import Link from 'next/link';

import { RiHome6Line } from 'react-icons/ri';
import { RiInformationLine } from 'react-icons/ri';
import { RiNotificationLine } from 'react-icons/ri';

import { PiBookOpenText } from 'react-icons/pi';
import { PiGlobeHemisphereWest } from 'react-icons/pi';

import { usePathname, useSearchParams } from 'next/navigation';
import { db } from '@/lib/db';

export default function MenuBottom({
  venueSlug,
  menuId,
  theme,
}: {
  venueSlug: string;
  menuId: string;
  theme: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div
      className={`w-full lg:w-[432px] 2xl:w-[540px] h-[54px] xs:h-[77px] rounded-tl-2xl rounded-tr-2xl fixed bottom-0 z-50 -translate-x-1/2 left-1/2 ${
        theme === 'dark' ? 'bg-stone-900 text-white' : 'bg-white border-t border-gray-200  '
      } `}
    >
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        <Link
          href={
            searchParams.get('table')
              ? `/${venueSlug}?table=${searchParams.get('table')}`
              : `/${venueSlug}`
          }
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 group"
        >
          <RiHome6Line
            className={`${
              pathname === '/' + venueSlug
                ? 'text-orange-600'
                : `${theme === 'dark' ? 'text-white' : 'text-stone-600'}`
            } w-3.5 h-3.5 xs:w-6 xs:h-6`}
          />
          <span
            className={`text-[9px] xs:text-[11px] mt-0.5 ${
              pathname === '/' + venueSlug
                ? 'text-orange-600'
                : `${theme === 'dark' ? 'text-white' : 'text-stone-600'}`
            }`}
          >
            Home
          </span>
        </Link>
        <Link
          href={
            searchParams.get('table')
              ? `/${venueSlug}/info?table=${searchParams.get('table')}`
              : `/${venueSlug}/info`
          }
          type="button"
          className="inline-flex flex-col items-center justify-center px-5  group"
        >
          <RiInformationLine
            className={`${
              pathname.includes('info')
                ? 'text-orange-600'
                : `${theme === 'dark' ? 'text-white' : 'text-stone-600'}`
            } w-3.5 h-3.5 xs:w-6 xs:h-6`}
          />
          <span
            className={`text-[9px] xs:text-[11px] mt-0.5 ${
              pathname.includes('info') && 'text-orange-600'
            }`}
          >
            İnfo
          </span>
        </Link>
        <Link
          href={
            searchParams.get('table')
              ? `/${venueSlug}/menu/${menuId}?table=${searchParams.get('table')}`
              : `/${venueSlug}/menu/${menuId}`
          }
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 group"
        >
          <PiBookOpenText
            className={`${
              pathname.includes('menu')
                ? 'text-orange-600'
                : `${theme === 'dark' ? 'text-white' : 'text-stone-600'}`
            } w-3.5 h-3.5 xs:w-6 xs:h-6`}
          />
          <span
            className={`text-[9px] xs:text-[11px] mt-0.5 ${
              pathname.includes('menu') && 'text-orange-600'
            }`}
          >
            Menü
          </span>
        </Link>
        <Link
          href={
            searchParams.get('table')
              ? `/${venueSlug}/call?table=${searchParams.get('table')}`
              : `/${venueSlug}/call`
          }
          type="button"
          className="inline-flex flex-col items-center justify-center px-5  group"
        >
          <RiNotificationLine
            className={`${
              pathname.includes('call')
                ? 'text-orange-600'
                : `${theme === 'dark' ? 'text-white' : 'text-stone-600'}`
            } w-3.5 h-3.5 xs:w-6 xs:h-6`}
          />
          <span
            className={`text-[9px] xs:text-[11px] mt-0.5 ${
              pathname.includes('call') && 'text-orange-600'
            }`}
          >
            İstek
          </span>
        </Link>
        <Link
          href={
            searchParams.get('table')
              ? `/${venueSlug}/languages/${menuId}?table=${searchParams.get('table')}`
              : `/${venueSlug}/languages`
          }
          type="button"
          className="inline-flex flex-col items-center justify-center px-5  group"
        >
          <PiGlobeHemisphereWest
            className={`${
              pathname.includes('languages')
                ? 'text-orange-600'
                : `${theme === 'dark' ? 'text-white' : 'text-stone-600'}`
            } w-3.5 h-3.5 xs:w-6 xs:h-6`}
          />
          <span
            className={`text-[9px] xs:text-[11px] mt-0.5 ${
              pathname.includes('languages') && 'text-orange-600'
            }`}
          >
            Dil
          </span>
        </Link>
      </div>
    </div>
  );
}
