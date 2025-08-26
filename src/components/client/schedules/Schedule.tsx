import React from 'react';
import { ExtendedSchedule } from '@/types/data';
import clsx from 'clsx';
import { Clock } from 'lucide-react';
import { scheduleCustomStyles } from '@/constants/schedule.styles';
import TableRow from '@/components/ui/table/TableRow';
import TableCell from '@/components/ui/table/TableCell';
import Table from '@/components/ui/table/Table';
import ScheduleRow from './ScheduleRow';

interface ScheduleProps {
  editable: boolean;
  schedule: Partial<ExtendedSchedule>
  setSchedule?: React.Dispatch<React.SetStateAction<Partial<ExtendedSchedule>>>;
}

const Schedule: React.FC<ScheduleProps> = ({
  editable = false,
  schedule,
  setSchedule
}) => {
  return (
    <Table>
      <thead>
        <TableRow>
          <TableCell header>
            <div className="flex items-center justify-center gap-2">
              <Clock size={16} /> Termin
            </div>
          </TableCell>
          {
            schedule.days?.map((day, index) => (
              <TableCell header key={index} className="text-center">
                {day}
              </TableCell>
            ))
          }
        </TableRow>
      </thead>

      <tbody>
        {
          schedule.rows?.map((group, groupIndex) => (
            <React.Fragment key={groupIndex}>
              {
                schedule.groups?.length !== 1 && (
                  <TableRow>
                    <TableCell props={{ colSpan: schedule!.days!.length + 1 }}>
                      <div className={clsx(
                        'w-full text-xl font-bold text-center py-2',
                        schedule?.style ? scheduleCustomStyles[schedule.style].titleBackground : ''
                      )}>
                        { schedule.groups?.[groupIndex] }
                      </div>
                    </TableCell>
                  </TableRow>
                )
              }

              {
                group.data[0].map((_, rowIndex) => (
                  <ScheduleRow 
                    key={rowIndex}
                    editable={true}
                    groupIndex={groupIndex}
                    index={rowIndex}
                    schedule={schedule}
                  />
                ))
              }

              {
                editable && (
                  <TableRow>
                    <TableCell props={{ colSpan: schedule!.days!.length + 1 }}>
                      <div className="bg-primary flex gap-2 justify-between items-center mt-4 p-2">
                        <div
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content="Obriši poslednju vrstu"
                          className="btn-primary w-full btn-red md:w-1/2 lg:w-1/3 xl:w-1/4 text-center cursor-pointer"
                        >
                          -
                        </div>
                        <div
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content="Dodaj novu vrstu"
                          className="btn-primary btn-green w-full md:w-1/2 lg:w-1/3 xl:w-1/4 text-center cursor-pointer"
                        >
                          +
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              }
            </React.Fragment>
          ))
        }
      </tbody>
    </Table>

  );
}

export default Schedule;