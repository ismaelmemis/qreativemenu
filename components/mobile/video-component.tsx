import { Suspense } from 'react';

export default function VideoComponent({ videoSrc }: { videoSrc: string }) {
  if (!videoSrc) {
    return <div>No Video - No Image</div>;
  }

  return (
    <Suspense fallback={<>Loading...</>}>
      <video
        className="xs:h-[100vh] object-cover sm:w-full md:w-full lg:w-full"
        autoPlay
        loop
        muted
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Suspense>
  );
}
