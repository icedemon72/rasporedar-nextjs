'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { TooltipProps } from '@/types/global';

const TooltipWrapper = dynamic(() => import('./TooltipWrapper'), {
  ssr: false, 
});

const Tooltip: React.FC<TooltipProps> = ({
  children,
  tooltip,
  delayDuration = 300
}) => {
  return (
    <TooltipWrapper tooltip={tooltip} delayDuration={delayDuration}>
      {children}
    </TooltipWrapper>
  );
}

export default Tooltip