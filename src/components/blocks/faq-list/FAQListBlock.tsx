'use client';

import React, { useState, useMemo } from 'react';
import { FAQListBlock as FAQListBlockType } from '@/types/payload';
import FAQItem from './FAQItem';

const ITEMS_PER_BATCH = 5;

const FAQListBlock: React.FC<FAQListBlockType> = ({
  groups,
  title
}) => {
  const [ activeGroup, setActiveGroup ] = useState<string>('Sve');
  const [ visibleCount, setVisibleCount ] = useState<number>(ITEMS_PER_BATCH);
  const [ openIndex, setOpenIndex ] = useState<number | null>(null);

  const allGroups = useMemo(() => ['Sve', ...groups.map(g => g.title)], [groups]);

  const filteredFaqs = useMemo(() => {
    if (activeGroup === 'Sve') {
      return groups.flatMap(group => group.faqs.map(faq => ({
        ...faq,
        groupTitle: group.title
      })));
    }

    const selectedGroup = groups.find(group => group.title === activeGroup);
    return selectedGroup
      ? selectedGroup.faqs.map(faq => ({
          ...faq,
          groupTitle: selectedGroup.title
        }))
      : [];
  }, [activeGroup, groups]);

  const visibleFaqs = useMemo(() => {
    return filteredFaqs.slice(0, visibleCount);
  }, [filteredFaqs, visibleCount]);

  const handleGroupClick = (groupTitle: string) => {
    setActiveGroup(groupTitle);
    setVisibleCount(ITEMS_PER_BATCH);
  };

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => prev === index ? null : index);
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_BATCH);
  };

  return (
    <section className="max-w-5xl mx-auto faq-list space-y-2">
      { title && <h2>{title}</h2> }

      <div className="faq-group-buttons flex flex-wrap justify-center gap-2">
        {
          allGroups.map((groupTitle) => (
            <button
              key={groupTitle}
              className={groupTitle === activeGroup ? 'btn-primary rounded-3xl px-4' : 'btn-outline rounded-3xl px-4'}
              onClick={() => handleGroupClick(groupTitle)}
            >
              {groupTitle}
            </button>
          ))
        }
      </div>
      
      {
        visibleFaqs.map((faq, index) => (
          <FAQItem 
            key={index}
            index={index}
            handleToggle={handleToggle}
            openIndex={openIndex}
            question={faq}
          />
        ))
      }

      
      {
        visibleCount < filteredFaqs.length && (
          <div className="faq-load-more flex justify-center">
            <button className="btn-primary px-4" onClick={handleLoadMore}>Učitaj još</button>
          </div>
        )
      }
    </section>
  );
}

export default FAQListBlock;