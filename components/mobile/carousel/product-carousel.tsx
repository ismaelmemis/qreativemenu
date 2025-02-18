'use client';

import Image from 'next/image';

import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import Link from 'next/link';

interface SlideType {
  id: string;
  name: string;
  price: string;
  rating: number;
  image: string;
  venue: string;
  categorySlug: string;
  menuId: string;
}

type PropType = {
  slides: SlideType[];
  options?: EmblaOptionsType;
  theme?: string;
};

const ProductCarousel: React.FC<PropType> = (props) => {
  const { slides, options, theme } = props;
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <div className="embla">
      <div className="embla__viewport pl-3 xs:pl-5 pt-2 pb-32" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide) => (
            <div className="embla__slide cursor-pointer" key={slide.id}>
              <Link
                href={`/${slide?.venue}/menu/${slide?.menuId}/${
                  slide?.categorySlug
                }/${slide?.id.toString()}`}
              >
                <div
                  className={`rounded-lg xs:rounded-2xl relative shadow-[0px_0px_18px_-7px_rgba(0,_0,_0,_0.4)] border ${
                    theme === 'dark'
                      ? 'bg-stone-600/30 border-stone-700'
                      : 'border-stone-100 bg-white'
                  }`}
                >
                  <div className="relative h-16 xs:h-28 2xl:h-36 rounded-2xl">
                    <Image
                      src={`/uploads/${slide.image}`}
                      alt={slide.name}
                      className="object-cover rounded-t-2xl h-16 xs:h-28 2xl:h-36 shrink-0"
                      fill
                    />
                  </div>
                  <div className="py-1 2xl:py-2 px-2 xs:px-4">
                    <h2
                      className={`text-[11px] xs:text-[17px] 2xl:text-[18px] font-medium  ${
                        theme === 'dark' ? 'text-white' : 'text-stone'
                      }`}
                    >
                      {slide.name}
                    </h2>
                    <div className="flex justify-between">
                      <p
                        className={`text-[10px] xs:text-[16px] 2xl:text-[16px]  ${
                          theme === 'dark' ? 'text-stone-200' : 'text-stone-600'
                        }`}
                      >
                        {slide.price}₺
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
