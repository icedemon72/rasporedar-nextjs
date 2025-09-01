import { FAQBlock as FAQBlockType, AccordionBlock as AccordionBlockType } from '@/types/payload';
import React from 'react';
import { toHTML } from '@/utils/serializeLexical';
import AccordionBlock from '../accordion/AccordionBlock';

const FAQBlock: React.FC<FAQBlockType> = ({
  title,
  description,
  accordion,
  ...props
}) => {
  if (!accordion?.length) return null;

  return (
    <section className="flex">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        {description && (
          <div
            className="mt-4 text-gray-700"
            dangerouslySetInnerHTML={{ __html: toHTML(description) }}
          />
        )}
      </div>

      <div className="flex-1">
        {
          accordion.map((block, i) => {
            if (block.blockType === 'accordion') {
              return <AccordionBlock key={i} {...(block as AccordionBlockType)} />;
            }
            return null;
          })
        }
      </div>
    </section>
  );
};

export default FAQBlock;