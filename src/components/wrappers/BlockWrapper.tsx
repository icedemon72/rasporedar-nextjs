"use client";

import React from 'react';
import type {
  PageBlock,
  HeroBlock,
  CallToActionBlock,
  AccordionBlock,
  FeatureListBlock,
  ImageTextBlock,
  MediaGalleryBlock,
  TestimonialBlock,
} from '@/types/payload';
import { toHTML } from '@/utils/serializeLexical';
import clsx from 'clsx';

/* ------------------------------
   Hero
--------------------------------*/
const HeroSection: React.FC<HeroBlock> = ({
  title,
  subtitle,
  backgroundImage,
  buttons,
  icon,
}) => (
  <section
    className="relative flex flex-col items-center justify-center bg-gray-900 text-white py-20"
    style={{ backgroundImage: `url(${backgroundImage.url})`, backgroundSize: "cover" }}
  >
    <div className="text-center max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
      {subtitle && <p className="mt-4 text-lg text-gray-200">{subtitle}</p>}
      {buttons && (
        <div className="mt-6 flex justify-center gap-4">
          {buttons.map((b, i) => (
            <a
              key={i}
              href={b.url}
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
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
);

/* ------------------------------
   Call To Action
--------------------------------*/
const CallToAction: React.FC<CallToActionBlock> = ({ title, description, buttons }) => (
  <section className="text-center py-16 bg-gray-100">
    <h2 className="text-3xl font-bold">{title}</h2>
    {description && <p className="mt-4 text-gray-600">{description}</p>}
    {buttons && (
      <div className="mt-6 flex justify-center gap-4">
        {buttons.map((b, i) => (
          <a
            key={i}
            href={b.url}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            {b.label}
          </a>
        ))}
      </div>
    )}
  </section>
);

/* ------------------------------
   Accordion
--------------------------------*/
const Accordion: React.FC<AccordionBlock> = ({ items }) => (
  <section className="max-w-3xl mx-auto py-12">
    {items.map((item, i) => (
      <details
        key={i}
        className="border-b border-gray-200 py-4 group"
      >
        <summary className="cursor-pointer font-semibold text-lg text-gray-800">
          {item.question}
        </summary>
        <div className="mt-2 text-gray-600">
          <div dangerouslySetInnerHTML={{ __html: toHTML(item.answer) }} />
        </div>
      </details>
    ))}
  </section>
);

/* ------------------------------
   Feature List
--------------------------------*/
const FeatureList: React.FC<FeatureListBlock> = ({ sectionTitle, features }) => (
  <section className="py-16 bg-white">
    <div className="max-w-5xl mx-auto">
      {sectionTitle && (
        <h2 className="text-3xl font-bold text-center mb-10">{sectionTitle}</h2>
      )}
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <li
            key={i}
            className="flex flex-col items-center text-center p-6 rounded-lg shadow-sm border"
          >
            {f.icon && (
              <img src={f.icon.url} alt={f.title} className="w-12 h-12 mb-4" />
            )}
            <h3 className="text-xl font-semibold">{f.title}</h3>
            {f.description && <p className="mt-2 text-gray-600">{f.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

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

/* ------------------------------
   Testimonial
--------------------------------*/
const Testimonial: React.FC<TestimonialBlock> = ({ quote, author, role, avatar }) => (
  <section className="py-16 bg-white">
    <div className="max-w-2xl mx-auto text-center">
      {avatar && (
        <img
          src={avatar.url}
          alt={author}
          className="w-20 h-20 rounded-full mx-auto mb-6 object-cover"
        />
      )}
      <blockquote className="text-xl italic font-medium text-gray-800">
        “{quote}”
      </blockquote>
      <p className="mt-4 font-semibold text-gray-900">{author}</p>
      {role && <p className="text-gray-500">{role}</p>}
    </div>
  </section>
);

/* ------------------------------
   BlockWrapper switch
--------------------------------*/
const BlockWrapper: React.FC<PageBlock> = (block) => {
  switch (block.blockType) {
    case "hero":
      return <HeroSection {...block} />;
    case "call-to-action":
      return <CallToAction {...block} />;
    case "accordion":
      return <Accordion {...block} />;
    case "feature-list":
      return <FeatureList {...block} />;
    case "image-text":
      return <ImageText {...block} />;
    case "media-gallery":
      return <MediaGallery {...block} />;
    case "testimonial":
      return <Testimonial {...block} />;
    default:
      return null;
  }
};

export default BlockWrapper;