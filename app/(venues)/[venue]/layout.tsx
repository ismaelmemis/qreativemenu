import { db } from '@/lib/db';

import MenuBottom from '@/components/mobile/menu-bottom/menu-bottom';

export default async function VenueLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    venue: string;
  };
}) {
  const venue = await db.venue.findFirst({
    where: {
      slug: params?.venue,
    },
    include: {
      menus: true,
    },
  });

  return (
    <div>
      {children}
      {venue ? (
        <MenuBottom
          venueSlug={venue?.slug ?? ''}
          theme={venue?.menus[0]?.theme ?? ''}
          menuId={venue?.menus[0]?.id ?? ''}
        />
      ) : (
        ''
      )}
    </div>
  );
}
