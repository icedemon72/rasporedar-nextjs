import React from 'react'
import { BreadcrumbLink } from '@/types/global';
import Breadcrumbs from '../ui/nav/Breadcrumbs';
import CardContainer from '../ui/containers/CardContainer';
import clsx from 'clsx';

interface PageWrapperProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: {
    links: BreadcrumbLink[];
    className?: string;
  }
  children: React.ReactNode;
  className?: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({
  title, subtitle, breadcrumbs, className, children
}) => {
  return (
    <div className="p-4 space-y-4">
      {
        breadcrumbs && (
          <Breadcrumbs {...breadcrumbs}  />
        )
      }
      <h1>{ title }</h1>
      { 
        subtitle && (
          <p>{ subtitle }</p>
        )
      }
      <div className={clsx("p-4 border rounded-md bg-secondary space-y-4", className)}>
        { children }
      </div>
    </div>
  );
}

export default PageWrapper;