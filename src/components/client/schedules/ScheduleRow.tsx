'use client';

import React from 'react';
import clsx from 'clsx';
import { Clock, Trash2 } from 'lucide-react';

import TableRow from '@/components/ui/table/TableRow';
import TableCell from '@/components/ui/table/TableCell';
import { scheduleCustomStyles } from '@/constants/schedule.styles';
import { ExtendedSchedule } from '@/types/data';
import { useScheduleContext } from '@/context/schedules-context';
import ScheduleItem from './ScheduleItem';

interface ScheduleRowProps {
  editable?: boolean;
  index: number;        // row index within group
  groupIndex: number;   // group index
  schedule: ExtendedSchedule;
}

const ScheduleRow: React.FC<ScheduleRowProps> = ({
  editable = false,
  index,
  groupIndex,
  schedule
}) => {
  const { handleDeleteRow } = useScheduleContext();
  const group = schedule.rows?.[groupIndex];

  return (
    <TableRow className={clsx('!p-0 min-h-[100px]', schedule.style && scheduleCustomStyles[schedule.style].rowStyle)}>
      <TableCell className={clsx('!p-0' ,schedule.style && scheduleCustomStyles[schedule.style].clockCol)}>
        <div className="relative flex w-full justify-center items-center min-h-[100px]">
          {editable && (
            <button
              aria-label={`Remove row ${index + 1}`}
              className="hidden md:flex items-center justify-center absolute right-2 top-2 btn-primary btn-red cursor-pointer group rounded-full"
              onClick={() => handleDeleteRow(groupIndex)}
              data-tooltip-id="my-tooltip"
              data-tooltip-content={`Obriši ${index + 1}. vrstu`}
              data-tooltip-delay-show={400}
            >
              <Trash2 size={16} className="group-hover:scale-125 group-active:scale-90 transition-all" />
            </button>
          )}

          <p className={clsx(schedule.systemType === 'school' ? 'w-1/4' : 'w-full', 'text-center')}>
            {index + 1}
          </p>

          {schedule.systemType === 'school' && (
            <div
              className="h-full w-3/4 flex justify-center items-center cursor-pointer group"
              onClick={editable ? () => {} : undefined}
            >
              {group?.defaultTimes?.[index]?.from ? (
                <>
                  {group.defaultTimes[index].from} - {group.defaultTimes[index].to}
                </>
              ) : (
                <Clock size={16} className="group-hover:scale-150 transition-all" />
              )}
            </div>
          )}
        </div>
      </TableCell>

      {schedule.days?.map((_, dayIndex) => (
        <TableCell key={dayIndex} className="text-center !p-0">
          <ScheduleItem
            editable={editable}
            schedule={schedule}
            groupIndex={groupIndex}
            rowIndex={index}
            dayIndex={dayIndex}
          />
        </TableCell>
      ))}
    </TableRow>
  );
};

export default ScheduleRow;