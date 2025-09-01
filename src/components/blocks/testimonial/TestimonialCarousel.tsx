'use client';

import useEmblaCarousel from 'embla-carousel-react';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { TestimonialItem } from '@/types/payload';


interface Props {
  testimonials: TestimonialItem[];
  priority?: 'above' | 'below';
}

const TestimonialCarousel: React.FC<Props> = ({ testimonials, priority = 'below' }) => {
  const [ emblaRef ] = useEmblaCarousel({ loop: true, align: 'center' });

  const isAbove = priority === 'above';

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container flex">
        {
          testimonials.map((t, idx) => (
            <div key={idx} className="embla__slide flex-[0_0_100%] px-4 cursor-grab select-none">
              <div className="text-center max-w-2xl mx-auto py-8">
                {t.avatar && (
                  <Image
                    src={t.avatar.url}
                    alt={t.author}
                    width={80}
                    height={80}
                    priority={isAbove}
                    loading={isAbove ? 'eager' : 'lazy'}
                    className="w-20 h-20 rounded-full mx-auto mb-6 object-cover"
                  />
                )}
                <blockquote className="text-xl italic font-medium text-gray-800">
                  “{t.quote}”
                </blockquote>
                <p className="mt-4 font-semibold text-gray-900">{t.author}</p>
                {t.role && <p className="text-gray-500">{t.role}</p>}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default TestimonialCarousel;