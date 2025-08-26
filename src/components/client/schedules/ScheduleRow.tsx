import React from 'react';
import { ExtendedSchedule, ScheduleInstance } from '@/types/data';
import TableRow from '@/components/ui/table/TableRow';
import TableCell from '@/components/ui/table/TableCell';
import clsx from 'clsx';
import { scheduleCustomStyles } from '@/constants/schedule.styles';
import { Clock, Trash2 } from 'lucide-react';

interface ScheduleRowProps {
  editable?: boolean;
  index: number;
  groupIndex: number;
  schedule: ExtendedSchedule;

  handleSetTimeOpen?: (groupIndex: number, index: number) => void; 
}

const ScheduleRow: React.FC<ScheduleRowProps> = ({
  editable = false,
  index,
  groupIndex,
  schedule,
  handleSetTimeOpen
}) => {
  const item = schedule?.rows?.[groupIndex];
  return (
    <TableRow key={index} className={clsx("min-h-[100px]", schedule.style && scheduleCustomStyles[schedule.style].rowStyle)}>
      {/* @ts-ignore */}
      <TableCell className={clsx(schedule.style &&scheduleCustomStyles[schedule.style].clockCol)}>
        <div className="relative flex w-full justify-center items-center min-h-[100px]">
          { 
            editable && (
              <div className="hidden md:flex items-center justify-center absolute right-2 top-2 btn-primary btn-red cursor-pointer group" >
                <Trash2 
                  size={16} 
                  className="group-hover:scale-125 group-active:scale-90 transition-all" 
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={`Obriši ${index + 1}. vrstu`}
                  data-tooltip-delay-show={400}
                />
              </div>
            )
          }

          <p className={clsx(schedule?.systemType === 'school' ? 'w-1/4' : 'w-full', "text-center")}>
            { index + 1 }
          </p>

          {
            schedule?.systemType === 'school' && (
              <div 
                className="h-full w-3/4 flex justify-center items-center  cursor-pointer group "
                onClick={
                  (editable && handleSetTimeOpen) ? () => handleSetTimeOpen(groupIndex, index) : undefined
                } 
              >
                { 
                  item && item.defaultTimes[index]?.from ? (
                    <>
                      { item.defaultTimes[index].from  } - { item.defaultTimes[index].to  }
                    </> 
                  ) : <Clock size={16} className="group-hover:scale-150 transition-all " />
                }
              </div>
            )
          }
        </div>
      </TableCell>
      {
        schedule.days?.map((_, dayIndex) => (
          <TableCell key={dayIndex} className="text-center">
            +
            {/* {schedule?.rows?.[groupIndex].data[dayIndex][index].subject ?? '-'} */}
          </TableCell>
        ))
      }
    </TableRow>
  );
}

export default ScheduleRow;