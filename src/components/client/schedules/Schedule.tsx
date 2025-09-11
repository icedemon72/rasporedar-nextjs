'use client';

import React from 'react';
import clsx from 'clsx';
import { Clock, Minus, Plus } from 'lucide-react';

import { ExtendedSchedule, Schedule as ScheduleType } from '@/types/data';
import { scheduleCustomStyles } from '@/constants/schedule.styles';
import Table from '@/components/ui/table/Table';
import TableRow from '@/components/ui/table/TableRow';
import TableCell from '@/components/ui/table/TableCell';
import ScheduleRow from './ScheduleRow';
import { useScheduleContext } from '@/context/schedules-context';

interface ScheduleProps {
  editable: boolean;
  schedule: Partial<ExtendedSchedule>;
}

const Schedule: React.FC<ScheduleProps> = ({ editable = false, schedule }) => {
  const { handleAddRow, handleDeleteRow } = useScheduleContext();

  return (
    <Table style={{ tableLayout: 'fixed' }}>
      <thead>
        <TableRow>
          <TableCell className="min-w-[150px]"  header>
            <div className="flex items-center justify-center gap-2">
              <Clock size={16} /> Termin
            </div>
          </TableCell>

          {schedule.days?.map((day, i) => (
            <TableCell header key={i} className="text-center">
              {day}
            </TableCell>
          ))}
        </TableRow>
      </thead>

      <tbody>
        {
          schedule.rows?.map((group, groupIndex) => (
            <React.Fragment key={groupIndex}>
              {
                schedule.groups && schedule.groups.length !== 1 && (
                  <TableRow>
                    <TableCell props={{ colSpan: (schedule.days?.length ?? 0) + 1 }}>
                      <div
                        className={clsx(
                          'w-full text-xl font-bold text-center !p-0 !py-2',
                          schedule.style && scheduleCustomStyles[schedule.style].titleBackground
                        )}
                      >
                        {schedule.groups?.[groupIndex]}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              }

              {
                group.data[0].map((_, rowIndex) => (
                  <ScheduleRow
                    key={rowIndex}
                    editable={editable}
                    index={rowIndex}
                    groupIndex={groupIndex}
                    schedule={schedule as ExtendedSchedule}
                  />
                ))
              }

              {
                editable && (
                  <TableRow className="border-b-2">
                    <TableCell props={{ colSpan: (schedule.days?.length ?? 0) + 1 }}>
                      <div className="flex gap-2 justify-between items-center mt-4 p-2">
                        <button
                          aria-label="Delete last row"
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content="Obriši poslednju vrstu"
                          className="btn-primary items-center rounded-full text-center cursor-pointer"
                          onClick={() => handleDeleteRow(groupIndex)}
                        >
                          <Minus />
                        </button>
                        <button
                          aria-label="Add new row"
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content="Dodaj novu vrstu"
                          className="btn-primary items-center rounded-full text-center cursor-pointer"
                          onClick={() => handleAddRow(groupIndex)}
                        >
                          <Plus />
                        </button>
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
};

export default Schedule;