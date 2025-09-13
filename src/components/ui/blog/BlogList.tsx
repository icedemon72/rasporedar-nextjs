'use client'

import { useState } from 'react'
import { getBlogs } from '@/lib/payloadcms/payloadcms'
import { IBlog, PayloadQueryResponse } from '@/types/payload'
import { buildPayloadURL } from '@/lib/payloadcms/buildPayloadUrl';
import BlogCard from './BlogCard';

export default function BlogList({
  initialBlogs,
  totalPages
}: {
  initialBlogs: IBlog[];
  totalPages: number;
}) {
  const [blogs, setBlogs] = useState<IBlog[]>(initialBlogs);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const loadMore = async () => {
    if (page >= totalPages) return;
    setLoading(true);
    const url = buildPayloadURL('/api/payload/blogs', {
      limit: 2,
      where: { status: 'published' },
      depth: 1,
      page: page + 1
    });

    const res = await fetch(url);
    const response: PayloadQueryResponse<IBlog> = await res.json();

    setBlogs(prev => [...prev, ...response.docs]);
    setPage(prev => prev + 1);
    setLoading(false);
  }

  return (
    <>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
        {
          blogs.map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))
        }
      </div>
      <div className="flex flex-1 justify-center">
        {
          page < totalPages && (
            <button className="btn-primary" onClick={loadMore} disabled={loading}>
              {loading ? 'Učitavanje...' : 'Učitaj više'}
            </button>
          )
        }
      </div>
    </>
  );
}