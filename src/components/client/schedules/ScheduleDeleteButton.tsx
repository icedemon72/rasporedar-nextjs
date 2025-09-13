'use client';

import React from 'react';
import DeleteButton from '@/components/ui/buttons/DeleteButton';
import DeleteModal from '@/components/ui/modals/DeleteModal';
import { ModalHost } from '@/components/ui/modals/ModalHost';
import { useApi } from '@/context/api-context';
import { useModal } from '@/hooks/use-modal';
import { Schedule } from '@/types/data';
import TooltipWrapper from '../tooltip/TooltipWrapper';


interface ScheduleDeleteButtonProps {
  schedule: Schedule;
}

const ScheduleDeleteButton: React.FC<ScheduleDeleteButtonProps> = ({
  schedule
}) => {
  const modal = useModal();
  const { client, api } = useApi();

  const handleOpenDeleteModal = () => {
    modal.open('delete', {
      id: schedule._id,
      title: `Da li želite da obrišete raspored '${schedule.title}'?`,
      description: 'Ova akcija je nepovratna i može biti vrlo opasna. Da li ste sigurni?',
      onConfirm: async () => {
        await api(
          () => client.deleteSchedule(schedule.institution as string, schedule._id),
          {
            onSuccess() {
              window.location.reload();
            }
          }
        );
      }
    });
  }

  return (
    <>
      <TooltipWrapper tooltip="Obriši raspored">
        <DeleteButton onDelete={() => handleOpenDeleteModal()} />
      </TooltipWrapper>
      <ModalHost 
        key={schedule._id}
        registry={{
          'delete': DeleteModal
        }}
        state={modal.state}
        close={modal.close}
      />
    </>
  );
}

export default ScheduleDeleteButton;