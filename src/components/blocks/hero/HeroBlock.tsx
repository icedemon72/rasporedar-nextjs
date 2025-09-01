import React from 'react';
import clsx from 'clsx';
import Image from "next/image";
import { HeroBlock as HeroBlockType } from "@/types/payload";

interface HeroBlockProps extends HeroBlockType {
  isHome?: boolean;
}

const HeroBlock: React.FC<HeroBlockProps> = ({
  title,
  subtitle,
  backgroundImage,
  buttons,
  icon,
  priority,
  isHome = false
}) => {
  const isAbove = priority === 'above';
  
  return (
    (
      <section className={clsx(
        "relative flex flex-col justify-center bg-gray-900 text-white py-20 overflow-hidden",
        isHome && 'h-screen'
      )}>
        {/* Background Image */}
        {
          backgroundImage?.url && (
            <Image
              src={backgroundImage.url}
              alt={backgroundImage?.alt ?? 'Hero background'}
              fill
              priority={isAbove}
              fetchPriority={isAbove ? 'high' : 'auto'}
              loading={isAbove ? 'eager' : 'lazy'}
              className="object-cover z-0 pointer-events-none"
            />
          )
        }

        {/* Overlay */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none bg-black/75"
           style={{
            backgroundImage: `
              linear-gradient(180deg, rgba(39,41,43,0.4), rgba(39,41,43,0)),
              linear-gradient(0deg, rgba(25,19,19,0.29), rgba(25,19,19,0.26) 20%, rgba(25,20,20,0) 58%),
              linear-gradient(90deg, rgba(25,19,19,0.24), rgba(25,19,19,0.14) 14%, rgba(25,20,20,0) 49%),
              linear-gradient(180deg, #27292b 0, rgba(39,41,43,0) 215px)
            `,
          }}
        />

        {/* Foreground Content */}
        <div className="relative z-20 p-12 max-w-full lg:max-w-[50%]">
          <h1 className="">{title}</h1>
          {
            subtitle && (
            <p className="mt-4 text-lg text-gray-200">{subtitle}</p>
          )
            }
          {buttons && (
            <div className="mt-6 flex gap-4">
              {buttons.map((b, i) => (
                <a
                  key={i}
                  href={b.url}
                  className={clsx("px-6 py-3", b.style === 'primary' ? 'btn-primary' : 'btn-secondary')}
                >
                  {b.label}
                </a>
              ))}
            </div>
          )}
          {icon && (
            <img src={icon.url} alt="icon" className="mx-auto mt-8 w-16 h-16 object-contain" />
          )}
        </div>
      </section>
    )
  )
};

export default HeroBlock;