import { auth } from '@/auth';
import { db } from '@/lib/db';

import QRCodeGenerator from '@/components/dashboard/qr/qr-code-generator';
import { Options } from 'qr-code-styling';

export default async function QRCode() {
  const session = await auth();

  const user = await db.user.findUnique({
    where: { id: session?.user.id },
    include: {
      venues: true,
    },
  });

  const venue = user?.venues[0];

  const data = await db.venue.findFirst({
    where: {
      id: venue?.id,
    },
    include: {
      qrCode: true,
    },
  });

  const menuQRCode = data?.qrCode.find((code) => code.purpose === 'MENU_VIEW');

  return (
    <QRCodeGenerator
      qrCodeId={menuQRCode?.id ?? ''}
      settings={menuQRCode?.settings as Options}
      qrCodeImage={menuQRCode?.image ?? ''}
      venueSlug={venue?.slug ?? ''}
    />
  );
}
