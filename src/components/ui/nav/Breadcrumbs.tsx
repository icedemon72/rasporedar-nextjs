import { BreadcrumbLink } from '@/types/global';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  links: BreadcrumbLink[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  links, 
  className = ''
}) => {
  return (
    <ul className={clsx('list-none flex flex-wrap items-center gap-1 text-sm', className)}>
      {
        links.map((link, index) => (
          <React.Fragment key={index}>
            {
              (link?.url && (link?.url || link?.active)) 
                ? (
                  <li className="flex items-center gap-1">
                    <Link  className="text-sm" href={link.url}>{ link.label }</Link>
                    <ChevronRight className="mt-0.5" size={10} />
                  </li>
                ) : (
                  <li className="text-gray-500">{ link.label }</li>
                )
            }
          </React.Fragment>
        ))
      }
    </ul>
  );
}

export default Breadcrumbs;