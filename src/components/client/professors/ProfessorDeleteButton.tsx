'use client';

import React from 'react';
import DeleteButton from '@/components/ui/buttons/DeleteButton';
import DeleteModal from '@/components/ui/modals/DeleteModal';
import { ModalHost } from '@/components/ui/modals/ModalHost';
import { useApi } from '@/context/api-context';
import { useModal } from '@/hooks/use-modal';
import { Professor } from '@/types/data';


interface ProfessorDeleteButtonProps {
  professor: Professor;
}

const ProfessorDeleteButton: React.FC<ProfessorDeleteButtonProps> = ({
  professor
}) => {
  const modal = useModal();
  const { client, api } = useApi();

  const handleOpenDeleteModal = () => {
    modal.open('delete', {
      id: professor._id,
      title: `Da li želite da obrišete profesora '${professor.name}'?`,
      description: 'Ova akcija je nepovratna i može biti vrlo opasna. Da li ste sigurni?',
      onConfirm: async () => {
        await api(
          () => client.deleteProfessor(professor.institution, professor._id),
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
      <DeleteButton onDelete={() => handleOpenDeleteModal()} />
      <ModalHost 
        key={professor._id}
        registry={{
          'delete': DeleteModal
        }}
        state={modal.state}
        close={modal.close}
      />
    </>
  );
}

export default ProfessorDeleteButton;