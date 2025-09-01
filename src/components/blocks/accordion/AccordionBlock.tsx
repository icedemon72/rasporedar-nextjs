import { AccordionBlock as AccordionBlockType } from '@/types/payload';
import React from 'react';
import AccordionItem from './AccordionItem';

const AccordionBlock: React.FC<AccordionBlockType> = ({ items }) => {
  return (
    <section className="space-y-2">
      {items.map((item, i) => (
        <AccordionItem key={i} question={item.question} answer={item.answer} />
      ))}
    </section>
  );
};

export default AccordionBlock;