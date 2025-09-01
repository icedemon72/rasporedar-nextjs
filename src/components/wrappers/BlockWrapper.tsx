import React from 'react';
import type {
  PageBlock,
  ImageTextBlock,
  MediaGalleryBlock,
} from '@/types/payload';
import { toHTML } from '@/utils/serializeLexical';
import clsx from 'clsx';
import HeroBlock from '../blocks/hero/HeroBlock';
import FeatureListBlock from '../blocks/feature-list/FeatureListBlock';
import CTABlock from '../blocks/cta/CTABlock';
import TestimonialBlock from '../blocks/testimonial/TestimonialBlock';
import CardLinksBlock from '../blocks/card-links/CardLinksBlock';
import AccordionBlock from '../blocks/accordion/AccordionBlock';
import FAQBlock from '../blocks/faq/FAQBlock';

/* ------------------------------
   Image + Text
--------------------------------*/
const ImageText: React.FC<ImageTextBlock> = ({
  imagePosition,
  image,
  title,
  content,
}) => (
  <section
    className={clsx(
      "flex flex-col md:flex-row items-center gap-8 py-16",
      imagePosition === "right" && "md:flex-row-reverse"
    )}
  >
    <img src={image.url} alt={title || ""} className="w-full md:w-1/2 rounded-lg" />
    <div className="w-full md:w-1/2">
      {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
      {content && (
        <div
          className="prose prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: toHTML(content) }}
        />
      )}
    </div>
  </section>
);

/* ------------------------------
   Media Gallery
--------------------------------*/
const MediaGallery: React.FC<MediaGalleryBlock> = ({ title, images }) => (
  <section className="py-16 bg-gray-50">
    <div className="max-w-6xl mx-auto">
      {title && <h2 className="text-3xl font-bold text-center mb-10">{title}</h2>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img, i) => (
          <figure key={i} className="relative overflow-hidden rounded-lg shadow">
            <img
              src={img.image.url}
              alt={img.caption || ""}
              className="w-full h-full object-cover"
            />
            {img.caption && (
              <figcaption className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-sm p-2">
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  </section>
);

const BlockWrapper: React.FC<PageBlock & { isHome?: boolean }> = ({
  isHome = false,
  ...block
}) => {
  switch (block.blockType) {
    case 'hero':
      return <HeroBlock {...block} isHome={isHome} />;
    case 'call-to-action':
      return <CTABlock {...block} />;
    case 'accordion':
      return <AccordionBlock {...block} />;
    case 'faq':
      return <FAQBlock {...block} />;
    case 'feature-list':
      return <FeatureListBlock {...block} />;
    case 'image-text':
      return <ImageText {...block} />;
    case 'media-gallery':
      return <MediaGallery {...block} />;
    case 'testimonial':
      return <TestimonialBlock {...block} />;
    case 'card_link':
      return <CardLinksBlock {...block} />
    default:
      return null;
  }
};

export default BlockWrapper;