import CoverImageComponent from '@/components/mobile/cover-image-component';
import VideoComponent from '@/components/mobile/video-component';
import { db } from '@/lib/db';
import Image from 'next/image';

export default async function Venue({ params }: { params: { venue: string } }) {
  const venue = await db.venue.findFirst({
    where: {
      slug: params?.venue,
    },
    include: {
      menus: true,
    },
  });

  const menu = venue?.menus.find((menu) => {
    return menu.isActive === true;
  });

  const coverVideo = menu?.coverVideo;
  const coverImage = menu?.coverImage;
  const coverLogo = menu?.coverLogo;

  return (
    <>
      {coverVideo ? (
        <VideoComponent videoSrc={`/api/uploads/${coverVideo}`} />
      ) : (
        <CoverImageComponent imageSrc={coverImage as string} />
      )}

      <div className="absolute top-28 xs:top-40 left-1/2 transform -translate-x-1/2">
        {coverLogo && (
          <Image
            src={`/api/uploads/${coverLogo}`}
            width={300}
            height={300}
            alt="Logo"
            className="w-[400px]"
            priority
          />
        )}
      </div>
    </>
  );
}
