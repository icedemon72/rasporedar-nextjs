'use client';

import React from 'react';
import DeleteButton from '@/components/ui/buttons/DeleteButton';
import DeleteModal from '@/components/ui/modals/DeleteModal';
import { ModalHost } from '@/components/ui/modals/ModalHost';
import { useApi } from '@/context/api-context';
import { useModal } from '@/hooks/use-modal';
import { Subject } from '@/types/data';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface SubjectDeleteEditButtonProps {
  subject: Subject;
}

const SubjectDeleteEditButton: React.FC<SubjectDeleteEditButtonProps> = ({
  subject
}) => {
  const router = useRouter();
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
              toast.success('Predmet je uspešno obirsan.');
              router.replace(`/app/institutions/${subject.institution}/subjects/`);
            }
          }
        );
      }
    });
  }

  return (
    <>
      <button className="w-full lg:w-auto btn-primary px-4 my-4" onClick={handleOpenDeleteModal}>
        <Trash />
        Obriši predmet
      </button>
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

export default SubjectDeleteEditButton;