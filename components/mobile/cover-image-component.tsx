import { Suspense } from 'react';
import { PiFileVideo } from 'react-icons/pi';

export default function CoverImageComponent({ imageSrc }: { imageSrc: string }) {
  if (!imageSrc) {
    return (
      <div className="h-[100vh] xs:h-[100vh] gap-1 flex flex-col items-center justify-center object-cover sm:w-full md:w-full lg:w-full bg-stone-100">
        <PiFileVideo className="size-6 xs:size-8 text-orange-600" />
        <p className="w-56 xs:w-[480px] text-center text-xs xs:text-base">
          İşletmenize kapak videosu veya kapak resmi ekleyin
        </p>
      </div>
    );
  }

  return (
    <Suspense fallback={<>Loading...</>}>
      <video
        className="xs:h-[100vh] object-cover sm:w-full md:w-full lg:w-full "
        autoPlay
        loop
        muted
      >
        Your browser does not support the video tag.
      </video>
    </Suspense>
  );
}
