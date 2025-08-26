import { BlogBase, IBlog } from '@/types/payload';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface BlogCardProps {
  blog: IBlog | BlogBase;
}

const BlogCard: React.FC<BlogCardProps> = ({
  blog
}) => {
  return (
    <div className="w-full rounded border py-2 px-4">
      {
        blog?.featuredImage?.url && (
          <div className="overflow-hidden rounded group">
            <Link href={`/blogs/${blog.slug}`}>
              <Image 
                width={500}
                height={250}
                alt={blog.featuredImage.alt ?? 'Blog slika'}
                src={blog.featuredImage.url}
                className="w-full h-[250px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-125"
              />
            </Link>
          </div>
        )
      }
      <h3>{blog.title}</h3>
      <p>{blog.excerpt}</p>
      <Link href={`/blogs/${blog.slug}`}>Pročitaj više</Link>
    </div>
  );
}

export default BlogCard;