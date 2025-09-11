'use client';

import React from 'react';
import clsx from 'clsx';
import { Clock, Trash2 } from 'lucide-react';

import TableRow from '@/components/ui/table/TableRow';
import TableCell from '@/components/ui/table/TableCell';
import { scheduleCustomStyles } from '@/constants/schedule.styles';
import { ExtendedSchedule, ScheduleTime } from '@/types/data';
import { useScheduleContext } from '@/context/schedules-context';
import ScheduleItem from './ScheduleItem';
import { useModal } from '@/hooks/use-modal';
import { ModalHost } from '@/components/ui/modals/ModalHost';
import ScheduleTimeModal from '@/components/ui/modals/ScheduleTimeModal';

interface ScheduleRowProps {
  editable?: boolean;
  index: number;
  groupIndex: number;
  schedule: ExtendedSchedule;
}

const ScheduleRow: React.FC<ScheduleRowProps> = ({
  editable = false,
  index,
  groupIndex,
  schedule
}) => {
  const modal = useModal();
  const { handleDeleteRow, addTime } = useScheduleContext();
  const group = schedule.rows?.[groupIndex];

  const handleOpenTime = () => {
    modal.open('time', {
      indexes: { i: groupIndex, j: index },
      data: group?.defaultTimes[index], 
      onSubmit: (payload: ScheduleTime) => {
        addTime(groupIndex, index, payload);
      }
    });
  }

  return (
    <TableRow className={clsx('!p-0 min-h-[100px]', schedule.style && scheduleCustomStyles[schedule.style].rowStyle)}>
      <TableCell className={clsx('!p-0' ,schedule.style && scheduleCustomStyles[schedule.style].clockCol)}>
        <div className="relative flex w-full justify-center items-center min-h-[100px]">
          {
            editable && (
              <button
                aria-label={`Remove row ${index + 1}`}
                className="hidden md:flex items-center justify-center absolute right-2 top-2 btn-primary btn-red cursor-pointer group rounded-full"
                onClick={() => handleDeleteRow(groupIndex, index)}
                data-tooltip-id="my-tooltip"
                data-tooltip-content={`Obriši ${index + 1}. vrstu`}
                data-tooltip-delay-show={400}
              >
                <Trash2 size={16} className="group-hover:scale-125 group-active:scale-90 transition-all" />
              </button>
            )
          }

          <p className={clsx(schedule.systemType === 'school' ? 'w-1/4' : 'w-full', 'text-center')}>
            {index + 1}
          </p>

          {
            schedule.systemType === 'school' && (
              <div
                className="h-full w-3/4 flex justify-center items-center cursor-pointer group"
                onClick={editable ? () => handleOpenTime() : undefined}
                role={editable ? 'button' : undefined}
              >
                {group?.defaultTimes?.[index]?.from ? (
                  <>
                    {group.defaultTimes[index].from} - {group.defaultTimes[index].to}
                  </>
                ) : (
                  <Clock size={16} className="group-hover:scale-150 transition-all" />
                )}
              </div>
            )
          }
        </div>
        <ModalHost 
          state={modal.state}
          close={modal.close}
          registry={{
            'time': ScheduleTimeModal,
          }}
        />
      </TableCell>

      {
        schedule.days?.map((_, dayIndex) => (
          <TableCell key={dayIndex} className="text-center !p-0">
            <ScheduleItem
              editable={editable}
              schedule={schedule}
              groupIndex={groupIndex}
              rowIndex={index}
              dayIndex={dayIndex}
            />
          </TableCell>
        ))
      }
     
    </TableRow>
  );
}

export default ScheduleRow;