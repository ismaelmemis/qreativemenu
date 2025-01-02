'use server';

import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onboard = async (values: any, userId: string) => {
  await db.user.update({
    where: { id: userId },
    data: {
      venues: {
        create: {
          name: values.venuename,
          phone: values.phone,
          country: values.country,
          city: values.region,
          size: values.tablecount,
          features: values.features.join(','),
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
  const menu = await db.menu.create({
    data: {
      name: `${venueName} İlk Menü`,
      Venue: {
        connect: {
          id: venueId,
        },
      },
    },
  });

  console.log(menu);
};
