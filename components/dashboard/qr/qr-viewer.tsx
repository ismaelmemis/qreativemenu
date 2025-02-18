'use client';

import QRCodeStyling, { Options } from 'qr-code-styling';
import { useEffect, useRef, useState } from 'react';

export default function QRViewer({ settings }: { settings: Options }) {
  const [qrCode, setQrCode] = useState<QRCodeStyling>();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQrCode(new QRCodeStyling(settings));
  }, []);

  useEffect(() => {
    if (ref.current) {
      qrCode?.append(ref.current);
    }
  }, [qrCode, ref]);

  return (
    <div className="relative size-40 border border-stone-200 shadow-md rounded-lg">
      <div
        className="rounded-lg flex items-center justify-center max-w-[150px] max-h-[150px] mx-auto mt-1 p-2"
        ref={ref}
      />
    </div>
  );
}
