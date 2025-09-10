'use client';

import React from 'react';
import clsx from 'clsx';
import { PlusCircle } from 'lucide-react';
import { useParams } from 'next/navigation';

import { ExtendedSchedule, Professor, Subject } from '@/types/data';
import { scheduleCustomStyles } from '@/constants/schedule.styles';
import { useScheduleContext } from '@/context/schedules-context';

import ScheduleLink from './ScheduleLink';
import { ModalHost } from '@/components/ui/modals/ModalHost';
import ScheduleSubjectModal from '@/components/ui/modals/ScheduleSubjectModal';
import { useModal } from '@/hooks/use-modal';

interface Props {
  editable: boolean;
  schedule: ExtendedSchedule;
  groupIndex: number;
  rowIndex: number;
  dayIndex: number;
}

interface Payload {
  subject: Subject;
  lecturer: Professor;
  time?: { startTime: string; endTime: string } | null;
  location: string;
}

const ScheduleItem: React.FC<Props> = ({
  editable,
  schedule,
  groupIndex,
  rowIndex,
  dayIndex
}) => {
  const modal = useModal();
  // The cell payload your model uses:
  const group = schedule.rows?.[groupIndex];
  const cell = group?.data?.[dayIndex]?.[rowIndex];

  const { institution, handleAddItem } = useScheduleContext();

  const styleKey = schedule.style;
  const style = styleKey ? scheduleCustomStyles[styleKey] : undefined;

  const onClick = editable ? () => {
    modal.open('subject-modal', {
      schedule: schedule,
      subjects: institution.subjects,
      indexes: { i: rowIndex, j: dayIndex },
      isLocation: false,
      data: cell,
      onSubmit: (payload: Payload) => {
        handleAddItem(payload, groupIndex, rowIndex, dayIndex);
      }

    })
  } : undefined;

  return (
    <>
      <div
        className={clsx(
          'flex flex-col justify-center w-full items-center cursor-pointer group p-4',
          style?.colStyle
        )}
        onClick={onClick}
      >
        {(cell?.subject as Subject)?.name ? (
          <div className="relative w-full text-center group-hover:scale-105 transition-all">
            <div className="w-full flex flex-col justify-center text-center font-bold">
              {institution ? (
                <ScheduleLink
                  editable={editable}
                  href={`/institutions/${institution}/subjects/${(cell?.lecturer as Professor)?._id}`}
                >
                  {(cell?.subject as Subject)?.name}
                </ScheduleLink>
              ) : (
                <span>{(cell?.subject as Subject)?.name}</span>
              )}

              {schedule.systemType !== 'school' && (cell?.from || cell?.to) && (
                <div className="block">
                  ({cell?.from ?? ''} {cell?.from && cell?.to ? ' - ' : ''} {cell?.to ?? ''})
                </div>
              )}
            </div>

            {(cell?.lecturer as Professor)?.name && institution && (
              <ScheduleLink
                editable={editable}
                href={`/institutions/${institution}/professors/${(cell?.lecturer as Professor)?._id}`}
                className="w-full flex justify-center text-sm"
              >
                {(cell?.lecturer as Professor)?.name}
              </ScheduleLink>
            )}

            {cell?.location && <div className="text-xs block">{cell.location}</div>}
          </div>
        ) : (
          editable && (
            <PlusCircle 
              onClick={onClick}
              data-tooltip-id="my-tooltip"
              data-tooltip-content={`Dodaj ${rowIndex + 1}. predavanje`}
              className="group-hover:scale-150 transition-all"
            />
          )
        )}
      </div>
      <ModalHost 
        close={modal.close}
        registry={{
          'subject-modal': ScheduleSubjectModal,
        }}
        state={modal.state}
      />
    </>
  );
};

export default ScheduleItem;
