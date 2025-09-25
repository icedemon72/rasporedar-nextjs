import React from 'react'
import { INews } from '@/types/payload'
import Link from 'next/link';
import Image from 'next/image';

interface NewsCardProps {
  item: INews;
}

const NewsCard: React.FC<NewsCardProps> = ({
  item
}) => {
  return (
    <div className="w-full rounded border py-2 px-4">
      {
        <div className="overflow-hidden rounded group">
          <Link className="flex flex-col xl:flex-row gap-8" href={`/novosti/${item.slug}`}>
            <Image
              width={250}
              height={250}
              alt={item?.featuredImage?.alt ?? item.title}
              src={item?.featuredImage?.url ?? '/assets/icons/no-image.svg'}
              className="border rounded-md h-[250px] object-cover"
            />
            <div className="xl:mt-6">
              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
            </div>
          </Link>
        </div>
      }
    </div>
  )
}

export default NewsCard