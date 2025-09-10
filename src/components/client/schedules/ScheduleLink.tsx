'use client';

import React from 'react';
import Link from 'next/link';

const ScheduleLink = ({
  editable,
  href,
  className,
  children
}: {
  editable: boolean;
  href: string;
  className?: string;
  children: React.ReactNode;
}) => {
  if (editable) {
    // While editing, we don’t navigate
    return <span className={className}>{children}</span>;
  }

  return (
    <Link href={href} className={className}>
      <div className="hover:bg-slate-400 rounded-sm p-1 hover:underline">{children}</div>
    </Link>
  );
};

export default ScheduleLink;
