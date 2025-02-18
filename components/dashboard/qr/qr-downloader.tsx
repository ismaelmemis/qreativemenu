'use client';

import QRCodeStyling from 'qr-code-styling';
import { useEffect, useState } from 'react';
import { PiQrCode } from 'react-icons/pi';

interface QRCodeProps {
  settings: ConstructorParameters<typeof QRCodeStyling>[0];
}

export default function QRDownloader({ qrCode }: { qrCode: QRCodeProps }) {
  const [qrCodeData, setQrCodeData] = useState<QRCodeStyling>();

  useEffect(() => {
    setQrCodeData(new QRCodeStyling(qrCode.settings));
  }, []);

  const onDownloadClick = () => {
    if (!qrCodeData) return;
    qrCodeData.download({
      extension: 'png',
    });
  };

  return (
    <div className="flex items-center gap-1" onClick={onDownloadClick}>
      <PiQrCode /> <span className="text-sm text-stone-700">QR Kod indir</span>
    </div>
  );
}
