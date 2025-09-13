import { INews } from '@/types/payload'
import React from 'react'

interface NewsCardProps {
  item: INews;
}

const NewsCard: React.FC<NewsCardProps> = ({
  item
}) => {
  return (
    <div>
      { item.title }
    </div>
  )
}

export default NewsCard