'use client';

import React, { useRef, useState, useEffect } from 'react';
import { toHTML } from '@/utils/serializeLexical';
import { QAItem } from '@/types/payload';
import { ChevronDown } from 'lucide-react';

const AccordionItem: React.FC<QAItem> = ({ question, answer }) => {
  const [ isOpen, setIsOpen ] = useState<boolean>(false);
  const [ height, setHeight ] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div onClick={toggleAccordion} role="button" className="cursor-pointer border-b border-gray-200 p-4 border rounded-xl bg-white">
      <button
        // onClick={toggleAccordion}
        className="flex justify-between w-full text-left font-semibold text-lg text-gray-800 focus:outline-none"
      >
        {question}
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <ChevronDown />
        </span>
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out text-gray-600"
        style={{
          maxHeight: `${height ?? 0}px`,
          opacity: isOpen ? 1 : 0,
          marginTop: isOpen ? '0.5rem' : '0rem',
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: toHTML(answer) }} />
      </div>
    </div>
  );
};

export default AccordionItem;