'use client';

import React, { useState } from 'react';
import { INews } from '@/types/payload';
import NewsCard from './NewsCard';

interface NewsListProps {
  initialNews: INews[];
  totalPages: number;
}

const NewsList: React.FC<NewsListProps> = ({
  initialNews, totalPages
}) => {
  const [ news, setNews ] = useState<INews[]>(initialNews);
  const [ page, setPage ] = useState<number>(1);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
      {
        news.map((newsItem, index) => (
          <NewsCard key={index} item={newsItem} />
        ))
      }
    </div>
  );
}

export default NewsList;