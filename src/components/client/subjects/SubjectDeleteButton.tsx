'use client';

import React from 'react';
import DeleteButton from '@/components/ui/buttons/DeleteButton';
import DeleteModal from '@/components/ui/modals/DeleteModal';
import { ModalHost } from '@/components/ui/modals/ModalHost';
import { useApi } from '@/context/api-context';
import { useModal } from '@/hooks/use-modal';
import { Subject } from '@/types/data';


interface SubjectDeleteButtonProps {
  subject: Subject;
}

const SubjectDeleteButton: React.FC<SubjectDeleteButtonProps> = ({
  subject
}) => {
  const modal = useModal();
  const { client, api } = useApi();

  const handleOpenDeleteModal = () => {
    modal.open('delete', {
      id: subject._id,
      title: `Da li želite da obrišete predmet '${subject.name}'?`,
      description: 'Ova akcija je nepovratna i može biti vrlo opasna. Da li ste sigurni?',
      onConfirm: async () => {
        await api(
          () => client.deleteSubject(subject.institution, subject._id),
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
        key={subject._id}
        registry={{
          'delete': DeleteModal
        }}
        state={modal.state}
        close={modal.close}
      />
    </>
  );
}

export default SubjectDeleteButton;