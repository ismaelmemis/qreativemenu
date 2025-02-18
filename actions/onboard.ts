'use server';

import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { Options } from 'qr-code-styling';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onboard = async (values: any, userId: string) => {
  let trimmedUrl = values.venuename.replace(/\s+/g, '').toLowerCase();

  const existingVenue = await db.venue.findFirst({
    where: {
      name: values.venuename,
    },
  });

  if (existingVenue) {
    trimmedUrl =
      values.venuename.replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random() * 10000) + 1;
  }

  const options: Options = {
    width: 1280,
    height: 1280,
    data: `http://localhost:3000/${trimmedUrl}`,
    type: 'svg',
    image: undefined,
    dotsOptions: {
      type: 'square',
      color: '#000',
    },
    backgroundOptions: {
      color: '#FFF',
    },
    cornersSquareOptions: {
      type: 'square',
    },
    cornersDotOptions: {
      type: 'square',
    },
  };

  await db.user.update({
    where: { id: userId },
    data: {
      venues: {
        create: {
          name: values.venuename,
          slug: trimmedUrl,
          phone: values.phone,
          country: values.country,
          city: values.region,
          size: values.tablecount,
          features: values.features.join(','),
          tableAreas: {
            create: {
              name: 'Genel',
            },
          },
          qrCode: {
            create: {
              code: `http://localhost:3000/${trimmedUrl}`, // Add a unique code here
              settings: options,
            },
          },
          menus: {
            create: {
              name: `${values.venuename} Menü`,
              url: trimmedUrl,
              theme: 'light',
            },
          },
        },
      },
    },
  });

  redirect('/dashboard');
};

export const onboardingStepOne = async (
  venueName: string | undefined,
  venueId: string | undefined
) => {
  await db.menu.create({
    data: {
      name: `${venueName} İlk Menü`,
      Venue: {
        connect: {
          id: venueId,
        },
      },
    },
  });

  // console.log(menu);
};
