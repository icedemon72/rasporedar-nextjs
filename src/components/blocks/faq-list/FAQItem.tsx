'use client';

import React, { useRef, useEffect, useState } from 'react';
import { QAItem } from '@/types/payload';
import { toHTML } from '@/utils/serializeLexical';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

interface FAQItemProps {
  index: number;
  question: QAItem;
  openIndex: number | null;
  handleToggle: (index: number) => void;
}

const FAQItem: React.FC<FAQItemProps> = ({
  index,
  question,
  openIndex,
  handleToggle,
}) => {
  const isOpen = openIndex === index;
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(0);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <li
      className={clsx(
        'border border-gray-200 rounded-xl bg-white transition-all overflow-hidden',
        isOpen ? 'shadow-md' : 'hover:shadow'
      )}
    >
      <button
        className="w-full text-left p-4 flex justify-between items-center font-medium text-gray-800"
        onClick={() => handleToggle(index)}
        aria-expanded={isOpen}
        aria-controls={`faq-content-${index}`}
        id={`faq-button-${index}`}
      >
        <span>{question.question}</span>
        <ChevronDown
          className={clsx(
            'transition-transform duration-300',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      <div
        id={`faq-content-${index}`}
        aria-labelledby={`faq-button-${index}`}
        ref={contentRef}
        style={{
          maxHeight: `${height ?? 0}px`,
        }}
        className={clsx(
          'transition-all duration-300 ease-in-out overflow-hidden text-gray-600 px-4 pb-4',
          isOpen ? 'opacity-100 mt-2' : 'opacity-0 mt-0'
        )}
      >
        <div
          className="prose text-sm"
          dangerouslySetInnerHTML={{ __html: toHTML(question.answer) }}
        />
      </div>
    </li>
  );
};

export default FAQItem;