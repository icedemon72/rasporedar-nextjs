import React from "react";
import type { CardLinksBlock as CardLinksBlockType } from "@/types/payload";
import Link from "next/link";
import Image from "next/image";

const CardLinksBlock: React.FC<CardLinksBlockType> = ({
  title,
  description,
  card_links,
  priority = 'below'
}) => {
  const isAbove = priority === 'above';
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {title && <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>}
        {description && <p className="text-lg text-gray-600 mb-10">{description}</p>}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {card_links.map((card, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-lg shadow hover:shadow-md transition overflow-hidden"
            >
              {
                card.image?.url && (
                  <Link href={card.url}>
                    <Image
                      priority={isAbove}
                      width={card.image.width}
                      height={card.image.height}
                      loading={isAbove ? 'eager' : 'lazy'}
                      src={card.image.url}
                      alt={card.title}
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                )
              }
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  <Link href={card.url} className="hover:underline">
                    {card.title}
                  </Link>
                </h3>
                {card.description && (
                  <p className="text-gray-600 text-sm">{card.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardLinksBlock;