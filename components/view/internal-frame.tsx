'use client';

import { useState, useEffect } from 'react';

interface InternalFrameProps {
  src: string;
  title: string;
  width?: string | number;
  height?: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

export default function InternalFrame({
  src,
  title,
  width = '100%',
  height = '100%',
  data,
}: InternalFrameProps) {
  const [iframeKey, setIframeKey] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIframeKey((prevKey) => prevKey + 1);
  }, [data]);

  if (!isMounted) {
    return <div className="text-center mt-52">Loading</div>; // or a loading placeholder
  }

  if (!iframeKey) {
    return <div className="text-center mt-52">Loading</div>; // or a loading placeholder
  }

  return (
    <iframe
      key={iframeKey}
      src={src}
      title={title}
      width={width}
      height={height}
      style={{ border: 'none' }}
    />
  );
}
