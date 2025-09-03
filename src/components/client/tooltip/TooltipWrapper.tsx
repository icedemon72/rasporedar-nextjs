'use client'; 

import * as Tooltip from '@radix-ui/react-tooltip';
import { TooltipProps } from '@/types/global';

export default function TooltipWrapper({
  children,
  tooltip,
  delayDuration = 300,
}: TooltipProps) {
  return (
    <Tooltip.Provider delayDuration={delayDuration}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          {children}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            align="center"
            className="rounded bg-black text-white text-sm px-2 py-1 shadow-md"
            sideOffset={5}
          >
            {tooltip}
            <Tooltip.Arrow className="fill-black" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
