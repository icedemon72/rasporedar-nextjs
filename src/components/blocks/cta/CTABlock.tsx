import { CallToActionBlock } from '@/types/payload';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

interface CTABlockProps extends CallToActionBlock {}

const CTABlock: React.FC<CTABlockProps> = ({
  title,
  priority,
  backgroundImage,
  buttons,
  cards,
  description
}) => {
  const isAbove = priority === 'above';
  return (
    <section className="py-16 space-y-4 relative">
       <div className="flex flex-wrap justify-center md:flex-nowrap md:justify-between relative overflow-hidden p-16">
        {
          backgroundImage?.url && (
            <Image
              loading={isAbove ? 'eager' : 'lazy'}
              priority={isAbove}
              src={backgroundImage.url}
              width={backgroundImage.width}
              height={backgroundImage.height}
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none select-none"
              style={{ zIndex: 0 }}
            />
          )
        }

        {/* Content sits above background image */}
        <div className="relative z-10 max-w-xl">
          <h2 className="text-3xl font-bold">{title}</h2>
          {description && <p className="mt-4 text-gray-600">{description}</p>}
        </div>

        <div className="relative z-10">
          {buttons && (
            <div className="mt-6 flex justify-center gap-4">
              {buttons.map((b, i) => (
                <a
                  key={i}
                  href={b.url}
                  className={clsx(
                    'px-6 py-3',
                    b.style === 'primary' ? 'btn-primary' : 'btn-secondary'
                  )}
                >
                  {b.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      {
        cards && cards.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {
              cards.map((card, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-4"
                >
                  {
                    card.image?.url && (
                      <img
                        src={card.image.url}
                        alt={card.title || `Card ${index + 1}`}
                        className="rounded-md mb-4"
                      />
                    )
                  }
                  <h3 className="text-xl font-semibold">{card.title}</h3>
                  {
                    card.description && (
                      <p className="mt-2 text-gray-600">{card.description}</p>
                    )
                  }
                </div>
              ))
            }
          </div>
        )
      }
    </section>
  );
}

export default CTABlock;