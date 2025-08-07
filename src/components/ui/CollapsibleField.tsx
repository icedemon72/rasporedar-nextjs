'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import clsx from 'clsx';

interface CollapsibleFieldProps {
  label: string;
  data: string;
  isOpen?: boolean;
  collapsedLines?: number;
}

const CollapsibleField: React.FC<CollapsibleFieldProps> = ({
  label,
  data,
  isOpen = true,
}) => {
  const [open, setOpen] = useState(isOpen);

  return (
    <div className="mb-4">
      <div
        className="font-semibold inline-flex items-center gap-2 cursor-pointer mb-2 select-none"
        onClick={() => setOpen((prev) => !prev)}
      >
        {label}
        <div
          className={clsx(
            'inline-flex icon-button p-0 transition-all'
          )}
        >
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      <div
        className={clsx(
          'whitespace-pre-line will-change-transform transition-all duration-300 ease-in-out rounded-md overflow-y-hidden',
          open ? 'border p-2 max-h-[1500px]' : 'max-h-0' 
        )}
      >
        {data?.length ? data : '-'}
      </div>
    </div>
  );
};

export default CollapsibleField;
